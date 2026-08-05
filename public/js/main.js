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
let announcementsTimer = null; // bildirishnomalarni fon rejimida yangilab turish
let socket = null;
let chatMessages = [];
let chatMode = 'group'; // 'group' | 'dm'
let dmContacts = [];
let dmActiveContact = null; // hozir ochiq bo'lgan shaxsiy suhbatdosh id
let dmMessages = {};        // contactId -> xabarlar ro'yxati
let dmUnread = new Set();   // hali ko'rilmagan shaxsiy xabar bo'lgan kontaktlar
let lastHistoryRecords = []; // eksport uchun oxirgi yuklangan tarix yozuvlari
let lastHistoryDate = '';

const SEND_ICON_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

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
  setText('nav-chat', '💬 ' + t('nav_chat'));
  setText('nav-announcements', '📢 ' + t('nav_announcements'));
  setText('nav-admin', '⚙️ ' + t('nav_admin'));
  setText('nav-logout', t('nav_logout'));
  const bellTitle = t('nav_bell');
  const bell = document.getElementById('nav-bell');
  if (bell) bell.title = bellTitle;
  const bellMobile = document.getElementById('nav-bell-mobile');
  if (bellMobile) bellMobile.title = bellTitle;
  if (state.currentPage === 'announcements') renderAnnouncementsPage();
}

// ==================== AUTH ====================
function fullName(u) { return u ? `${u.firstName} ${u.lastName}`.trim() : ''; }

