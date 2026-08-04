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
  lang: localStorage.getItem('emerx_lang') || 'ru',
  currentPage: 'dashboard',
  status: null, // /api/breaks/status javobi
};

window.currentLang = state.lang;

let statusTimer = null;   // countdownlarni yangilab turuvchi interval
let pollTimer = null;     // fallback polling
let socket = null;

// ==================== API HELPER ====================
async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', 'X-Lang': state.lang };
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  try {
    const res = await fetch(API + path, { headers, ...opts });
    const ct = res.headers.get('content-type') || '';

    if (!ct.includes('application/json')) {
      console.warn(`[API] Non-JSON: ${path} → ${res.status}`);
      return { error: `Server error (${res.status})` };
    }

    const text = await res.text();
    if (!text || !text.trim()) {
      console.warn(`[API] Bo'sh response: ${path}`);
      return { error: 'Empty response' };
    }

    return JSON.parse(text);
  } catch (e) {
    console.error(`[API] Xato: ${path}`, e.message);
    return { error: 'Network error' };
  }
}

// ==================== TOAST ====================
function toast(msg, isError = false) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.style.background = isError ? 'rgba(239,68,68,0.15)' : 'var(--card2)';
  el.style.borderColor = isError ? 'var(--red)' : 'var(--border)';
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ==================== TIL (i18n) ====================
function setLang(lang) {
  state.lang = lang;
  window.currentLang = lang;
  localStorage.setItem('emerx_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  applyStaticText();
  showPage(state.currentPage);
}

function applyStaticText() {
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  setText('nav-login', t('nav_login'));
  setText('nav-register', t('nav_register'));
  setText('nav-dashboard', '🍽️ ' + t('nav_dashboard'));
  setText('nav-admin', '⚙️ ' + t('nav_admin'));
  setText('nav-logout', t('nav_logout'));
}

// ==================== AUTH ====================
function fullName(u) { return u ? `${u.firstName} ${u.lastName}`.trim() : ''; }

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

async function login(phone, password) {
  const res = await api('/auth/login', { method: 'POST', body: JSON.stringify({ phone, password }) });
  if (res.token) {
    state.token = res.token;
    state.user = res.user;
    localStorage.setItem('emerx_token', res.token);
    connectSocket();
    return { ok: true };
  }
  return { ok: false, error: res.error || 'Error' };
}

async function register(firstName, lastName, phone, password, captchaToken, captchaAnswer) {
  const res = await api('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, phone, password, captchaToken, captchaAnswer })
  });
  if (res.token) {
    state.token = res.token;
    state.user = res.user;
    localStorage.setItem('emerx_token', res.token);
    connectSocket();
    return { ok: true };
  }
  return { ok: false, error: res.error || 'Error' };
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
    document.getElementById('nav-username').textContent = fullName(state.user);
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
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
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
    el.textContent = (diff >= 0 ? '⏳ ' : '⚠️ ') + fmtDuration(diff);
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
  toast(res.break.status === 'active' ? t('toast_went') : t('toast_queued'));
  loadStatusAndRender();
}
async function endBreak() {
  const res = await api('/breaks/end', { method: 'POST' });
  if (res.error) return toast(res.error, true);
  toast(t('toast_returned'));
  loadStatusAndRender();
}
async function cancelQueue() {
  const res = await api('/breaks/cancel', { method: 'DELETE' });
  if (res.error) return toast(res.error, true);
  toast(t('toast_queue_cancelled'));
  loadStatusAndRender();
}

