// ==================== ERROR HANDLER ====================
window.onerror = function(msg, src, line, col, err) {
  document.body.insertAdjacentHTML('afterbegin',
    `<div style="position:fixed;top:64px;left:0;right:0;background:#ff4444;color:#fff;padding:12px 20px;z-index:9999;font-family:monospace;font-size:13px">
      ❌ JS Xato: ${msg} (${src?.split('/').pop()}:${line}:${col})
    </div>`
  );
};

// ==================== STATE ====================
const API = '/api';
let state = {
  user: null,
  token: localStorage.getItem('emerx_token'),
  currentPage: 'dashboard',
  status: null, // /api/breaks/status javobi
};

let statusTimer = null;   // countdownlarni yangilab turuvchi interval
let pollTimer = null;     // fallback polling
let socket = null;

// ==================== API HELPER ====================
async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  try {
    const res = await fetch(API + path, { headers, ...opts });
    const ct = res.headers.get('content-type') || '';

    if (!ct.includes('application/json')) {
      console.warn(`[API] Non-JSON: ${path} → ${res.status}`);
      return { error: `Server ${res.status === 503 || res.status === 502 ? 'qayta ishga tushmoqda, 1 daqiqa kuting' : 'xatosi (' + res.status + ')'}` };
    }

    const text = await res.text();
    if (!text || !text.trim()) {
      console.warn(`[API] Bo'sh response: ${path}`);
      return { error: 'Server bo\'sh javob qaytardi' };
    }

    return JSON.parse(text);
  } catch (e) {
    console.error(`[API] Xato: ${path}`, e.message);
    return { error: 'Tarmoq xatosi. Qayta urinib ko\'ring.' };
  }
}

// ==================== TOAST ====================
function toast(msg, isError = false) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.style.background = isError ? 'rgba(255,68,68,0.15)' : 'var(--card2)';
  el.style.borderColor = isError ? 'var(--red)' : 'var(--border)';
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ==================== AUTH ====================
async function initAuth() {
  if (!state.token) return;
  const user = await api('/auth/me');
  if (user.id) {
    state.user = user;
    connectSocket();
  } else {
    state.token = null;
    localStorage.removeItem('emerx_token');
  }
}

async function login(email, password) {
  const res = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  if (res.token) {
    state.token = res.token;
    state.user = res.user;
    localStorage.setItem('emerx_token', res.token);
    connectSocket();
    return { ok: true };
  }
  return { ok: false, error: res.error || 'Kirish amalga oshmadi' };
}

async function register(username, email, password, captchaToken, captchaAnswer) {
  const res = await api('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, captchaToken, captchaAnswer })
  });
  if (res.token) {
    state.token = res.token;
    state.user = res.user;
    localStorage.setItem('emerx_token', res.token);
    connectSocket();
    return { ok: true };
  }
  return { ok: false, error: res.error || 'Ro\'yxatdan o\'tish amalga oshmadi' };
}

function logout() {
  state.token = null;
  state.user = null;
  state.status = null;
  localStorage.removeItem('emerx_token');
  disconnectSocket();
  updateNavbar();
  showPage('auth');
}

// ==================== SOCKET.IO (jonli yangilanish) ====================
function connectSocket() {
  if (socket) return;
  socket = io();
  socket.on('breaks:changed', () => {
    if (state.currentPage === 'dashboard' || state.currentPage === 'admin') {
      loadStatusAndRender();
    }
  });
}
function disconnectSocket() {
  if (socket) { socket.disconnect(); socket = null; }
}

// ==================== NAV ====================
function updateNavbar() {
  const navAuth = document.getElementById('nav-auth');
  const navUser = document.getElementById('nav-user');

  if (state.user) {
    navAuth.style.display = 'none';
    navUser.style.display = 'flex';
    document.getElementById('nav-username').textContent = state.user.username;
    const navAdmin = document.getElementById('nav-admin');
    navAdmin.style.display = state.user.isAdmin ? 'inline-flex' : 'none';
  } else {
    navAuth.style.display = 'flex';
    navUser.style.display = 'none';
  }
}

function closeMobileMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('show');
  document.getElementById('hamburger').classList.remove('open');
}

// ==================== ROUTING ====================
function showPage(name) {
  const authRequired = ['dashboard', 'admin', 'profile'];
  if (authRequired.includes(name) && !state.user) name = 'auth';
  if (name === 'admin' && state.user && !state.user.isAdmin) name = 'dashboard';

  state.currentPage = name;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  closeMobileMenu();

  clearInterval(statusTimer);
  clearInterval(pollTimer);

  if (name === 'auth') renderAuth();
  if (name === 'dashboard') { renderDashboardShell(); loadStatusAndRender(); startPolling(); }
  if (name === 'admin') { renderAdminShell(); loadStatusAndRender(); loadAdminExtras(); startPolling(); }
  if (name === 'profile') renderProfile();

  window.scrollTo(0, 0);
}

function startPolling() {
  // Socket ishlamay qolsa ham holat yangilanib tursin
  pollTimer = setInterval(loadStatusAndRender, 20000);
  // Countdownlarni har soniya yangilash
  statusTimer = setInterval(tickCountdowns, 1000);
}

// ==================== VAQT YORDAMCHILARI ====================
function fmtTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
}

function fmtDuration(ms) {
  const sign = ms < 0 ? '-' : '';
  ms = Math.abs(ms);
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = n => String(n).padStart(2, '0');
  return sign + (h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`);
}

function tickCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const end = new Date(el.dataset.countdown).getTime();
    const diff = end - Date.now();
    el.textContent = (diff >= 0 ? '⏳ ' : '⚠️ kechikdi ') + fmtDuration(diff);
    el.style.color = diff >= 0 ? 'var(--text2)' : 'var(--red)';
  });
}

// ==================== HOLATNI YUKLASH ====================
async function loadStatusAndRender() {
  const res = await api('/breaks/status');
  if (res.error) return;
  state.status = res;
  if (state.currentPage === 'dashboard') renderDashboardBody();
  if (state.currentPage === 'admin') renderAdminBody();
}

// ==================== ABET AMALLARI ====================
async function startBreak() {
  const res = await api('/breaks/start', { method: 'POST' });
  if (res.error) return toast(res.error, true);
  toast(res.break.status === 'active' ? '🍽️ Abetga chiqdingiz!' : '⏳ Navbatga qo\'yildingiz');
  loadStatusAndRender();
}
async function endBreak() {
  const res = await api('/breaks/end', { method: 'POST' });
  if (res.error) return toast(res.error, true);
  toast('✅ Qaytdingiz!');
  loadStatusAndRender();
}
async function cancelQueue() {
  const res = await api('/breaks/cancel', { method: 'DELETE' });
  if (res.error) return toast(res.error, true);
  toast('Navbat bekor qilindi');
  loadStatusAndRender();
}

// ==================== DASHBOARD (xodim) ====================
function renderDashboardShell() {
  document.getElementById('page-dashboard').innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>🕐 Abet Nazorati</h1>
        <p>Xodimlarning tushlik tanaffusiga chiqish vaqtini boshqarish</p>
      </div>
      <div id="dash-body">Yuklanmoqda...</div>
    </div>
  `;
}

function personListHtml(list, opts = {}) {
  if (!list.length) return `<p style="color:var(--text2);padding:8px 0">${opts.empty || 'Bo\'sh'}</p>`;
  return `<div class="person-list">${list.map(p => `
    <div class="person-row">
      <span class="person-name">${escapeHtml(p.username)}</span>
      ${opts.render ? opts.render(p) : ''}
    </div>`).join('')}</div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[<>&"']/g, c => ({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;' }[c]));
}

function renderDashboardBody() {
  const el = document.getElementById('dash-body');
  if (!el || !state.status) return;
  const s = state.status;

  let selfCard;
  if (!s.self || s.self.status === 'cancelled') {
    selfCard = `
      <div class="break-hero">
        <p class="break-hero-label">Sizning holatingiz</p>
        <h2>Hali abetga chiqmadingiz</h2>
        <button class="btn btn-primary btn-full" onclick="startBreak()">🍽️ Abetga chiqish</button>
      </div>`;
  } else if (s.self.status === 'active') {
    selfCard = `
      <div class="break-hero active">
        <p class="break-hero-label">Sizning holatingiz</p>
        <h2>🍽️ Siz hozir abetdasiz</h2>
        <p>Chiqdingiz: <b>${fmtTime(s.self.startTime)}</b> · Taxminiy qaytish: <b>${fmtTime(s.self.expectedEndTime)}</b></p>
        <p class="countdown-big" data-countdown="${s.self.expectedEndTime}">—</p>
        <button class="btn btn-primary btn-full" onclick="endBreak()">✅ Qaytdim</button>
      </div>`;
  } else if (s.self.status === 'queued') {
    selfCard = `
      <div class="break-hero queued">
        <p class="break-hero-label">Sizning holatingiz</p>
        <h2>⏳ Navbatdasiz — ${s.self.position}-o'rin</h2>
        <p>Joy bo'shashi bilan avtomatik chiqarilasiz</p>
        <button class="btn btn-secondary btn-full" onclick="cancelQueue()">✖ Navbatni bekor qilish</button>
      </div>`;
  } else {
    selfCard = `
      <div class="break-hero done">
        <p class="break-hero-label">Sizning holatingiz</p>
        <h2>✅ Bugun abetdan qaytdingiz</h2>
        <p>${fmtTime(s.self.startTime)} — ${fmtTime(s.self.actualEndTime)}</p>
        <button class="btn btn-primary btn-full" onclick="startBreak()">🍽️ Yana chiqish</button>
      </div>`;
  }

  el.innerHTML = `
    ${selfCard}

    <div class="stats-grid" style="margin-top:28px">
      <div class="stat-card"><div class="stat-val">${s.activeCount}/${s.maxConcurrent}</div><div class="stat-lbl">Hozir abetda</div></div>
      <div class="stat-card"><div class="stat-val">${s.queue.length}</div><div class="stat-lbl">Navbatda</div></div>
      <div class="stat-card"><div class="stat-val">${s.notGoneYet.length}</div><div class="stat-lbl">Hali chiqmagan</div></div>
    </div>

    <div class="break-section">
      <h3>🍽️ Hozir abetda (${s.active.length})</h3>
      ${personListHtml(s.active, { empty: 'Hozir hech kim abetda emas', render: p => `
        <span class="person-meta">${fmtTime(p.startTime)} → ${fmtTime(p.expectedEndTime)}</span>
        <span class="countdown-sm" data-countdown="${p.expectedEndTime}">—</span>
      `})}
    </div>

    <div class="break-section">
      <h3>⏳ Navbatda kutayotganlar (${s.queue.length})</h3>
      ${personListHtml(s.queue, { empty: 'Navbat bo\'sh', render: p => `<span class="person-meta">${p.position}-o'rin</span>` })}
    </div>

    <div class="break-section">
      <h3>🕓 Bugun hali chiqmaganlar (${s.notGoneYet.length})</h3>
      ${personListHtml(s.notGoneYet, { empty: 'Hammasi chiqib ulgurdi' })}
    </div>
  `;
  tickCountdowns();
}

// ==================== ADMIN ====================
function renderAdminShell() {
  document.getElementById('page-admin').innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>⚙️ Admin — Abet nazorati</h1>
        <p>Barcha xodimlarning abet holatini kuzatish va sozlash</p>
      </div>
      <div id="admin-body">Yuklanmoqda...</div>

      <div class="break-section">
        <h3>🛠 Sozlamalar</h3>
        <form id="settings-form" class="settings-form">
          <div class="form-group">
            <label class="form-label">Abet davomiyligi (daqiqa)</label>
            <input type="number" class="form-input" id="set-duration" min="1" max="480" required>
          </div>
          <div class="form-group">
            <label class="form-label">Bir vaqtda nechta kishi chiqishi mumkin</label>
            <input type="number" class="form-input" id="set-max" min="1" max="50" required>
          </div>
          <div class="error-msg" id="settings-error"></div>
          <button type="submit" class="btn btn-primary">💾 Saqlash</button>
        </form>
      </div>

      <div class="break-section">
        <h3>📋 Tarix</h3>
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap">
          <input type="date" class="form-input" id="history-date" style="max-width:200px">
          <button class="btn btn-secondary btn-sm" onclick="loadHistory()">Ko'rsatish</button>
        </div>
        <div id="history-body"></div>
      </div>

      <div class="break-section">
        <h3>👥 Foydalanuvchilar</h3>
        <div id="users-body"></div>
      </div>
    </div>
  `;
  document.getElementById('settings-form').addEventListener('submit', saveSettings);
  const dateInput = document.getElementById('history-date');
  dateInput.value = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Tashkent' });
}

function renderAdminBody() {
  const el = document.getElementById('admin-body');
  if (!el || !state.status) return;
  const s = state.status;

  el.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-val">${s.activeCount}/${s.maxConcurrent}</div><div class="stat-lbl">Hozir abetda</div></div>
      <div class="stat-card"><div class="stat-val">${s.queue.length}</div><div class="stat-lbl">Navbatda</div></div>
      <div class="stat-card"><div class="stat-val">${s.completed.length}</div><div class="stat-lbl">Bugun qaytganlar</div></div>
      <div class="stat-card"><div class="stat-val">${s.notGoneYet.length}</div><div class="stat-lbl">Hali chiqmagan</div></div>
    </div>

    <div class="break-section">
      <h3>🍽️ Hozir abetda</h3>
      ${personListHtml(s.active, { empty: 'Hozir hech kim abetda emas', render: p => `
        <span class="person-meta">${fmtTime(p.startTime)} → ${fmtTime(p.expectedEndTime)}</span>
        <span class="countdown-sm" data-countdown="${p.expectedEndTime}">—</span>
      `})}
    </div>

    <div class="break-section">
      <h3>⏳ Navbatda</h3>
      ${personListHtml(s.queue, { empty: 'Navbat bo\'sh', render: p => `<span class="person-meta">${p.position}-o'rin</span>` })}
    </div>

    <div class="break-section">
      <h3>🕓 Hali chiqmaganlar</h3>
      ${personListHtml(s.notGoneYet, { empty: 'Hammasi chiqib ulgurdi' })}
    </div>
  `;

  document.getElementById('set-duration').value = s.settings.breakDurationMinutes;
  document.getElementById('set-max').value = s.settings.maxConcurrent;
  tickCountdowns();
}

async function saveSettings(e) {
  e.preventDefault();
  const breakDurationMinutes = document.getElementById('set-duration').value;
  const maxConcurrent = document.getElementById('set-max').value;
  const errEl = document.getElementById('settings-error');
  errEl.textContent = '';
  const res = await api('/breaks/settings', {
    method: 'PUT',
    body: JSON.stringify({ breakDurationMinutes, maxConcurrent })
  });
  if (res.error) { errEl.textContent = res.error; return; }
  toast('✅ Sozlamalar saqlandi');
  loadStatusAndRender();
}

async function loadHistory() {
  const date = document.getElementById('history-date').value;
  const res = await api('/breaks/history?date=' + date);
  const body = document.getElementById('history-body');
  if (res.error) { body.innerHTML = `<p class="error-msg">${res.error}</p>`; return; }
  if (!res.records.length) { body.innerHTML = `<p style="color:var(--text2)">Bu sana uchun ma'lumot yo'q</p>`; return; }

  const statusLabel = { active: '🍽️ Abetda', queued: '⏳ Navbatda', completed: '✅ Qaytgan', cancelled: '✖ Bekor qilingan' };
  body.innerHTML = `
    <div class="history-table">
      <div class="history-row history-head">
        <span>Xodim</span><span>Chiqdi</span><span>Qaytdi</span><span>Holat</span>
      </div>
      ${res.records.map(r => `
        <div class="history-row">
          <span>${escapeHtml(r.username)}</span>
          <span>${fmtTime(r.startTime)}</span>
          <span>${fmtTime(r.actualEndTime)}</span>
          <span>${statusLabel[r.status] || r.status}</span>
        </div>
      `).join('')}
    </div>
  `;
}

async function loadAdminExtras() {
  loadHistory();
  loadUsers();
}

async function loadUsers() {
  const res = await api('/admin/users?limit=50');
  const body = document.getElementById('users-body');
  if (!body) return;
  if (res.error) { body.innerHTML = `<p class="error-msg">${res.error}</p>`; return; }

  body.innerHTML = `
    <div class="history-table">
      <div class="history-row history-head">
        <span>Foydalanuvchi</span><span>Email</span><span>Rol</span><span>Amal</span>
      </div>
      ${res.users.map(u => `
        <div class="history-row">
          <span>${escapeHtml(u.username)}</span>
          <span style="font-size:0.8rem;color:var(--text2)">${escapeHtml(u.email)}</span>
          <span>${u.isAdmin ? '⭐ Admin' : 'Xodim'}${u.isBanned ? ' · 🚫 Bloklangan' : ''}</span>
          <span style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="toggleBan('${u.id}', ${!u.isBanned})">${u.isBanned ? 'Blokdan chiqarish' : 'Bloklash'}</button>
            <button class="btn btn-secondary btn-sm" onclick="toggleAdmin('${u.id}', ${!u.isAdmin})">${u.isAdmin ? 'Admin olish' : 'Admin qilish'}</button>
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

async function toggleBan(id, isBanned) {
  const res = await api(`/admin/users/${id}/ban`, { method: 'PUT', body: JSON.stringify({ isBanned }) });
  if (res.error) return toast(res.error, true);
  toast('✅ Yangilandi');
  loadUsers();
}
async function toggleAdmin(id, isAdmin) {
  const res = await api(`/admin/users/${id}/admin`, { method: 'PUT', body: JSON.stringify({ isAdmin }) });
  if (res.error) return toast(res.error, true);
  toast('✅ Yangilandi');
  loadUsers();
}

// ==================== PROFIL ====================
function renderProfile() {
  document.getElementById('page-profile').innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo"><div class="logo-big">👤 Profil</div></div>

        <div class="form-group">
          <label class="form-label">Foydalanuvchi nomi</label>
          <input class="form-input" id="pf-username" value="${escapeHtml(state.user.username)}">
        </div>
        <div class="error-msg" id="pf-error"></div>
        <button class="btn btn-primary btn-full" onclick="saveUsername()">Saqlash</button>

        <div style="height:1px;background:var(--border);margin:24px 0"></div>

        <div class="form-group">
          <label class="form-label">Joriy parol</label>
          <input type="password" class="form-input" id="pf-current-pass">
        </div>
        <div class="form-group">
          <label class="form-label">Yangi parol</label>
          <input type="password" class="form-input" id="pf-new-pass">
        </div>
        <div class="error-msg" id="pf-pass-error"></div>
        <button class="btn btn-secondary btn-full" onclick="changePassword()">Parolni o'zgartirish</button>
      </div>
    </div>
  `;
}

async function saveUsername() {
  const username = document.getElementById('pf-username').value.trim();
  const errEl = document.getElementById('pf-error');
  errEl.textContent = '';
  const res = await api('/profile', { method: 'PUT', body: JSON.stringify({ username }) });
  if (res.error) { errEl.textContent = res.error; return; }
  state.user.username = username;
  updateNavbar();
  toast('✅ Saqlandi');
}

async function changePassword() {
  const currentPassword = document.getElementById('pf-current-pass').value;
  const newPassword = document.getElementById('pf-new-pass').value;
  const errEl = document.getElementById('pf-pass-error');
  errEl.textContent = '';
  const res = await api('/profile/password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) });
  if (res.error) { errEl.textContent = res.error; return; }
  document.getElementById('pf-current-pass').value = '';
  document.getElementById('pf-new-pass').value = '';
  toast('✅ Parol o\'zgartirildi');
}

// ==================== AUTH SAHIFASI ====================
let captchaState = null;

async function loadCaptcha() {
  const res = await api('/auth/captcha');
  captchaState = res;
  const q = document.getElementById('captcha-question');
  if (q) q.textContent = res.question || '?';
}

function renderAuth() {
  const page = document.getElementById('page-auth');
  const tab = page.dataset.tab || 'login';
  page.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          <div class="logo-big">🕐 EmerX Abet</div>
          <p>Xodimlarning abet vaqtini nazorat qilish tizimi</p>
        </div>

        <div class="auth-tabs">
          <button class="auth-tab ${tab === 'login' ? 'active' : ''}" onclick="switchAuthTab('login')">Kirish</button>
          <button class="auth-tab ${tab === 'register' ? 'active' : ''}" onclick="switchAuthTab('register')">Ro'yxatdan o'tish</button>
        </div>

        ${tab === 'login' ? loginFormHtml() : registerFormHtml()}
      </div>
    </div>
  `;

  if (tab === 'login') {
    document.getElementById('login-form').addEventListener('submit', onLoginSubmit);
  } else {
    document.getElementById('register-form').addEventListener('submit', onRegisterSubmit);
    loadCaptcha();
  }
}

function switchAuthTab(tab) {
  document.getElementById('page-auth').dataset.tab = tab;
  renderAuth();
}

function loginFormHtml() {
  return `
    <form id="login-form">
      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="form-input" id="login-email" required>
      </div>
      <div class="form-group">
        <label class="form-label">Parol</label>
        <input type="password" class="form-input" id="login-password" required>
      </div>
      <div class="error-msg" id="login-error"></div>
      <button type="submit" class="btn btn-primary btn-full">Kirish</button>
    </form>
  `;
}

function registerFormHtml() {
  return `
    <form id="register-form">
      <div class="form-group">
        <label class="form-label">Foydalanuvchi nomi</label>
        <input class="form-input" id="reg-username" required minlength="3" maxlength="30">
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="form-input" id="reg-email" required>
      </div>
      <div class="form-group">
        <label class="form-label">Parol</label>
        <input type="password" class="form-input" id="reg-password" required minlength="6">
      </div>
      <div class="form-group">
        <label class="form-label">Tekshiruv: <span id="captcha-question">yuklanmoqda...</span></label>
        <input class="form-input" id="reg-captcha" required>
      </div>
      <div class="error-msg" id="register-error"></div>
      <button type="submit" class="btn btn-primary btn-full">Ro'yxatdan o'tish</button>
    </form>
  `;
}

async function onLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';
  const res = await login(email, password);
  if (!res.ok) { errEl.textContent = res.error; return; }
  updateNavbar();
  showPage('dashboard');
}

async function onRegisterSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const captchaAnswer = document.getElementById('reg-captcha').value;
  const errEl = document.getElementById('register-error');
  errEl.textContent = '';

  if (!captchaState) { errEl.textContent = 'Tekshiruv yuklanmadi, qayta urinib ko\'ring'; return; }

  const res = await register(username, email, password, captchaState.token, captchaAnswer);
  if (!res.ok) {
    errEl.textContent = res.error;
    loadCaptcha();
    document.getElementById('reg-captcha').value = '';
    return;
  }
  updateNavbar();
  showPage('dashboard');
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('nav-login').onclick = () => { document.getElementById('page-auth').dataset.tab = 'login'; showPage('auth'); };
  document.getElementById('nav-register').onclick = () => { document.getElementById('page-auth').dataset.tab = 'register'; showPage('auth'); };
  document.getElementById('nav-dashboard').onclick = () => showPage('dashboard');
  document.getElementById('nav-admin').onclick = () => showPage('admin');
  document.getElementById('nav-profile').onclick = () => showPage('profile');
  document.getElementById('nav-logout').onclick = logout;

  document.getElementById('hamburger').onclick = () => {
    document.getElementById('nav-links').classList.toggle('open');
    document.getElementById('mobile-overlay').classList.toggle('show');
    document.getElementById('hamburger').classList.toggle('open');
  };

  await initAuth();
  updateNavbar();
  showPage(state.user ? 'dashboard' : 'auth');
});