async function initAuth() {
  if (!state.token) return;
  const user = await api('/auth/me');
  if (user.id) {
    state.user = user;
    connectSocket();
    startAnnouncements();
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
    startAnnouncements();
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
    startAnnouncements();
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
  stopAnnouncements();
  updateNavbar();
  showPage('auth');
}

// Adminlar uchun: qaysi chat/sahifada bo'lishidan qat'iy nazar,
// har qanday kelgan xabar haqida alert (toast) ko'rsatish.
function adminAlert(icon, name, text) {
  if (!state.user || !state.user.isAdmin) return;
  const preview = (text || '').length > 60 ? text.slice(0, 60) + '…' : (text || '');
  toast(`${icon} ${name}: ${preview}`);
}

// ==================== SOCKET.IO (jonli yangilanish) ====================
function connectSocket() {
  if (socket) return;
  socket = io({ auth: { token: state.token } });
  socket.on('breaks:changed', () => {
    if (state.currentPage === 'dashboard' || state.currentPage === 'admin') {
      loadStatusAndRender();
    }
    if (state.currentPage === 'dashboard') loadSchedule();
  });
  socket.on('announcements:changed', loadAnnouncements);

  socket.on('chat:history', (history) => {
    chatMessages = history;
    if (state.currentPage === 'chat') renderChatMessages();
  });
  socket.on('chat:message', (msg) => {
    chatMessages.push(msg);
    if (state.currentPage === 'chat') { renderChatMessages(); scrollChatToBottom(); }
    if (state.user && msg.userId !== state.user.id) adminAlert('💬', msg.fullName, msg.text);
  });
  socket.on('chat:deleted', (msgId) => {
    const m = chatMessages.find(x => x._id === msgId);
    if (m) m.deleted = true;
    if (state.currentPage === 'chat') renderChatMessages();
  });
  socket.on('chat:error', (code) => {
    const map = {
      rate_limit: t('chat_rate_limit'), auth_required: t('chat_auth_required'),
      no_access: t('chat_no_access'), invalid_length: t('chat_invalid_length'),
    };
    toast(map[code] || code, true);
  });

  socket.on('dm:history', ({ with: withId, messages: history }) => {
    dmMessages[withId] = history;
    if (state.currentPage === 'chat' && chatMode === 'dm' && dmActiveContact === withId) {
      renderDMThread();
    }
  });
  socket.on('dm:message', (msg) => {
    const me = state.user && state.user.id;
    const partner = msg.fromId === me ? msg.toId : msg.fromId;
    if (!dmMessages[partner]) dmMessages[partner] = [];
    dmMessages[partner].push(msg);

    const viewing = state.currentPage === 'chat' && chatMode === 'dm' && dmActiveContact === partner;
    if (viewing) {
      renderDMThread();
      scrollChatToBottom();
    } else if (msg.fromId !== me) {
      dmUnread.add(partner);
      if (state.currentPage === 'chat' && chatMode === 'dm') renderDMContacts();
    }
    if (msg.fromId !== me) adminAlert('✉️', msg.fromName, msg.text);
  });
  socket.on('dm:deleted', ({ id, with: withId }) => {
    const list = dmMessages[withId];
    const m = list && list.find(x => x._id === id);
    if (m) m.deleted = true;
    if (state.currentPage === 'chat' && chatMode === 'dm' && dmActiveContact === withId) renderDMThread();
  });
  socket.on('dm:error', (code) => {
    const map = {
      rate_limit: t('chat_rate_limit'), auth_required: t('chat_auth_required'),
      no_access: t('chat_no_access'), invalid_length: t('chat_invalid_length'),
      not_found: t('dm_not_found'),
    };
    toast(map[code] || code, true);
  });
}
function disconnectSocket() {
  if (socket) { socket.disconnect(); socket = null; }
  chatMessages = [];
  chatMode = 'group';
  dmContacts = [];
  dmActiveContact = null;
  dmMessages = {};
  dmUnread = new Set();
}

// ==================== BILDIRISHNOMALAR (Yangiliklar sahifasi) ====================
let announcementsState = { items: [], hasUnread: false };

function startAnnouncements() {
  loadAnnouncements();
  clearInterval(announcementsTimer);
  announcementsTimer = setInterval(loadAnnouncements, 30000);
}
function stopAnnouncements() {
  clearInterval(announcementsTimer);
  announcementsState = { items: [], hasUnread: false };
  setBellDot(false);
}

function setBellDot(show) {
  const dot = document.getElementById('bell-dot');
  const dotMobile = document.getElementById('bell-dot-mobile');
  if (dot) dot.style.display = show ? 'block' : 'none';
  if (dotMobile) dotMobile.style.display = show ? 'block' : 'none';
}

async function loadAnnouncements() {
  const res = await api('/announcements');
  if (res.error) return;
  announcementsState = res;
  setBellDot(res.hasUnread);
  if (state.currentPage === 'announcements') renderAnnouncementsPage();
}

function renderAnnouncementsPage() {
  const page = document.getElementById('page-announcements');
  if (!page) return;
  const items = announcementsState.items || [];

  const list = !items.length
    ? `<div class="announcements-empty">${t('announcements_empty')}</div>`
    : `<div class="announcements-list">${items.map(a => `
        <div class="announcement-item">
          <h4>${escapeHtml(a.title)}</h4>
          <p>${escapeHtml(a.body)}</p>
          <div class="announcement-meta">
            <span>${escapeHtml(a.createdBy)} · ${fmtDateTime(a.createdAt)}</span>
            ${state.user && state.user.isAdmin ? `<button class="announcement-del" onclick="deleteAnnouncement('${a.id}')">✖ ${t('btn_delete')}</button>` : ''}
          </div>
        </div>
      `).join('')}</div>`;

  page.innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>📢 ${t('nav_announcements')}</h1>
      </div>
      ${list}
    </div>
  `;
}

async function markAnnouncementsSeen() {
  setBellDot(false);
  announcementsState.hasUnread = false;
  await api('/announcements/seen', { method: 'PUT' });
}

async function deleteAnnouncement(id) {
  const res = await api(`/announcements/${id}`, { method: 'DELETE' });
  if (res.error) return toast(res.error, true);
  toast(t('toast_announcement_deleted'));
  loadAnnouncements();
}

// ==================== CHAT ====================
function renderChatPage() {
  const page = document.getElementById('page-chat');
  if (!page) return;
  page.innerHTML = `
    <div class="chat-page">
      <div class="chat-header">
        <h1>${t('chat_title')}</h1>
        <div class="chat-tabs">
          <button class="chat-tab ${chatMode === 'group' ? 'active' : ''}" id="chat-tab-group">${t('chat_tab_group')}</button>
          <button class="chat-tab ${chatMode === 'dm' ? 'active' : ''}" id="chat-tab-dm">${t('chat_tab_private')}</button>
        </div>
      </div>
      <div id="chat-body"></div>
    </div>
  `;
  document.getElementById('chat-tab-group').onclick = () => { chatMode = 'group'; renderChatPage(); };
  document.getElementById('chat-tab-dm').onclick = () => { chatMode = 'dm'; renderChatPage(); loadDMContacts(); };

  if (chatMode === 'group') renderGroupChat();
  else renderDMPage();
}

function renderGroupChat() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  body.innerHTML = `
    <div class="chat-window">
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input-row">
        <input class="chat-input" id="chat-input" maxlength="300" placeholder="${t('chat_placeholder')}">
        <button class="btn btn-primary chat-send-btn" id="chat-send-btn" title="${t('chat_send')}" aria-label="${t('chat_send')}">${SEND_ICON_SVG}</button>
      </div>
    </div>
  `;
  document.getElementById('chat-send-btn').onclick = sendChatMessage;
  renderChatMessages();
  scrollChatToBottom();
}

function avatarHtml(url, initial) {
  return url
    ? `<img class="chat-avatar-img" src="${escapeHtml(url)}" alt="">`
    : `<div class="chat-avatar-letter">${escapeHtml(initial)}</div>`;
}

function renderChatMessages() {
  const el = document.getElementById('chat-messages');
  if (!el) return;

  if (!chatMessages.length) {
    el.innerHTML = `<div class="chat-empty">${t('chat_empty')}</div>`;
    return;
  }

  el.innerHTML = chatMessages.map(m => {
    const mine = state.user && m.userId === state.user.id;
    const initial = (m.fullName || '?').trim().charAt(0).toUpperCase();
    const canDelete = state.user && state.user.isAdmin && !m.deleted;
    return `
      <div class="chat-msg ${mine ? 'chat-msg-me' : ''} ${m.deleted ? 'deleted' : ''}">
        <div class="chat-avatar">${avatarHtml(m.avatar, initial)}</div>
        <div class="chat-msg-body">
          <div class="chat-msg-header">
            <span class="chat-username ${mine ? 'me' : ''}">${escapeHtml(m.fullName)}</span>
            ${m.isAdmin ? `<span class="chat-admin-badge">ADMIN</span>` : ''}
            <span class="chat-time">${fmtTime(m.createdAt)}</span>
            ${canDelete ? `<button class="chat-del-btn" onclick="deleteChatMessage('${m._id}')" title="${t('btn_delete')}">✖</button>` : ''}
          </div>
          <div class="chat-msg-text">${m.deleted ? t('chat_deleted') : escapeHtml(m.text)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function scrollChatToBottom() {
  const el = document.getElementById('chat-messages') || document.getElementById('dm-messages');
  if (el) el.scrollTop = el.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text || !socket) return;
  socket.emit('chat:send', text);
  input.value = '';
}

function deleteChatMessage(id) {
  if (socket) socket.emit('chat:delete', id);
}

// ==================== SHAXSIY XABARLAR (DM) ====================
async function loadDMContacts() {
  const res = await api('/profile/contacts');
  if (res.error) return;
  dmContacts = res.users || [];
  if (state.currentPage === 'chat' && chatMode === 'dm') renderDMContacts();
}

function renderDMPage() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  body.innerHTML = `
    <div class="dm-layout ${dmActiveContact ? 'dm-thread-open' : ''}">
      <div class="dm-contacts" id="dm-contacts"></div>
      <div class="dm-thread" id="dm-thread"></div>
    </div>
  `;
  renderDMContacts();
  renderDMThread();
  if (!dmContacts.length) loadDMContacts();
}

function renderDMContacts() {
  const el = document.getElementById('dm-contacts');
  if (!el) return;

  if (!dmContacts.length) {
    el.innerHTML = `<div class="chat-empty">${t('chat_contacts_empty')}</div>`;
    return;
  }

  el.innerHTML = dmContacts.map(c => {
    const name = `${c.firstName} ${c.lastName}`.trim();
    const initial = (name || '?').trim().charAt(0).toUpperCase();
    const active = dmActiveContact === c.id;
    const unread = dmUnread.has(c.id);
    return `
      <div class="dm-contact ${active ? 'active' : ''}" onclick="openDMContact('${c.id}')">
        <div class="chat-avatar">${avatarHtml(c.avatar, initial)}</div>
        <div class="dm-contact-name">${escapeHtml(name)}${c.isAdmin ? ` <span class="chat-admin-badge">ADMIN</span>` : ''}</div>
        ${unread ? '<span class="dm-unread-dot"></span>' : ''}
      </div>
    `;
  }).join('');
}

function openDMContact(id) {
  dmActiveContact = id;
  dmUnread.delete(id);
  if (socket) socket.emit('dm:open', id);
  document.querySelector('.dm-layout')?.classList.add('dm-thread-open');
  renderDMContacts();
  renderDMThread();
  scrollChatToBottom();
}

function closeDMThread() {
  dmActiveContact = null;
  renderDMPage();
}

function renderDMThread() {
  const el = document.getElementById('dm-thread');
  if (!el) return;

  if (!dmActiveContact) {
    el.innerHTML = `<div class="dm-empty-state">${t('chat_select_contact')}</div>`;
    return;
  }

  const contact = dmContacts.find(c => c.id === dmActiveContact);
  const name = contact ? `${contact.firstName} ${contact.lastName}`.trim() : '';
  const msgs = dmMessages[dmActiveContact] || [];

  const list = !msgs.length
    ? `<div class="chat-empty">${t('chat_empty')}</div>`
    : msgs.map(m => {
        const mine = state.user && m.fromId === state.user.id;
        const canDelete = mine && !m.deleted;
        return `
          <div class="chat-msg ${mine ? 'chat-msg-me' : ''} ${m.deleted ? 'deleted' : ''}">
            <div class="chat-msg-body">
              <div class="chat-msg-header">
                <span class="chat-time">${fmtTime(m.createdAt)}</span>
                ${canDelete ? `<button class="chat-del-btn" onclick="deleteDMMessage('${m._id}')" title="${t('btn_delete')}">✖</button>` : ''}
              </div>
              <div class="chat-msg-text">${m.deleted ? t('chat_deleted') : escapeHtml(m.text)}</div>
            </div>
          </div>
        `;
      }).join('');

  el.innerHTML = `
    <div class="dm-thread-header">
      <button class="dm-back-btn" onclick="closeDMThread()">←</button>
      <span>${escapeHtml(name)}</span>
    </div>
    <div class="chat-messages" id="dm-messages">${list}</div>
    <div class="chat-input-row">
      <input class="chat-input" id="dm-input" maxlength="300" placeholder="${t('dm_placeholder')}">
      <button class="btn btn-primary chat-send-btn" id="dm-send-btn" title="${t('chat_send')}" aria-label="${t('chat_send')}">${SEND_ICON_SVG}</button>
    </div>
  `;
  document.getElementById('dm-send-btn').onclick = sendDMMessage;
  scrollChatToBottom();
}

function sendDMMessage() {
  const input = document.getElementById('dm-input');
  if (!input || !dmActiveContact) return;
  const text = input.value.trim();
  if (!text || !socket) return;
  socket.emit('dm:send', { to: dmActiveContact, text });
  input.value = '';
}

function deleteDMMessage(id) {
  if (socket) socket.emit('dm:delete', id);
}

// ==================== NAV ====================
function updateNavbar() {
  const navAuth = document.getElementById('nav-auth');
  const navUser = document.getElementById('nav-user');
  const bellMobile = document.getElementById('nav-bell-mobile');

  if (state.user) {
    navAuth.style.display = 'none';
    navUser.style.display = 'flex';
    document.getElementById('nav-username').textContent = fullName(state.user);
    const navAvatar = document.getElementById('nav-avatar');
    if (navAvatar) {
      if (state.user.avatar) { navAvatar.src = state.user.avatar; navAvatar.style.display = 'inline-block'; }
      else { navAvatar.style.display = 'none'; }
    }
    const navAdmin = document.getElementById('nav-admin');
    navAdmin.style.display = state.user.isAdmin ? 'inline-flex' : 'none';
    if (bellMobile) bellMobile.classList.add('shown');
  } else {
    navAuth.style.display = 'flex';
    navUser.style.display = 'none';
    if (bellMobile) bellMobile.classList.remove('shown');
  }
}

function closeMobileMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('show');
  document.getElementById('hamburger').classList.remove('open');
}