// ==================== DASHBOARD (xodim) ====================
function renderDashboardShell() {
  document.getElementById('page-dashboard').innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>${t('dashboard_title')}</h1>
        <p>${t('dashboard_subtitle')}</p>
      </div>
      <div id="dash-body">...</div>
    </div>
  `;
}

function personListHtml(list, opts = {}) {
  if (!list.length) return `<p style="color:var(--text2);padding:8px 0">${opts.empty || '—'}</p>`;
  return `<div class="person-list">${list.map(p => `
    <div class="person-row">
      <span class="person-name">${escapeHtml(p.fullName)}</span>
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
        <p class="break-hero-label">${t('self_label')}</p>
        <h2>${t('self_none_title')}</h2>
        <button class="btn btn-primary btn-full" onclick="startBreak()">${t('self_none_btn')}</button>
      </div>`;
  } else if (s.self.status === 'active') {
    selfCard = `
      <div class="break-hero active">
        <p class="break-hero-label">${t('self_label')}</p>
        <h2>${t('self_active_title')}</h2>
        <p>${t('self_active_left')}: <b>${fmtTime(s.self.startTime)}</b> · ${t('self_active_return')}: <b>${fmtTime(s.self.expectedEndTime)}</b></p>
        <p class="countdown-big" data-countdown="${s.self.expectedEndTime}">—</p>
        <button class="btn btn-primary btn-full" onclick="endBreak()">${t('self_active_btn')}</button>
      </div>`;
  } else if (s.self.status === 'queued') {
    selfCard = `
      <div class="break-hero queued">
        <p class="break-hero-label">${t('self_label')}</p>
        <h2>${t('self_queued_title')} — ${s.self.position}${t('self_queued_position')}</h2>
        <p>${t('self_queued_note')}</p>
        <button class="btn btn-secondary btn-full" onclick="cancelQueue()">${t('self_queued_btn')}</button>
      </div>`;
  } else {
    selfCard = `
      <div class="break-hero done">
        <p class="break-hero-label">${t('self_label')}</p>
        <h2>${t('self_done_title')}</h2>
        <p>${fmtTime(s.self.startTime)} — ${fmtTime(s.self.actualEndTime)}</p>
        <button class="btn btn-primary btn-full" onclick="startBreak()">${t('self_done_btn')}</button>
      </div>`;
  }

  el.innerHTML = `
    ${selfCard}

    <div class="stats-grid" style="margin-top:28px">
      <div class="stat-card"><div class="stat-val">${s.activeCount}/${s.maxConcurrent}</div><div class="stat-lbl">${t('stat_active')}</div></div>
      <div class="stat-card"><div class="stat-val">${s.queue.length}</div><div class="stat-lbl">${t('stat_queue')}</div></div>
      <div class="stat-card"><div class="stat-val">${s.notGoneYet.length}</div><div class="stat-lbl">${t('stat_notgone')}</div></div>
    </div>

    <div class="break-section">
      <h3>${t('section_active')} (${s.active.length})</h3>
      ${personListHtml(s.active, { empty: t('empty_active'), render: p => `
        <span class="person-meta">${fmtTime(p.startTime)} → ${fmtTime(p.expectedEndTime)}</span>
        <span class="countdown-sm" data-countdown="${p.expectedEndTime}">—</span>
      `})}
    </div>

    <div class="break-section">
      <h3>${t('section_queue')} (${s.queue.length})</h3>
      ${personListHtml(s.queue, { empty: t('empty_queue'), render: p => `<span class="person-meta">${p.position}${t('self_queued_position')}</span>` })}
    </div>

    <div class="break-section">
      <h3>${t('section_notgone')} (${s.notGoneYet.length})</h3>
      ${personListHtml(s.notGoneYet, { empty: t('empty_notgone') })}
    </div>
  `;
  tickCountdowns();
}

// ==================== ADMIN ====================
function renderAdminShell() {
  document.getElementById('page-admin').innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>${t('admin_title')}</h1>
        <p>${t('admin_subtitle')}</p>
      </div>
      <div id="admin-body">...</div>

      <div class="break-section">
        <h3>${t('section_settings')}</h3>
        <form id="settings-form" class="settings-form">
          <div class="form-group">
            <label class="form-label">${t('label_duration')}</label>
            <input type="number" class="form-input" id="set-duration" min="1" max="480" required>
          </div>
          <div class="form-group">
            <label class="form-label">${t('label_maxconcurrent')}</label>
            <input type="number" class="form-input" id="set-max" min="1" max="50" required>
          </div>
          <div class="error-msg" id="settings-error"></div>
          <button type="submit" class="btn btn-primary">${t('btn_save_settings')}</button>
        </form>
      </div>

      <div class="break-section">
        <h3>${t('section_history')}</h3>
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap">
          <input type="date" class="form-input" id="history-date" style="max-width:200px">
          <button class="btn btn-secondary btn-sm" onclick="loadHistory()">${t('btn_show')}</button>
        </div>
        <div id="history-body"></div>
      </div>

      <div class="break-section">
        <h3>${t('section_add_employee')}</h3>
        <form id="employee-form" class="settings-form settings-form-wide">
          <div class="form-group">
            <label class="form-label">${t('field_firstname')}</label>
            <input class="form-input" id="emp-firstname" required minlength="2" maxlength="30">
          </div>
          <div class="form-group">
            <label class="form-label">${t('field_lastname')}</label>
            <input class="form-input" id="emp-lastname" required minlength="2" maxlength="30">
          </div>
          <div class="form-group">
            <label class="form-label">${t('field_phone')}</label>
            <input type="tel" class="form-input" id="emp-phone" placeholder="+7 ___ ___-__-__" required>
          </div>
          <div class="form-group">
            <label class="form-label">${t('field_password')}</label>
            <input type="password" class="form-input" id="emp-password" required minlength="6">
          </div>
          <div class="error-msg" id="employee-error"></div>
          <button type="submit" class="btn btn-primary">${t('btn_add_employee')}</button>
        </form>
      </div>

      <div class="break-section">
        <h3>${t('section_users')}</h3>
        <div id="users-body"></div>
      </div>

      <div class="break-section">
        <h3>${t('section_danger')}</h3>
        <div class="person-list" style="padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <span style="color:var(--text2);font-size:0.88rem">${t('wipe_note')}</span>
          <button class="btn btn-secondary" style="border-color:var(--red);color:var(--red)" onclick="wipeAllEmployees()">${t('btn_wipe_all')}</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('employee-form').addEventListener('submit', addEmployee);
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
      <div class="stat-card"><div class="stat-val">${s.activeCount}/${s.maxConcurrent}</div><div class="stat-lbl">${t('stat_active')}</div></div>
      <div class="stat-card"><div class="stat-val">${s.queue.length}</div><div class="stat-lbl">${t('stat_queue')}</div></div>
      <div class="stat-card"><div class="stat-val">${s.completed.length}</div><div class="stat-lbl">${t('admin_stat_completed')}</div></div>
      <div class="stat-card"><div class="stat-val">${s.notGoneYet.length}</div><div class="stat-lbl">${t('stat_notgone')}</div></div>
    </div>

    <div class="break-section">
      <h3>${t('section_active')}</h3>
      ${personListHtml(s.active, { empty: t('empty_active'), render: p => `
        <span class="person-meta">${fmtTime(p.startTime)} → ${fmtTime(p.expectedEndTime)}</span>
        <span class="countdown-sm" data-countdown="${p.expectedEndTime}">—</span>
      `})}
    </div>

    <div class="break-section">
      <h3>${t('section_queue')}</h3>
      ${personListHtml(s.queue, { empty: t('empty_queue'), render: p => `<span class="person-meta">${p.position}${t('self_queued_position')}</span>` })}
    </div>

    <div class="break-section">
      <h3>${t('section_notgone')}</h3>
      ${personListHtml(s.notGoneYet, { empty: t('empty_notgone') })}
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
  toast(t('toast_settings_saved'));
  loadStatusAndRender();
}

async function loadHistory() {
  const date = document.getElementById('history-date').value;
  const res = await api('/breaks/history?date=' + date);
  const body = document.getElementById('history-body');
  if (res.error) { body.innerHTML = `<p class="error-msg">${res.error}</p>`; return; }
  if (!res.records.length) { body.innerHTML = `<p style="color:var(--text2)">${t('history_empty')}</p>`; return; }

  const statusLabel = { active: t('status_active'), queued: t('status_queued'), completed: t('status_completed'), cancelled: t('status_cancelled') };
  body.innerHTML = `
    <div class="history-table">
      <div class="history-row history-head">
        <span>${t('th_employee')}</span><span>${t('th_left')}</span><span>${t('th_return')}</span><span>${t('th_status')}</span>
      </div>
      ${res.records.map(r => `
        <div class="history-row">
          <span>${escapeHtml(r.fullName)}</span>
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
        <span>${t('th_employee')}</span><span>${t('th_phone')}</span><span>${t('th_role')}</span><span>${t('th_action')}</span>
      </div>
      ${res.users.map(u => `
        <div class="history-row">
          <span>${escapeHtml(u.firstName)} ${escapeHtml(u.lastName)}</span>
          <span style="font-size:0.8rem;color:var(--text2)">${escapeHtml(u.phone)}</span>
          <span>${u.isAdmin ? t('role_admin') : t('role_employee')}${u.isBanned ? ' · ' + t('banned_label') : ''}</span>
          <span style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="resetUserPassword('${u.id}', '${escapeHtml(u.firstName)} ${escapeHtml(u.lastName)}')">${t('btn_reset_password')}</button>
            <button class="btn btn-secondary btn-sm" onclick="toggleBan('${u.id}', ${!u.isBanned})">${u.isBanned ? t('btn_unban') : t('btn_ban')}</button>
            <button class="btn btn-secondary btn-sm" onclick="toggleAdmin('${u.id}', ${!u.isAdmin})">${u.isAdmin ? t('btn_remove_admin') : t('btn_make_admin')}</button>
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

async function toggleBan(id, isBanned) {
  const res = await api(`/admin/users/${id}/ban`, { method: 'PUT', body: JSON.stringify({ isBanned }) });
  if (res.error) return toast(res.error, true);
  toast(t('toast_updated'));
  loadUsers();
}
async function toggleAdmin(id, isAdmin) {
  const res = await api(`/admin/users/${id}/admin`, { method: 'PUT', body: JSON.stringify({ isAdmin }) });
  if (res.error) return toast(res.error, true);
  toast(t('toast_updated'));
  loadUsers();
}

async function resetUserPassword(id, name) {
  const newPassword = prompt(t('reset_password_prompt').replace('{name}', name));
  if (newPassword === null) return;
  if (newPassword.length < 6) return toast(t('password_short'), true);

  const res = await api(`/admin/users/${id}/password`, { method: 'PUT', body: JSON.stringify({ newPassword }) });
  if (res.error) return toast(res.error, true);
  toast(t('toast_password_reset'));
}

async function addEmployee(e) {
  e.preventDefault();
  const firstName = document.getElementById('emp-firstname').value.trim();
  const lastName = document.getElementById('emp-lastname').value.trim();
  const phone = document.getElementById('emp-phone').value.trim();
  const password = document.getElementById('emp-password').value;
  const errEl = document.getElementById('employee-error');
  errEl.textContent = '';

  const res = await api('/admin/employees', { method: 'POST', body: JSON.stringify({ firstName, lastName, phone, password }) });
  if (res.error) { errEl.textContent = res.error; return; }

  toast(t('toast_employee_created'));
  document.getElementById('employee-form').reset();
  loadUsers();
  loadStatusAndRender();
}

async function wipeAllEmployees() {
  if (!confirm(t('wipe_confirm'))) return;
  const res = await api('/admin/wipe-all', { method: 'POST' });
  if (res.error) return toast(res.error, true);
  toast(t('toast_wipe_done'));
  loadUsers();
  loadHistory();
  loadStatusAndRender();
}

// ==================== PROFIL ====================
function renderProfile() {
  document.getElementById('page-profile').innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo"><div class="logo-big">${t('profile_title')}</div></div>

        <div class="form-group">
          <label class="form-label">${t('field_firstname')}</label>
          <input class="form-input" id="pf-firstname" value="${escapeHtml(state.user.firstName)}">
        </div>
        <div class="form-group">
          <label class="form-label">${t('field_lastname')}</label>
          <input class="form-input" id="pf-lastname" value="${escapeHtml(state.user.lastName)}">
        </div>
        <div class="error-msg" id="pf-error"></div>
        <button class="btn btn-primary btn-full" onclick="saveProfileName()">${t('btn_save')}</button>

        <div style="height:1px;background:var(--border);margin:24px 0"></div>

        <div class="form-group">
          <label class="form-label">${t('field_password_current')}</label>
          <input type="password" class="form-input" id="pf-current-pass">
        </div>
        <div class="form-group">
          <label class="form-label">${t('field_password_new')}</label>
          <input type="password" class="form-input" id="pf-new-pass">
        </div>
        <div class="error-msg" id="pf-pass-error"></div>
        <button class="btn btn-secondary btn-full" onclick="changePassword()">${t('btn_change_password')}</button>
      </div>
    </div>
  `;
}

async function saveProfileName() {
  const firstName = document.getElementById('pf-firstname').value.trim();
  const lastName = document.getElementById('pf-lastname').value.trim();
  const errEl = document.getElementById('pf-error');
  errEl.textContent = '';
  const res = await api('/profile', { method: 'PUT', body: JSON.stringify({ firstName, lastName }) });
  if (res.error) { errEl.textContent = res.error; return; }
  state.user.firstName = firstName;
  state.user.lastName = lastName;
  updateNavbar();
  toast(t('toast_saved'));
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
  toast(t('toast_password_changed'));
}

// ==================== AUTH SAHIFASI ====================
// Eslatma: "Ro'yxatdan o'tish" faqat interfeysda ochiq — backend uni
// ADMIN_PHONES ro'yxatidagi raqamlar bilan cheklaydi (birinchi super-admin
// akkauntini yaratish uchun). Boshqa xodimlar admin panel orqali qo'shiladi.
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
          <div class="logo-big"><span class="logo-x5">X5</span> <span class="logo-accent">Abet</span></div>
          <p>${t('logo_sub')}</p>
        </div>

        <div class="auth-tabs">
          <button class="auth-tab ${tab === 'login' ? 'active' : ''}" onclick="switchAuthTab('login')">${t('auth_tab_login')}</button>
          <button class="auth-tab ${tab === 'register' ? 'active' : ''}" onclick="switchAuthTab('register')">${t('auth_tab_register')}</button>
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
        <label class="form-label">${t('field_phone')}</label>
        <input type="tel" class="form-input" id="login-phone" placeholder="+7 ___ ___-__-__" required>
      </div>
      <div class="form-group">
        <label class="form-label">${t('field_password')}</label>
        <input type="password" class="form-input" id="login-password" required>
      </div>
      <div class="error-msg" id="login-error"></div>
      <button type="submit" class="btn btn-primary btn-full">${t('btn_login')}</button>
    </form>
  `;
}

function registerFormHtml() {
  return `
    <form id="register-form">
      <p style="color:var(--text2);font-size:0.82rem;margin-bottom:16px">${t('register_note')}</p>
      <div class="form-group">
        <label class="form-label">${t('field_firstname')}</label>
        <input class="form-input" id="reg-firstname" required minlength="2" maxlength="30">
      </div>
      <div class="form-group">
        <label class="form-label">${t('field_lastname')}</label>
        <input class="form-input" id="reg-lastname" required minlength="2" maxlength="30">
      </div>
      <div class="form-group">
        <label class="form-label">${t('field_phone')}</label>
        <input type="tel" class="form-input" id="reg-phone" placeholder="+7 ___ ___-__-__" required>
      </div>
      <div class="form-group">
        <label class="form-label">${t('field_password')}</label>
        <input type="password" class="form-input" id="reg-password" required minlength="6">
      </div>
      <div class="form-group">
        <label class="form-label">${t('captcha_label')}: <span id="captcha-question">${t('captcha_loading')}</span></label>
        <input class="form-input" id="reg-captcha" required>
      </div>
      <div class="error-msg" id="register-error"></div>
      <button type="submit" class="btn btn-primary btn-full">${t('btn_register')}</button>
    </form>
  `;
}

async function onLoginSubmit(e) {
  e.preventDefault();
  const phone = document.getElementById('login-phone').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';
  const res = await login(phone, password);
  if (!res.ok) { errEl.textContent = res.error; return; }
  updateNavbar();
  showPage('dashboard');
}

async function onRegisterSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById('reg-firstname').value.trim();
  const lastName = document.getElementById('reg-lastname').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const password = document.getElementById('reg-password').value;
  const captchaAnswer = document.getElementById('reg-captcha').value;
  const errEl = document.getElementById('register-error');
  errEl.textContent = '';

  if (!captchaState) { errEl.textContent = 'Error'; return; }

  const res = await register(firstName, lastName, phone, password, captchaState.token, captchaAnswer);
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
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.onclick = () => setLang(b.dataset.lang);
  });

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

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === state.lang);
  });
  applyStaticText();

  await initAuth();
  updateNavbar();
  showPage(state.user ? 'dashboard' : 'auth');
});