// ==================== ROUTING ====================
function showPage(name) {
  const authRequired = ['dashboard', 'admin', 'profile', 'announcements', 'chat'];
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
  if (name === 'dashboard') { renderDashboardShell(); loadStatusAndRender(); loadSchedule(); startPolling(); }
  if (name === 'admin') { renderAdminShell(); loadStatusAndRender(); startPolling(); }
  if (name === 'profile') renderProfile();
  if (name === 'announcements') { renderAnnouncementsPage(); if (announcementsState.hasUnread) markAnnouncementsSeen(); }
  if (name === 'chat') renderChatPage();

  window.scrollTo(0, 0);
}

function startPolling() {
  // Socket ishlamay qolsa ham holat yangilanib tursin
  pollTimer = setInterval(() => {
    loadStatusAndRender();
    if (state.currentPage === 'dashboard') loadSchedule();
  }, 20000);
  // Countdownlarni har soniya yangilash
  statusTimer = setInterval(tickCountdowns, 1000);
}

// ==================== VAQT YORDAMCHILARI ====================
function fmtTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' });
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' });
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

// ==================== JADVAL (oldindan band qilish) ====================
async function loadSchedule() {
  const res = await api('/breaks/schedule');
  if (res.error) return;
  state.schedule = res;
  if (state.currentPage === 'dashboard') renderSchedule();
}

function renderSchedule() {
  const el = document.getElementById('schedule-body');
  if (!el || !state.schedule) return;
  const { slots } = state.schedule;

  if (!slots.length) {
    el.innerHTML = `<p style="color:var(--text2)">${t('schedule_empty')}</p>`;
    return;
  }

  el.innerHTML = `<div class="slot-grid">${slots.map(sl => {
    const disabled = sl.isPast || sl.isFull;
    const cls = sl.isPast ? 'slot-past' : sl.isFull ? 'slot-full' : 'slot-free';
    return `
      <button class="slot-btn ${cls}" ${disabled ? 'disabled' : ''} onclick="bookSlot('${sl.start}')">
        <span class="slot-time">${fmtTime(sl.start)}–${fmtTime(sl.end)}</span>
        <span class="slot-count">${sl.booked}/${sl.capacity}</span>
      </button>`;
  }).join('')}</div>`;
}

async function bookSlot(slotStart) {
  const res = await api('/breaks/book', { method: 'POST', body: JSON.stringify({ slotStart }) });
  if (res.error) return toast(res.error, true);
  toast(t('toast_booked'));
  loadStatusAndRender();
  loadSchedule();
}

async function cancelBooking() {
  const res = await api('/breaks/book', { method: 'DELETE' });
  if (res.error) return toast(res.error, true);
  toast(t('toast_booking_cancelled'));
  loadStatusAndRender();
  loadSchedule();
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
  } else if (s.self.status === 'booked') {
    selfCard = `
      <div class="break-hero queued">
        <p class="break-hero-label">${t('self_label')}</p>
        <h2>${t('self_booked_title')} ${fmtTime(s.self.bookedSlot)}–${fmtTime(s.self.bookedSlotEnd)}</h2>
        <p>${t('self_booked_note')}</p>
        <button class="btn btn-secondary btn-full" onclick="cancelBooking()">${t('self_booked_cancel')}</button>
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
      <h3>${t('section_schedule')}</h3>
      <p style="color:var(--text2);font-size:0.85rem;margin-bottom:14px">${t('section_schedule_note')}</p>
      <div id="schedule-body">...</div>
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
      <h3>${t('section_booked')} (${s.booked.length})</h3>
      ${personListHtml(s.booked, { empty: t('empty_booked'), render: p => `<span class="person-meta">${fmtTime(p.bookedSlot)}–${fmtTime(p.bookedSlotEnd)}</span>` })}
    </div>

    <div class="break-section">
      <h3>${t('section_notgone')} (${s.notGoneYet.length})</h3>
      ${personListHtml(s.notGoneYet, { empty: t('empty_notgone') })}
    </div>
  `;
  tickCountdowns();
  renderSchedule();
}

// ==================== ADMIN ====================
let adminOpenSection = null; // 'settings' | 'history' | 'announcement' | 'addEmployee' | 'employees' | 'danger' | null

function renderAdminShell() {
  document.getElementById('page-admin').innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>${t('admin_title')}</h1>
        <p>${t('admin_subtitle')}</p>
      </div>
      <div id="admin-body">...</div>

      <div class="break-section">
        <h3>${t('admin_more_label')}</h3>
        <div class="admin-menu-grid" id="admin-menu-grid"></div>
        <div id="admin-section-panel"></div>
      </div>
    </div>
  `;
  adminOpenSection = null;
  renderAdminMenu();
}

function renderAdminMenu() {
  const grid = document.getElementById('admin-menu-grid');
  if (!grid) return;
  const isSuper = !!(state.user && state.user.isSuperAdmin);

  const cards = [
    { key: 'settings', icon: '⚙️', label: t('section_settings') },
    { key: 'history', icon: '📋', label: t('section_history') },
    { key: 'announcement', icon: '📢', label: t('section_announcements') },
    { key: 'addEmployee', icon: '➕', label: t('section_add_employee') },
    { key: 'employees', icon: '👥', label: t('section_users') },
  ];
  if (isSuper) cards.push({ key: 'danger', icon: '⚠️', label: t('section_danger'), danger: true });

  grid.innerHTML = cards.map(c => `
    <button type="button" class="admin-menu-card ${c.danger ? 'admin-menu-card-danger' : ''} ${adminOpenSection === c.key ? 'active' : ''}" onclick="openAdminSection('${c.key}')">
      <span class="admin-menu-icon">${c.icon}</span>
      <span class="admin-menu-label">${c.label}</span>
    </button>
  `).join('');
}

function openAdminSection(key) {
  adminOpenSection = adminOpenSection === key ? null : key;
  renderAdminMenu();
  renderAdminSectionPanel();
}

function renderAdminSectionPanel() {
  const panel = document.getElementById('admin-section-panel');
  if (!panel) return;

  if (adminOpenSection === 'danger' && !(state.user && state.user.isSuperAdmin)) adminOpenSection = null;
  if (!adminOpenSection) { panel.innerHTML = ''; return; }

  if (adminOpenSection === 'settings') {
    panel.innerHTML = `
      <div class="break-section admin-section-open">
        <form id="settings-form" class="settings-form settings-form-wide">
          <div class="form-group">
            <label class="form-label">${t('label_duration')}</label>
            <input type="number" class="form-input" id="set-duration" min="1" max="480" required>
          </div>
          <div class="form-group">
            <label class="form-label">${t('label_maxconcurrent')}</label>
            <input type="number" class="form-input" id="set-max" min="1" max="50" required>
          </div>
          <div class="form-group">
            <label class="form-label">${t('label_workstart')}</label>
            <input type="time" class="form-input" id="set-workstart" required>
          </div>
          <div class="form-group">
            <label class="form-label">${t('label_workend')}</label>
            <input type="time" class="form-input" id="set-workend" required>
          </div>
          <div class="error-msg" id="settings-error"></div>
          <button type="submit" class="btn btn-primary">${t('btn_save_settings')}</button>
        </form>
      </div>
    `;
    document.getElementById('settings-form').addEventListener('submit', saveSettings);
    if (state.status) {
      document.getElementById('set-duration').value = state.status.settings.breakDurationMinutes;
      document.getElementById('set-max').value = state.status.settings.maxConcurrent;
      document.getElementById('set-workstart').value = state.status.settings.workStart;
      document.getElementById('set-workend').value = state.status.settings.workEnd;
    }
  } else if (adminOpenSection === 'history') {
    panel.innerHTML = `
      <div class="break-section admin-section-open">
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap">
          <input type="date" class="form-input" id="history-date" style="max-width:200px">
          <button class="btn btn-secondary btn-sm" onclick="loadHistory()">${t('btn_show')}</button>
          <button class="btn btn-secondary btn-sm" onclick="exportHistoryCSV()">${t('btn_export')}</button>
        </div>
        <div id="history-body"></div>
      </div>
    `;
    document.getElementById('history-date').value = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Moscow' });
    loadHistory();
  } else if (adminOpenSection === 'announcement') {
    panel.innerHTML = `
      <div class="break-section admin-section-open">
        <form id="announcement-form" class="settings-form" style="grid-template-columns:1fr;align-items:stretch">
          <div class="form-group">
            <label class="form-label">${t('field_title')}</label>
            <input class="form-input" id="ann-title" required maxlength="120">
          </div>
          <div class="form-group">
            <label class="form-label">${t('field_body')}</label>
            <textarea class="form-input" id="ann-body" required maxlength="2000" rows="3" style="resize:vertical"></textarea>
          </div>
          <div class="error-msg" id="announcement-error"></div>
          <button type="submit" class="btn btn-primary">${t('btn_send')}</button>
        </form>
      </div>
    `;
    document.getElementById('announcement-form').addEventListener('submit', sendAnnouncement);
  } else if (adminOpenSection === 'addEmployee') {
    panel.innerHTML = `
      <div class="break-section admin-section-open">
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
    `;
    document.getElementById('employee-form').addEventListener('submit', addEmployee);
  } else if (adminOpenSection === 'employees') {
    panel.innerHTML = `<div class="break-section admin-section-open"><div id="users-body"></div></div>`;
    loadUsers();
  } else if (adminOpenSection === 'danger') {
    panel.innerHTML = `
      <div class="break-section admin-section-open">
        <div class="person-list" style="padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <span style="color:var(--text2);font-size:0.88rem">${t('wipe_note')}</span>
          <button class="btn btn-secondary" style="border-color:var(--red);color:var(--red)" onclick="wipeAllEmployees()">${t('btn_wipe_all')}</button>
        </div>
      </div>
    `;
  }
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
      <h3>${t('section_booked')}</h3>
      ${personListHtml(s.booked, { empty: t('empty_booked'), render: p => `<span class="person-meta">${fmtTime(p.bookedSlot)}–${fmtTime(p.bookedSlotEnd)}</span>` })}
    </div>

    <div class="break-section">
      <h3>${t('section_notgone')}</h3>
      ${personListHtml(s.notGoneYet, { empty: t('empty_notgone') })}
    </div>
  `;

  const setVal = (id, val) => { const field = document.getElementById(id); if (field) field.value = val; };
  setVal('set-duration', s.settings.breakDurationMinutes);
  setVal('set-max', s.settings.maxConcurrent);
  setVal('set-workstart', s.settings.workStart);
  setVal('set-workend', s.settings.workEnd);
  tickCountdowns();
}

async function saveSettings(e) {
  e.preventDefault();
  const breakDurationMinutes = document.getElementById('set-duration').value;
  const maxConcurrent = document.getElementById('set-max').value;
  const workStart = document.getElementById('set-workstart').value;
  const workEnd = document.getElementById('set-workend').value;
  const errEl = document.getElementById('settings-error');
  errEl.textContent = '';
  const res = await api('/breaks/settings', {
    method: 'PUT',
    body: JSON.stringify({ breakDurationMinutes, maxConcurrent, workStart, workEnd })
  });
  if (res.error) { errEl.textContent = res.error; return; }
  toast(t('toast_settings_saved'));
  loadStatusAndRender();
  loadSchedule();
}

async function loadHistory() {
  const date = document.getElementById('history-date').value;
  const res = await api('/breaks/history?date=' + date);
  const body = document.getElementById('history-body');
  if (res.error) { body.innerHTML = `<p class="error-msg">${res.error}</p>`; return; }
  lastHistoryRecords = res.records;
  lastHistoryDate = date;
  if (!res.records.length) { body.innerHTML = `<p style="color:var(--text2)">${t('history_empty')}</p>`; return; }

  const statusLabel = { active: t('status_active'), queued: t('status_queued'), booked: t('status_booked'), completed: t('status_completed'), cancelled: t('status_cancelled') };
  body.innerHTML = `
    <div class="history-table">
      <div class="history-row history-head">
        <span>${t('th_employee')}</span><span>${t('th_left')}</span><span>${t('th_return')}</span><span>${t('th_status')}</span>
      </div>
      ${res.records.map(r => `
        <div class="history-row">
          <span>${escapeHtml(r.fullName)}</span>
          <span>${fmtTime(r.startTime || r.bookedSlot)}</span>
          <span>${fmtTime(r.actualEndTime)}</span>
          <span>${statusLabel[r.status] || r.status}${r.autoEnded ? ' 🤖' : ''}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function exportHistoryCSV() {
  if (!lastHistoryRecords.length) return toast(t('export_empty'), true);

  const statusLabel = { active: t('status_active'), queued: t('status_queued'), booked: t('status_booked'), completed: t('status_completed'), cancelled: t('status_cancelled') };
  const csvEscape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const header = [t('th_employee'), t('th_left'), t('th_return'), t('th_status')];
  const rows = lastHistoryRecords.map(r => [
    r.fullName,
    fmtTime(r.startTime || r.bookedSlot),
    fmtTime(r.actualEndTime),
    (statusLabel[r.status] || r.status) + (r.autoEnded ? ' (auto)' : ''),
  ]);
  const csv = '﻿' + [header, ...rows].map(row => row.map(csvEscape).join(';')).join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `x5-abet-${lastHistoryDate}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function loadUsers() {
  const res = await api('/admin/users?limit=50');
  const body = document.getElementById('users-body');
  if (!body) return;
  if (res.error) { body.innerHTML = `<p class="error-msg">${res.error}</p>`; return; }

  const isSuper = !!(state.user && state.user.isSuperAdmin);

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
            ${isSuper ? `<button class="btn btn-secondary btn-sm" onclick="toggleAdmin('${u.id}', ${!u.isAdmin})">${u.isAdmin ? t('btn_remove_admin') : t('btn_make_admin')}</button>` : ''}
            ${isSuper ? `<button class="btn btn-secondary btn-sm" style="border-color:var(--red);color:var(--red)" onclick="deleteUser('${u.id}', '${escapeHtml(u.firstName)} ${escapeHtml(u.lastName)}')">${t('btn_delete')}</button>` : ''}
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

async function deleteUser(id, name) {
  if (!confirm(t('delete_user_confirm').replace('{name}', name))) return;
  const res = await api(`/admin/users/${id}`, { method: 'DELETE' });
  if (res.error) return toast(res.error, true);
  toast(t('toast_user_deleted'));
  loadUsers();
  loadStatusAndRender();
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

async function sendAnnouncement(e) {
  e.preventDefault();
  const title = document.getElementById('ann-title').value.trim();
  const body = document.getElementById('ann-body').value.trim();
  const errEl = document.getElementById('announcement-error');
  errEl.textContent = '';

  const res = await api('/announcements', { method: 'POST', body: JSON.stringify({ title, body }) });
  if (res.error) { errEl.textContent = res.error; return; }

  toast(t('toast_announcement_sent'));
  document.getElementById('announcement-form').reset();
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

        <div style="display:flex;justify-content:center;margin-bottom:8px">
          <div class="profile-avatar-wrap">
            <div class="profile-avatar" id="pf-avatar-preview">
              ${state.user.avatar ? `<img src="${escapeHtml(state.user.avatar)}" alt="">` : escapeHtml((state.user.firstName || '?').trim().charAt(0).toUpperCase())}
            </div>
            <button type="button" class="avatar-upload-btn" id="pf-avatar-btn" title="${t('avatar_change')}">📷</button>
            <input type="file" accept="image/*" id="pf-avatar-input" style="display:none">
          </div>
        </div>
        <div style="text-align:center;margin-bottom:20px" class="avatar-upload-hint">${t('avatar_hint')}</div>

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

        <div style="height:1px;background:var(--border);margin:24px 0"></div>

        <div class="form-label" style="margin-bottom:10px">${t('push_section_title')}</div>
        <div id="push-section"></div>
      </div>
    </div>
  `;
  renderPushSection();
  document.getElementById('pf-avatar-btn').onclick = () => document.getElementById('pf-avatar-input').click();
  document.getElementById('pf-avatar-input').addEventListener('change', handleAvatarSelect);
}

async function handleAvatarSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { toast(t('avatar_invalid'), true); return; }

  try {
    const dataUrl = await resizeImageToDataUrl(file, 220);
    const res = await api('/profile/avatar', { method: 'PUT', body: JSON.stringify({ avatar: dataUrl }) });
    if (res.error) { toast(res.error, true); return; }
    state.user.avatar = dataUrl;
    updateNavbar();
    renderProfile();
    toast(t('toast_avatar_updated'));
    // Socket ulanishi kirganda olingan foydalanuvchi rasmini keshlaydi —
    // yangi rasm chat xabarlarida ko'rinishi uchun qayta ulaymiz.
    if (socket) { disconnectSocket(); connectSocket(); }
  } catch (err) {
    console.error('avatar xato:', err);
    toast(t('avatar_invalid'), true);
  }
}

function resizeImageToDataUrl(file, size) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => reject(new Error('image load error'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('file read error'));
    reader.readAsDataURL(file);
  });
}

// ==================== PUSH BILDIRISHNOMALARI ====================
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

function pushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

async function getPushSubscription() {
  if (!pushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.ready;
    return await reg.pushManager.getSubscription();
  } catch {
    return null;
  }
}

async function renderPushSection() {
  const el = document.getElementById('push-section');
  if (!el) return;
  if (!pushSupported()) {
    el.innerHTML = `<p style="color:var(--text2);font-size:0.85rem">${t('push_unsupported')}</p>`;
    return;
  }
  const sub = await getPushSubscription();
  const enabled = !!sub;
  el.innerHTML = `
    <button class="btn ${enabled ? 'btn-secondary' : 'btn-primary'} btn-full" id="push-toggle-btn">
      ${enabled ? t('push_disable') : t('push_enable')}
    </button>
  `;
  const btn = document.getElementById('push-toggle-btn');
  if (btn) btn.onclick = enabled ? disablePush : enablePush;
}

async function enablePush() {
  if (!pushSupported()) return toast(t('push_unsupported'), true);
  try {
    const reg = await navigator.serviceWorker.ready;
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { toast(t('push_denied'), true); return; }

    const keyRes = await api('/push/public-key');
    if (keyRes.error || !keyRes.publicKey) { toast(keyRes.error || t('push_unsupported'), true); return; }

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(keyRes.publicKey),
    });
    const res = await api('/push/subscribe', { method: 'POST', body: JSON.stringify(sub.toJSON()) });
    if (res.error) { toast(res.error, true); }
    else toast(t('push_enabled_toast'));
  } catch (e) {
    console.error('push subscribe xato:', e);
    toast(t('push_unsupported'), true);
  }
  renderPushSection();
}

async function disablePush() {
  try {
    const sub = await getPushSubscription();
    if (sub) {
      await api('/push/unsubscribe', { method: 'POST', body: JSON.stringify({ endpoint: sub.endpoint }) });
      await sub.unsubscribe();
    }
    toast(t('push_disabled_toast'));
  } catch (e) {
    console.error('push unsubscribe xato:', e);
  }
  renderPushSection();
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
  document.getElementById('nav-chat').onclick = () => showPage('chat');
  document.getElementById('nav-announcements').onclick = () => showPage('announcements');
  document.getElementById('nav-admin').onclick = () => showPage('admin');
  document.getElementById('nav-profile').onclick = () => showPage('profile');
  document.getElementById('nav-logout').onclick = logout;
  document.getElementById('nav-bell').onclick = () => showPage('announcements');
  document.getElementById('nav-bell-mobile').onclick = () => showPage('announcements');

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
