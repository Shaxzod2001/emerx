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
  courses: [],
  progress: [],
  currentCourse: null,
  currentLesson: null,
  stats: { completed: 0, quizAvg: 0 },
  coins: 0
};

window.currentLang = state.lang;

// ==================== API HELPER ====================
async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  try {
    const res = await fetch(API + path, { headers, ...opts });
    const ct = res.headers.get('content-type') || '';

    // Content-type JSON emas (HTML xato sahifasi, 502, 503 va h.k.)
    if (!ct.includes('application/json')) {
      console.warn(`[API] Non-JSON: ${path} → ${res.status}`);
      return { error: `Server ${res.status === 503 || res.status === 502 ? 'qayta ishga tushmoqda, 1 daqiqa kuting' : 'xatosi (' + res.status + ')'}` };
    }

    // Bo'sh body — json() "Unexpected end of JSON input" tashlaydi
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

// ==================== AUTH ====================
async function initAuth() {
  if (!state.token) return;
  try {
    const user = await api('/auth/me');
    if (user.id) {
      state.user = user;
      state.lang = user.lang || state.lang;
      window.currentLang = state.lang;
      setLang(state.lang);
      await loadProgress();
      // Saqlangan token bilan socket'ni ulash
      disconnectChatSocket();
      initChatSocket();
    } else {
      // Token eskirgan yoki server xatosi — tokenni tozala
      state.token = null;
      localStorage.removeItem('emerx_token');
    }
  } catch (e) {
    console.warn('initAuth xatosi:', e.message);
    state.token = null;
    localStorage.removeItem('emerx_token');
  }
}

async function login(email, password) {
  const res = await api('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (res.token) {
    state.token = res.token;
    state.user = res.user;
    const lang = res.user.lang || state.lang;
    state.lang = lang;
    window.currentLang = lang;
    localStorage.setItem('emerx_token', res.token);
    localStorage.setItem('emerx_lang', lang);
    // Til tugmalarini yangilash (sahifani qayta render qilmasdan)
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    // Progressni yuklash (navbardagi coinlar uchun)
    await loadProgress();
    // Chat socketni yangi token bilan qayta ulash
    disconnectChatSocket();
    initChatSocket();
    return { ok: true };
  }
  return { ok: false, error: res.error || 'Kirish amalga oshmadi' };
}

async function register(username, email, password, lang, captchaToken, captchaAnswer) {
  const res = await api('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, lang, captchaToken, captchaAnswer })
  });
  if (res.token) {
    state.token = res.token;
    state.user = res.user;
    state.lang = lang;
    window.currentLang = lang;
    localStorage.setItem('emerx_token', res.token);
    localStorage.setItem('emerx_lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    // Ro'yxatdan o'tgandan keyin socket'ni yangi token bilan ulash
    disconnectChatSocket();
    initChatSocket();
    return { ok: true };
  }
  return { ok: false, error: res.error || 'Ro\'yxatdan o\'tish amalga oshmadi' };
}

function logout() {
  state.token = null;
  state.user = null;
  state.progress = [];
  state.coins = 0;
  state.stats = { completed: 0, quizAvg: 0 };
  state.currentCourse = null;
  state.currentLesson = null;
  localStorage.removeItem('emerx_token');
  // Chatni qayta ulash uchun socketni uzamiz
  disconnectChatSocket();
  updateNavbar();
  showPage('home');
}

// ==================== LANG ====================
function setLang(lang) {
  state.lang = lang;
  window.currentLang = lang;
  localStorage.setItem('emerx_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  renderCurrentPage();
  if (state.user && state.token) {
    api('/auth/lang', { method: 'PUT', body: JSON.stringify({ lang }) });
  }
}

// ==================== NAV ====================
function updateNavbar() {
  const navAuth = document.getElementById('nav-auth');
  const navUser = document.getElementById('nav-user');

  // Barcha navbar matnlarini til bilan yangilash
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  setText('nav-home',        '🏠 ' + t('home'));
  setText('nav-courses',     '📚 ' + t('courses'));
  setText('nav-leaderboard', '🏆 ' + t('nav_leaderboard'));
  setText('nav-chat',        '💬 ' + t('nav_chat'));
  setText('nav-support',     '❓ ' + t('nav_support'));
  setText('nav-dashboard',   '📊 ' + t('dashboard'));
  setText('nav-login',       t('nav_login'));
  setText('nav-register',    t('nav_register'));
  setText('nav-logout',      t('logout'));

  if (state.user) {
    navAuth.style.display = 'none';
    navUser.style.display = 'flex';
    const navUsername = document.getElementById('nav-username');
    if (navUsername) navUsername.textContent = state.user.username;
    const navAvatar = document.getElementById('nav-avatar');
    if (navAvatar && state.user.avatar) {
      navAvatar.src = state.user.avatar;
      navAvatar.style.display = 'block';
    } else if (navAvatar) {
      navAvatar.style.display = 'none';
    }
    const navCoins = document.getElementById('nav-coins');
    if (navCoins) navCoins.textContent = state.coins;
    const navAdmin = document.getElementById('nav-admin');
    if (navAdmin) {
      navAdmin.style.display = state.user.isAdmin ? 'inline-flex' : 'none';
      navAdmin.textContent = '⚙️ ' + t('nav_admin');
    }
  } else {
    navAuth.style.display = 'flex';
    navUser.style.display = 'none';
  }
}

// ==================== PAGES ====================
let currentPage = 'home';

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  currentPage = page;
  renderCurrentPage();
  window.scrollTo(0, 0);
}

function renderCurrentPage() {
  switch(currentPage) {
    case 'home': renderHome(); break;
    case 'courses': renderCourses(); break;
    case 'dashboard': renderDashboard(); break;
    case 'auth': renderAuth(); break;
    case 'lesson': renderLessonPage(); break;
    case 'leaderboard': renderLeaderboard(); break;
    case 'support': renderSupport(); break;
    case 'profile': renderProfile(); break;
    case 'admin':   renderAdmin(); break;
    case 'chat':    renderChat(); break;
  }
  updateNavbar();
}

// ==================== HOME PAGE ====================
function renderHome() {
  const el = document.getElementById('page-home');
  el.innerHTML = `
    <section class="hero">
      <div class="hero-badge">${t('hero_badge')}</div>
      <h1>${t('hero_title')}</h1>
      <p>${t('hero_sub')}</p>
      <div class="hero-cta">
        <button class="btn btn-primary" onclick="handleGetStarted()">🚀 ${t('hero_btn_start')}</button>
        <button class="btn btn-secondary" onclick="showPage('courses')">📚 ${t('hero_btn_courses')}</button>
      </div>
      <div class="terminal">
        <div class="terminal-header">
          <div class="t-dot red"></div>
          <div class="t-dot yellow"></div>
          <div class="t-dot green"></div>
        </div>
        <div class="terminal-line"><span class="green">emerx@academy</span>:~$ nmap -sV target.com</div>
        <div class="terminal-line">Starting Nmap scan...</div>
        <div class="terminal-line"><span class="blue">PORT     STATE  SERVICE VERSION</span></div>
        <div class="terminal-line">22/tcp   open   ssh     OpenSSH 8.2</div>
        <div class="terminal-line">80/tcp   open   http    nginx 1.18</div>
        <div class="terminal-line">443/tcp  open   ssl     TLS 1.3</div>
        <div class="terminal-line"><span class="green">emerx@academy</span>:~$ <span class="cursor"></span></div>
      </div>
      <div class="hero-stats">
        <div class="stat"><div class="stat-num">50+</div><div class="stat-label">${t('stat_lessons')}</div></div>
        <div class="stat"><div class="stat-num">10K+</div><div class="stat-label">${t('stat_students')}</div></div>
        <div class="stat"><div class="stat-num">40+</div><div class="stat-label">${t('stat_hours')}</div></div>
        <div class="stat"><div class="stat-num">4</div><div class="stat-label">${t('stat_certs')}</div></div>
      </div>
    </section>
    <section class="features">
      <div class="section-title">
        <h2>${t('features_title')}</h2>
        <p>${t('features_sub')}</p>
      </div>
      <div class="features-grid">
        ${[
          ['🌐', 'f1_title', 'f1_desc'],
          ['🕷️', 'f2_title', 'f2_desc'],
          ['⚔️', 'f3_title', 'f3_desc'],
          ['🔐', 'f4_title', 'f4_desc'],
          ['🔍', 'f5_title', 'f5_desc'],
          ['👑', 'f6_title', 'f6_desc'],
        ].map(([icon, title, desc]) => `
          <div class="feature-card">
            <div class="feature-icon">${icon}</div>
            <h3>${t(title)}</h3>
            <p>${t(desc)}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function handleGetStarted() {
  if (state.user) showPage('dashboard');
  else showPage('auth');
}

// ==================== COURSES PAGE ====================
async function loadCourses() {
  if (state.courses.length) return;
  const data = await api('/courses');
  state.courses = Array.isArray(data) ? data : [];
}

async function loadProgress() {
  if (!state.user) return;
  try {
    const data = await api('/progress/my');
    state.progress = Array.isArray(data) ? data : [];
    const stats = await api('/progress/stats');
    if (stats && !stats.error) {
      state.stats = stats;
      if (stats.coins !== undefined) {
        state.coins = stats.coins;
        const navCoins = document.getElementById('nav-coins');
        if (navCoins) navCoins.textContent = state.coins;
      }
    }
  } catch (e) {
    console.warn('loadProgress xatosi:', e.message);
    state.progress = [];
  }
}

async function renderCourses() {
  const el = document.getElementById('page-courses');
  el.innerHTML = `<div class="courses-page"><div class="spinner"></div></div>`;
  await loadCourses();
  if (state.user) await loadProgress();

  const completedIds = new Set(state.progress.map(p => p.lesson_id));
  const levels = [...new Set(state.courses.map(c => c.level))].sort();

  const levelColors = { 1: '#00ff88', 2: '#00aaff', 3: '#ff4444', 4: '#ffd700' };

  el.innerHTML = `
    <div class="courses-page">
      <div class="page-header">
        <h1>${t('courses_title')}</h1>
        <p>${t('courses_sub')}</p>
      </div>
      ${levels.map(lvl => {
        const lvlCourses = state.courses.filter(c => c.level === lvl);
        const lName = lvlCourses[0]?.levelName?.[state.lang] || '';
        return `
          <div class="level-section">
            <div class="level-header">
              <span class="level-badge" style="color:${levelColors[lvl]};border-color:${levelColors[lvl]}">Level ${lvl}</span>
              <h2>${lName}</h2>
            </div>
            <div class="courses-grid">
              ${lvlCourses.map(c => {
                const cIdx = state.courses.findIndex(x => x.id === c.id);
                const unlocked = !state.user || isCourseUnlocked(cIdx);
                const completed = c.lessons.filter(l => completedIds.has(l.id)).length;
                const pct = c.lessons.length ? Math.round(completed / c.lessons.length * 100) : 0;
                return `
                  <div class="course-card ${!unlocked ? 'course-locked' : ''}"
                       style="--accent:${unlocked ? c.color : '#4a5568'};--border-hover:${unlocked ? c.color : '#4a5568'}"
                       onclick="${unlocked ? `openCourse('${c.id}')` : `showToast('🔒 Avvalgi kursni to\\'liq bajaring!')`}">
                    <div class="course-icon">${unlocked ? c.icon : '🔒'}</div>
                    <h3>${c.title[state.lang]}</h3>
                    <p>${c.desc[state.lang]}</p>
                    <div class="course-meta">
                      <span>📚 ${c.lessonCount}${t('lessons_count')}</span>
                      <span>⏱️ ${c.duration[state.lang]}</span>
                    </div>
                    ${state.user && unlocked ? `
                      <div class="progress-bar-wrap">
                        <div class="progress-bar" style="width:${pct}%;background:${c.color}"></div>
                      </div>
                      <div style="font-size:0.8rem;color:var(--text2);margin-bottom:12px">${completed}/${c.lessons.length} dars (${pct}%)</div>
                    ` : ''}
                    <button class="btn-sm" style="background:${unlocked ? c.color : '#4a5568'};opacity:${unlocked ? 1 : 0.6}">
                      ${!unlocked ? '🔒 ' + t('locked') : pct === 100 ? t('completed') : pct > 0 ? t('continue_course') : t('start_course')}
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function openCourse(courseId) {
  if (!state.user) { showPage('auth'); return; }
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;
  const courseIdx = state.courses.findIndex(c => c.id === courseId);
  if (!isCourseUnlocked(courseIdx)) {
    showToast('🔒 Avvalgi kursni to\'liq bajaring!');
    return;
  }
  state.currentCourse = course;
  const completedIds = new Set(state.progress.map(p => p.lesson_id));
  // Birinchi qulflangan (yoki birinchi) darsni oching
  const firstUnlocked = course.lessons.find((l, i) => isLessonUnlocked(course, i) && !completedIds.has(l.id))
    || course.lessons.find((l, i) => isLessonUnlocked(course, i))
    || course.lessons[0];
  openLesson(course, firstUnlocked);
}

// ==================== KETMA-KETLIK MANTIG'I ====================
function isCourseUnlocked(courseIdx) {
  if (courseIdx <= 0) return true;
  const prev = state.courses[courseIdx - 1];
  if (!prev) return true;
  const completedIds = new Set(state.progress.map(p => p.lesson_id));
  return prev.lessons.every(l => completedIds.has(l.id));
}

function isLessonUnlocked(course, lessonIdx) {
  const completedIds = new Set(state.progress.map(p => p.lesson_id));
  const courseIdx = state.courses.findIndex(c => c.id === course.id);
  if (!isCourseUnlocked(courseIdx)) return false;
  if (lessonIdx === 0) return true;
  return completedIds.has(course.lessons[lessonIdx - 1].id);
}

// ==================== LESSON PAGE ====================
function openLesson(course, lesson) {
  const lessonIdx = course.lessons.findIndex(l => l.id === lesson.id);
  if (!isLessonUnlocked(course, lessonIdx)) {
    showToast('🔒 Avvalgi darsni bajaring!');
    return;
  }
  state.currentCourse = course;
  state.currentLesson = lesson;
  showPage('lesson');
}

async function renderLessonPage() {
  if (!state.currentCourse || !state.currentLesson) { showPage('courses'); return; }
  const el = document.getElementById('page-lesson');

  const course = state.currentCourse;
  const lesson = state.currentLesson;
  const completedIds = new Set(state.progress.map(p => p.lesson_id));
  const lessonIdx = course.lessons.findIndex(l => l.id === lesson.id);
  const nextLesson = course.lessons[lessonIdx + 1];

  const fullLesson = await api(`/courses/${course.id}/lessons/${lesson.id}`);

  el.innerHTML = `
    <div class="lesson-layout">
      <div class="lesson-sidebar">
        <div class="sidebar-header">
          <h3>${course.levelName[state.lang]}</h3>
          <h4>${course.title[state.lang]}</h4>
        </div>
        ${course.lessons.map((l, i) => {
          const done = completedIds.has(l.id);
          const active = l.id === lesson.id;
          const unlocked = isLessonUnlocked(course, i);
          return `
            <div class="sidebar-lesson ${active ? 'active' : ''} ${done ? 'completed' : ''} ${!unlocked ? 'locked' : ''}"
                 onclick="${unlocked ? `openLesson(state.currentCourse, state.currentCourse.lessons[${i}])` : `showToast('🔒 Avvalgi darsni bajaring!')`}">
              <div class="lesson-check ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}">
                ${done ? '✓' : !unlocked ? '🔒' : i + 1}
              </div>
              <span>${l.title[state.lang]}</span>
            </div>
          `;
        }).join('')}
      </div>
      <div class="lesson-content">
        <div class="lesson-nav">
          <button class="back-btn" onclick="showPage('courses')">${t('back_courses')}</button>
          <div class="lesson-duration">⏱️ ${lesson.duration}</div>
        </div>
        <h1 class="lesson-title">${fullLesson.title[state.lang]}</h1>
        <div class="lesson-body">${fullLesson.content[state.lang]}</div>
        ${fullLesson.quiz && fullLesson.quiz.length > 0 ? renderQuiz(fullLesson.quiz, fullLesson.id) : ''}
        <div class="lesson-actions">
          ${!completedIds.has(lesson.id) ? `
            <button class="btn btn-primary" onclick="completeLesson('${course.id}', '${lesson.id}')">
              ${t('mark_complete')}
            </button>
          ` : `<span style="color:var(--green);font-weight:700">✅ ${t('completed')}</span>`}
          ${nextLesson && completedIds.has(lesson.id) ? `
            <button class="btn btn-secondary" onclick="openLesson(state.currentCourse, state.currentCourse.lessons[${lessonIdx + 1}])">
              ${t('next_lesson')}
            </button>
          ` : nextLesson && !completedIds.has(lesson.id) ? `
            <button class="btn btn-secondary" style="opacity:0.4;cursor:not-allowed" disabled title="Avval darsni bajaring">
              🔒 ${t('next_lesson')}
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderQuiz(quiz, lessonId) {
  return `
    <div class="quiz-section">
      <h3>${t('quiz_title')}</h3>
      ${quiz.map((q, qi) => `
        <div class="quiz-question" id="quiz-q-${qi}">
          <p>${qi + 1}. ${q.q[state.lang]}</p>
          <div class="quiz-options">
            ${q.options[state.lang].map((opt, oi) => `
              <button class="quiz-option" onclick="selectAnswer(${qi}, ${oi}, ${q.answer}, '${lessonId}', ${quiz.length})" id="opt-${qi}-${oi}">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `).join('')}
      <div id="quiz-result" class="quiz-result" style="display:none"></div>
    </div>
  `;
}

let quizAnswers = {};
let quizDone = {};

function selectAnswer(qi, oi, correct, lessonId, total) {
  if (quizDone[qi]) return;
  quizDone[qi] = true;
  quizAnswers[qi] = { chosen: oi, correct };

  const opts = document.querySelectorAll(`#quiz-q-${qi} .quiz-option`);
  opts.forEach((o, idx) => {
    o.disabled = true;
    if (idx === correct) o.classList.add('correct');
    else if (idx === oi && oi !== correct) o.classList.add('wrong');
  });

  const answered = Object.keys(quizAnswers).length;
  if (answered >= total) {
    // To'g'ri javoblar sonini hisoblash
    const correctCount = Object.values(quizAnswers).filter(a => a.chosen === a.correct).length;

    const resultEl = document.getElementById('quiz-result');
    const isPerfect = correctCount === total;
    resultEl.style.display = 'block';
    resultEl.className = `quiz-result ${correctCount > 0 ? 'pass' : 'fail'}`;
    resultEl.textContent = isPerfect
      ? t('quiz_pass')
      : `${correctCount}/${total} — ${t('quiz_fail')}`;

    if (state.user) {
      api('/progress/quiz', {
        method: 'POST',
        body: JSON.stringify({ lesson_id: lessonId, score: correctCount, total })
      }).then(res => {
        if (res.bonusCoins > 0) {
          state.coins += res.bonusCoins;
          const navCoins = document.getElementById('nav-coins');
          if (navCoins) navCoins.textContent = state.coins;
          showCoinPopup(res.bonusCoins);
        }
      });
    }

    quizAnswers = {};
    quizDone = {};
  }
}

async function completeLesson(courseId, lessonId) {
  if (!state.user) { showPage('auth'); return; }
  const res = await api('/progress/complete', {
    method: 'POST',
    body: JSON.stringify({ lesson_id: lessonId, course_id: courseId })
  });
  await loadProgress();
  showToast(t('lesson_complete_toast'));
  if (res.coinsEarned && res.coinsEarned > 0) {
    showCoinPopup(res.coinsEarned);
  }
  renderLessonPage();
}

// ==================== DASHBOARD ====================
async function renderDashboard() {
  if (!state.user) { showPage('auth'); return; }
  await loadCourses();
  await loadProgress();

  const el = document.getElementById('page-dashboard');
  const levelNames = [t('level_1'), t('level_2'), t('level_3'), t('level_4')];
  const levelIcons = ['🛡️', '⚔️', '🔴', '👑'];
  const levelColors = ['var(--green)', 'var(--blue)', 'var(--red)', 'var(--gold)'];

  const completedIds = new Set(state.progress.map(p => p.lesson_id));
  const totalLessons = state.courses.reduce((s, c) => s + c.lessons.length, 0);
  const completedCount = completedIds.size;

  el.innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-welcome">
        <h1>${t('welcome')}, ${state.user.username}! 👋</h1>
        <p>${t('your_progress')}</p>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-val">${completedCount}</div>
          <div class="stat-lbl">${t('completed_lessons')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-val">${state.stats.quizAvg}%</div>
          <div class="stat-lbl">${t('quiz_avg')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-val">${totalLessons > 0 ? Math.round(completedCount/totalLessons*100) : 0}%</div>
          <div class="stat-lbl">Umumiy progress</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-val">${state.courses.filter(c => c.lessons.every(l => completedIds.has(l.id))).length}</div>
          <div class="stat-lbl">Tugatilgan kurslar</div>
        </div>
        <div class="stat-card gold">
          <div class="stat-icon">🪙</div>
          <div class="stat-val">${state.coins}</div>
          <div class="stat-lbl">${t('coins_label')}</div>
        </div>
      </div>
      <div class="roadmap-section">
        <h2>${t('roadmap')}</h2>
        <div class="roadmap">
          ${state.courses.map((c, i) => {
            const done = c.lessons.filter(l => completedIds.has(l.id)).length;
            const pct = c.lessons.length ? Math.round(done/c.lessons.length*100) : 0;
            return `
              <div class="roadmap-item" onclick="openCourse('${c.id}')">
                <div class="roadmap-icon">${c.icon}</div>
                <div class="roadmap-info">
                  <h4>${c.title[state.lang]}</h4>
                  <p>${done}/${c.lessons.length} dars · ${pct}%</p>
                  <div class="progress-bar-wrap" style="margin-top:8px">
                    <div class="progress-bar" style="width:${pct}%;background:${c.color}"></div>
                  </div>
                </div>
                <div class="roadmap-arrow">→</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==================== CAPTCHA ====================
let captchaToken = '';

async function loadCaptcha() {
  try {
    const data = await api('/auth/captcha');
    captchaToken = data.token;
    const el = document.getElementById('captcha-question');
    if (el) el.textContent = data.question;
  } catch (e) {
    console.error('Captcha yuklanmadi:', e);
  }
}

async function refreshCaptcha() {
  const el = document.getElementById('captcha-question');
  if (el) el.textContent = '...';
  const inp = document.getElementById('captcha-ans');
  if (inp) inp.value = '';
  await loadCaptcha();
}

// ==================== AUTH PAGE ====================
function renderAuth(tab = 'login') {
  const el = document.getElementById('page-auth');
  const activeTab = el.dataset.tab || tab;

  el.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          <div class="logo-big">EmerX</div>
          <p>${activeTab === 'login' ? t('login_title') : t('register_title')}</p>
        </div>
        <div class="auth-tabs">
          <button class="auth-tab ${activeTab === 'login' ? 'active' : ''}" onclick="switchAuthTab('login')">${t('login_tab')}</button>
          <button class="auth-tab ${activeTab === 'register' ? 'active' : ''}" onclick="switchAuthTab('register')">${t('register_tab')}</button>
        </div>
        <div id="auth-error" class="error-msg"></div>
        ${activeTab === 'login' ? `
          <form onsubmit="handleLogin(event)">
            <div class="form-group">
              <label class="form-label">${t('email')}</label>
              <input type="email" id="login-email" class="form-input" placeholder="admin@example.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">${t('password')}</label>
              <input type="password" id="login-pass" class="form-input" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn btn-primary btn-full">${t('btn_login')}</button>
          </form>
          <p class="auth-switch">${t('no_account')} <a onclick="switchAuthTab('register')">${t('create_here')}</a></p>
        ` : `
          <form onsubmit="handleRegister(event)">
            <div class="form-group">
              <label class="form-label">${t('username')}</label>
              <input type="text" id="reg-user" class="form-input" placeholder="john_doe" required>
            </div>
            <div class="form-group">
              <label class="form-label">${t('email')}</label>
              <input type="email" id="reg-email" class="form-input" placeholder="admin@example.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">${t('password')}</label>
              <input type="password" id="reg-pass" class="form-input" placeholder="Min 6 belgi" required>
            </div>
            <div class="form-group">
              <label class="form-label">${t('lang_choose')}</label>
              <select id="reg-lang" class="form-select form-input">
                <option value="uz" ${state.lang==='uz'?'selected':''}>🇺🇿 O'zbek</option>
                <option value="ru" ${state.lang==='ru'?'selected':''}>🇷🇺 Русский</option>
                <option value="en" ${state.lang==='en'?'selected':''}>🇬🇧 English</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">🤖 Robot emasligingizni isbotlang</label>
              <div class="captcha-box">
                <span class="captcha-question" id="captcha-question">...</span>
                <button type="button" class="captcha-refresh" onclick="refreshCaptcha()" title="Yangi savol">🔄</button>
              </div>
              <input type="number" id="captcha-ans" class="form-input" placeholder="Javob..." required style="margin-top:8px">
            </div>
            <button type="submit" class="btn btn-primary btn-full">${t('btn_register')}</button>
          </form>
          <p class="auth-switch">${t('has_account')} <a onclick="switchAuthTab('login')">${t('login_here')}</a></p>
        `}
      </div>
    </div>
  `;

  if (activeTab === 'register') loadCaptcha();
}

function switchAuthTab(tab) {
  document.getElementById('page-auth').dataset.tab = tab;
  renderAuth(tab);
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Kirilmoqda...'; }
  const errEl = document.getElementById('auth-error');
  if (errEl) { errEl.textContent = ''; errEl.classList.remove('show'); }
  try {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value;
    if (!email || !pass) {
      showAuthError('Email va parolni kiriting');
      return;
    }
    const res = await login(email, pass);
    if (res.ok) {
      showPage('dashboard');
    } else {
      showAuthError(res.error || 'Kirish amalga oshmadi');
    }
  } catch (err) {
    showAuthError('Server bilan aloqa yo\'q. Qayta urinib ko\'ring.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = t('btn_login'); }
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Ro\'yxatdan o\'tilmoqda...'; }
  try {
    const username = document.getElementById('reg-user').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const lang = document.getElementById('reg-lang').value;
    const captchaAnswer = document.getElementById('captcha-ans').value;

    const res = await register(username, email, pass, lang, captchaToken, captchaAnswer);
    if (res.ok) {
      showPage('dashboard');
    } else {
      showAuthError(res.error || 'Ro\'yxatdan o\'tish amalga oshmadi');
      if (res.error && res.error.toLowerCase().includes('captcha')) {
        await refreshCaptcha();
      }
    }
  } catch (e) {
    showAuthError('Server bilan aloqa yo\'q. Qayta urinib ko\'ring.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = t('btn_register'); }
  }
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

// ==================== TOAST ====================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==================== COIN POPUP ====================
function showCoinPopup(amount) {
  const el = document.getElementById('coin-popup');
  if (!el) return;
  el.innerHTML = `🪙 +${amount} tanga!`;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-overlay');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('open');
  overlay.classList.toggle('show');
  hamburger.classList.toggle('open');
}

function closeMobileMenu() {
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-overlay');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.remove('open');
  overlay.classList.remove('show');
  hamburger.classList.remove('open');
}

// ==================== LEADERBOARD ====================
async function renderLeaderboard() {
  const el = document.getElementById('page-leaderboard');
  el.innerHTML = `<div class="leaderboard-page"><div class="spinner"></div></div>`;
  try {
    const top = await api('/leaderboard');
    let myRank = null;
    if (state.user) myRank = await api('/leaderboard/me');

    const medals = ['🥇', '🥈', '🥉'];
    el.innerHTML = `
      <div class="leaderboard-page">
        <div class="page-header">
          <h1>🏆 ${t('leaderboard_title')}</h1>
          <p>${t('leaderboard_sub')}</p>
        </div>
        ${myRank ? `
          <div class="my-rank-card">
            <div class="rank-num">#${myRank.rank}</div>
            <div class="rank-info">
              <h3>${myRank.username}</h3>
              <p>${t('my_rank')}: #${myRank.rank}</p>
            </div>
            <div class="coins-big">🪙 ${myRank.coins}</div>
          </div>
        ` : `<div class="my-rank-card" style="text-align:center;justify-content:center"><p>🔒 ${t('unauthorized')}</p></div>`}
        <div class="leaderboard-table">
          ${top.length === 0 ? `<div class="lb-row" style="justify-content:center;color:var(--text2);grid-column:1/-1">Hali hech kim yo'q</div>` : ''}
          ${top.map(u => {
            const rankClass = u.rank === 1 ? 'top1' : u.rank === 2 ? 'top2' : u.rank === 3 ? 'top3' : '';
            const isMe = state.user && u.username === state.user.username;
            return `
            <div class="lb-row ${rankClass} ${isMe ? 'me' : ''}">
              <span class="lb-rank">${u.rank <= 3 ? medals[u.rank - 1] : '#' + u.rank}</span>
              <span class="lb-name">${u.username}${isMe ? ' <span style="color:var(--green);font-size:0.75rem">(siz)</span>' : ''}</span>
              <span class="lb-coins">🪙 ${u.coins}</span>
            </div>
          `}).join('')}
        </div>
      </div>
    `;
  } catch (e) {
    el.innerHTML = `<div class="leaderboard-page"><p style="color:var(--red);text-align:center;padding:60px">❌ Yuklanmadi. Qayta urinib ko'ring.</p></div>`;
  }
}

// ==================== PROFILE PAGE ====================
async function renderProfile() {
  const el = document.getElementById('page-profile');
  el.innerHTML = `<div class="profile-page"><p style="color:var(--muted);text-align:center;padding:60px">⏳ Yuklanmoqda...</p></div>`;

  const data = await api('/profile');
  if (data.error) {
    el.innerHTML = `<div class="profile-page"><p style="color:var(--red);text-align:center;padding:60px">❌ ${data.error}</p></div>`;
    return;
  }

  const avatarHtml = data.avatar
    ? `<img src="${data.avatar}" alt="avatar">`
    : `<span>${(data.username || 'U')[0].toUpperCase()}</span>`;

  const joinDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString(state.lang === 'en' ? 'en-US' : state.lang === 'ru' ? 'ru-RU' : 'uz-UZ', { year:'numeric', month:'long', day:'numeric' })
    : '—';

  el.innerHTML = `
    <div class="profile-page">

      <!-- HERO: Avatar + Info -->
      <div class="profile-hero">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar" id="avatar-preview">${avatarHtml}</div>
          <button class="avatar-upload-btn" onclick="document.getElementById('avatar-file-input').click()" title="${t('profile_avatar')}">📷</button>
          <input type="file" id="avatar-file-input" accept="image/*" style="display:none" onchange="handleAvatarUpload(event)">
        </div>

        <div class="profile-info">
          <h2 id="profile-display-name">${data.username}</h2>
          <div class="profile-email">📧 ${data.email}</div>
          ${data.bio ? `<div class="profile-bio-display">"${data.bio}"</div>` : ''}
          <div class="profile-member">📅 ${t('profile_member_since')}: ${joinDate}</div>
          <div id="avatar-status" class="avatar-upload-hint"></div>
        </div>
      </div>

      <!-- STATS -->
      <div class="profile-stats-row">
        <div class="profile-stat">
          <div class="stat-val">🪙 ${data.coins || 0}</div>
          <div class="stat-lbl">${t('coins_label')}</div>
        </div>
        <div class="profile-stat">
          <div class="stat-val">✅ ${data.stats?.completed || 0}</div>
          <div class="stat-lbl">${t('completed_lessons')}</div>
        </div>
        <div class="profile-stat">
          <div class="stat-val">📊 ${data.stats?.quizAvg || 0}%</div>
          <div class="stat-lbl">${t('quiz_avg')}</div>
        </div>
      </div>

      <!-- PROFIL TAHRIRLASH -->
      <div class="profile-card">
        <h3>✏️ ${t('profile_edit')}</h3>
        <div id="profile-edit-msg" class="profile-msg"></div>
        <div class="profile-form-group">
          <label>${t('profile_username')}</label>
          <input type="text" id="edit-username" value="${data.username}" maxlength="30" placeholder="username">
        </div>
        <div class="profile-form-group">
          <label>${t('profile_bio')} <span style="color:var(--muted);font-size:0.8rem">(max 200)</span></label>
          <textarea id="edit-bio" maxlength="200" placeholder="${t('profile_bio_placeholder')}">${data.bio || ''}</textarea>
        </div>
        <button class="btn btn-primary" onclick="saveProfileEdit()" id="profile-save-btn" style="width:100%">
          💾 ${t('profile_save')}
        </button>
      </div>

      <!-- PAROL O'ZGARTIRISH -->
      <div class="profile-card">
        <h3>🔒 ${t('profile_password')}</h3>
        <div id="profile-pass-msg" class="profile-msg"></div>
        <div class="profile-form-group">
          <label>${t('profile_cur_pass')}</label>
          <input type="password" id="cur-password" placeholder="••••••••">
        </div>
        <div class="profile-form-group">
          <label>${t('profile_new_pass')}</label>
          <input type="password" id="new-password" placeholder="••••••••">
        </div>
        <div class="profile-form-group">
          <label>${t('profile_confirm_pass')}</label>
          <input type="password" id="confirm-password" placeholder="••••••••">
        </div>
        <button class="btn btn-primary" onclick="savePasswordChange()" id="pass-save-btn" style="width:100%">
          🔑 ${t('profile_change_pass')}
        </button>
      </div>

    </div>
  `;
}

async function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const statusEl = document.getElementById('avatar-status');
  statusEl.textContent = t('avatar_uploading');
  statusEl.style.color = 'var(--muted)';

  // Canvas orqali 128x128 ga resize va compress
  const reader = new FileReader();
  reader.onload = async (e) => {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const SIZE = 128;
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext('2d');

      // Crop to square (center)
      const minSide = Math.min(img.width, img.height);
      const sx = (img.width - minSide) / 2;
      const sy = (img.height - minSide) / 2;
      ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, SIZE, SIZE);

      const base64 = canvas.toDataURL('image/jpeg', 0.85);

      // Upload
      const res = await api('/profile/avatar', {
        method: 'PUT',
        body: JSON.stringify({ avatar: base64 })
      });

      if (res.success) {
        // Preview yangilash
        const preview = document.getElementById('avatar-preview');
        preview.innerHTML = `<img src="${base64}" alt="avatar">`;
        // Navbar avatar
        const navAvatar = document.getElementById('nav-avatar');
        if (navAvatar) { navAvatar.src = base64; navAvatar.style.display = 'block'; }
        // State yangilash
        if (state.user) state.user.avatar = base64;
        statusEl.textContent = t('avatar_saved');
        statusEl.style.color = 'var(--green)';
      } else {
        statusEl.textContent = '❌ ' + (res.error || 'Xato');
        statusEl.style.color = 'var(--red)';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

async function saveProfileEdit() {
  const username = document.getElementById('edit-username').value.trim();
  const bio = document.getElementById('edit-bio').value;
  const msgEl = document.getElementById('profile-edit-msg');
  const btn = document.getElementById('profile-save-btn');

  btn.disabled = true;
  btn.textContent = t('profile_saving');
  msgEl.className = 'profile-msg';

  const res = await api('/profile', {
    method: 'PUT',
    body: JSON.stringify({ username, bio })
  });

  btn.disabled = false;
  btn.innerHTML = `💾 ${t('profile_save')}`;

  if (res.success) {
    msgEl.className = 'profile-msg success';
    msgEl.textContent = t('profile_saved');
    // State + navbar yangilash
    if (state.user) {
      if (res.username) state.user.username = res.username;
      document.getElementById('profile-display-name').textContent = res.username || username;
      document.getElementById('nav-username').textContent = res.username || username;
    }
    setTimeout(() => { msgEl.className = 'profile-msg'; }, 3000);
  } else {
    msgEl.className = 'profile-msg error';
    msgEl.textContent = res.error || 'Xato yuz berdi';
  }
}

async function savePasswordChange() {
  const cur = document.getElementById('cur-password').value;
  const nw = document.getElementById('new-password').value;
  const cf = document.getElementById('confirm-password').value;
  const msgEl = document.getElementById('profile-pass-msg');
  const btn = document.getElementById('pass-save-btn');

  msgEl.className = 'profile-msg';

  if (nw !== cf) {
    msgEl.className = 'profile-msg error';
    msgEl.textContent = t('pass_mismatch');
    return;
  }

  btn.disabled = true;
  btn.textContent = t('profile_saving');

  const res = await api('/profile/password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword: cur, newPassword: nw })
  });

  btn.disabled = false;
  btn.innerHTML = `🔑 ${t('profile_change_pass')}`;

  if (res.success) {
    msgEl.className = 'profile-msg success';
    msgEl.textContent = t('pass_changed');
    document.getElementById('cur-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    setTimeout(() => { msgEl.className = 'profile-msg'; }, 3000);
  } else {
    msgEl.className = 'profile-msg error';
    msgEl.textContent = res.error || 'Xato yuz berdi';
  }
}

// ==================== ADMIN PANEL ====================
let adminSearchTimeout = null;
let adminActiveTab = 'users'; // 'users' | 'courses'

async function renderAdmin() {
  const el = document.getElementById('page-admin');
  el.innerHTML = `<div class="admin-page"><p style="color:var(--muted);text-align:center;padding:60px">⏳ Yuklanmoqda...</p></div>`;

  const stats = await api('/admin/stats');
  if (stats.error) {
    el.innerHTML = `<div class="admin-page"><p style="color:var(--red);text-align:center;padding:60px">❌ ${stats.error}</p></div>`;
    return;
  }

  el.innerHTML = `
    <div class="admin-page">
      <div class="admin-header">
        <h1>⚙️ Admin Panel</h1>
        <p style="color:var(--muted)">EmerX boshqaruv markazi</p>
      </div>

      <!-- STATS -->
      <div class="admin-stats">
        <div class="admin-stat-card">
          <div class="admin-stat-val">${stats.totalUsers}</div>
          <div class="admin-stat-lbl">👤 Jami foydalanuvchi</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color:#00c8ff">${stats.newUsersWeek}</div>
          <div class="admin-stat-lbl">🆕 Bu hafta</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color:#a78bfa">${stats.totalCompleted}</div>
          <div class="admin-stat-lbl">✅ Bajarilgan darslar</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color:#f59e0b">${stats.totalCoins}</div>
          <div class="admin-stat-lbl">🪙 Jami coinlar</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color:#f59e0b">${stats.admins}</div>
          <div class="admin-stat-lbl">⚙️ Adminlar</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color:var(--red)">${stats.banned}</div>
          <div class="admin-stat-lbl">🚫 Bloklangan</div>
        </div>
      </div>

      <!-- TABS -->
      <div class="admin-tabs">
        <button class="admin-tab-btn ${adminActiveTab==='users'?'active':''}" onclick="switchAdminTab('users')">${t('admin_users_tab')}</button>
        <button class="admin-tab-btn ${adminActiveTab==='courses'?'active':''}" onclick="switchAdminTab('courses')">${t('admin_courses_tab')}</button>
      </div>

      <!-- USERS TAB -->
      <div id="admin-tab-users" style="display:${adminActiveTab==='users'?'block':'none'}">
        <div class="admin-toolbar">
          <input type="text" id="admin-search" placeholder="🔍 Username yoki email qidirish..." oninput="adminSearch()" class="admin-search-input">
          <button class="btn btn-secondary" onclick="loadAdminUsers()" style="white-space:nowrap">🔄 Yangilash</button>
        </div>
        <div id="admin-users-wrap">
          <p style="color:var(--muted);text-align:center;padding:20px">Yuklanmoqda...</p>
        </div>
        <div id="admin-pagination" style="display:flex;gap:8px;justify-content:center;margin-top:16px;flex-wrap:wrap"></div>
      </div>

      <!-- COURSES TAB -->
      <div id="admin-tab-courses" style="display:${adminActiveTab==='courses'?'block':'none'}">
        <div class="admin-toolbar">
          <span style="color:var(--muted);font-size:0.9rem">Admin tomonidan yaratilgan qo'shimcha kurslar</span>
          <button class="btn btn-primary" onclick="showCourseForm()" style="white-space:nowrap">${t('admin_new_course')}</button>
        </div>

        <!-- Kurs yaratish / tahrirlash formasi -->
        <div id="admin-course-form" style="display:none" class="admin-course-form-wrap"></div>

        <!-- Kurslar ro'yxati -->
        <div id="admin-courses-list">
          <p style="color:var(--muted);text-align:center;padding:20px">Yuklanmoqda...</p>
        </div>
      </div>

    </div>
  `;

  if (adminActiveTab === 'users') loadAdminUsers();
  else loadAdminCourses();
}

function switchAdminTab(tab) {
  adminActiveTab = tab;
  const usersTab = document.getElementById('admin-tab-users');
  const coursesTab = document.getElementById('admin-tab-courses');
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
  const btns = document.querySelectorAll('.admin-tab-btn');
  if (tab === 'users') {
    if (usersTab) usersTab.style.display = 'block';
    if (coursesTab) coursesTab.style.display = 'none';
    if (btns[0]) btns[0].classList.add('active');
    loadAdminUsers();
  } else {
    if (usersTab) usersTab.style.display = 'none';
    if (coursesTab) coursesTab.style.display = 'block';
    if (btns[1]) btns[1].classList.add('active');
    loadAdminCourses();
  }
}

let adminPage = 1;
let adminTotal = 0;

async function loadAdminUsers(page = 1) {
  adminPage = page;
  const q = document.getElementById('admin-search')?.value || '';
  const wrap = document.getElementById('admin-users-wrap');
  if (!wrap) return;
  wrap.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px">⏳ Yuklanmoqda...</p>';

  const data = await api(`/admin/users?q=${encodeURIComponent(q)}&page=${page}&limit=15`);
  if (data.error) {
    wrap.innerHTML = `<p style="color:var(--red);text-align:center;padding:20px">❌ ${data.error}</p>`;
    return;
  }

  adminTotal = data.total;

  if (!data.users.length) {
    wrap.innerHTML = '<p style="color:var(--muted);text-align:center;padding:30px">Foydalanuvchi topilmadi</p>';
    return;
  }

  wrap.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Foydalanuvchi</th>
            <th>Email</th>
            <th>🪙</th>
            <th>Status</th>
            <th>Sana</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          ${data.users.map((u, i) => `
            <tr id="row-${u.id}" class="${u.isBanned ? 'banned-row' : ''}">
              <td style="color:var(--muted)">${(page-1)*15+i+1}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px">
                  <div class="admin-avatar">${(u.username||'?')[0].toUpperCase()}</div>
                  <div>
                    <div style="font-weight:600">${u.username}</div>
                    ${u.isAdmin ? '<span class="badge-admin">Admin</span>' : ''}
                    ${u.isBanned ? '<span class="badge-ban">Ban</span>' : ''}
                  </div>
                </div>
              </td>
              <td style="color:var(--muted);font-size:0.85rem">${u.email}</td>
              <td>
                <div style="display:flex;align-items:center;gap:4px">
                  <span id="coins-${u.id}" style="font-weight:600;color:var(--green)">${u.coins}</span>
                  <button class="admin-icon-btn" onclick="editCoins('${u.id}', ${u.coins})" title="Coinni tahrirlash">✏️</button>
                </div>
              </td>
              <td>
                <span style="font-size:0.8rem;color:var(--muted)">${u.lang?.toUpperCase() || '—'}</span>
              </td>
              <td style="font-size:0.8rem;color:var(--muted)">
                ${u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
              </td>
              <td>
                <div style="display:flex;gap:4px;flex-wrap:wrap">
                  <button class="admin-btn ${u.isAdmin ? 'admin-btn-warn' : 'admin-btn-ok'}"
                    onclick="toggleAdmin('${u.id}', ${!u.isAdmin})"
                    title="${u.isAdmin ? 'Admin huquqini olish' : 'Admin qilish'}">
                    ${u.isAdmin ? '👑 Admin' : '👤 User'}
                  </button>
                  <button class="admin-btn ${u.isBanned ? 'admin-btn-ok' : 'admin-btn-danger'}"
                    onclick="toggleBan('${u.id}', ${!u.isBanned})"
                    title="${u.isBanned ? 'Blokdan chiqarish' : 'Bloklash'}">
                    ${u.isBanned ? '✅ Ochish' : '🚫 Ban'}
                  </button>
                  <button class="admin-btn admin-btn-danger" onclick="deleteUser('${u.id}', '${u.username}')" title="O'chirish">🗑️</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div style="color:var(--muted);font-size:0.85rem;padding:8px 4px">
      Jami: <b>${data.total}</b> ta foydalanuvchi
    </div>
  `;

  // Pagination
  const pagEl = document.getElementById('admin-pagination');
  if (pagEl && data.pages > 1) {
    pagEl.innerHTML = Array.from({ length: data.pages }, (_, i) => i + 1).map(p => `
      <button class="admin-btn ${p === page ? 'admin-btn-ok' : ''}" onclick="loadAdminUsers(${p})">${p}</button>
    `).join('');
  } else if (pagEl) {
    pagEl.innerHTML = '';
  }
}

function adminSearch() {
  clearTimeout(adminSearchTimeout);
  adminSearchTimeout = setTimeout(() => loadAdminUsers(1), 400);
}

async function editCoins(userId, current) {
  const val = prompt(`🪙 Yangi coin miqdori (hozir: ${current}):`, current);
  if (val === null || val === '') return;
  const coins = parseInt(val);
  if (isNaN(coins) || coins < 0) { alert('Noto\'g\'ri son'); return; }

  const res = await api(`/admin/users/${userId}/coins`, {
    method: 'PUT',
    body: JSON.stringify({ coins })
  });
  if (res.success) {
    const el = document.getElementById(`coins-${userId}`);
    if (el) el.textContent = coins;
    showToast(`✅ Coin yangilandi: ${coins}`);
  } else {
    showToast('❌ ' + (res.error || 'Xato'), 'error');
  }
}

async function toggleAdmin(userId, makeAdmin) {
  const ok = confirm(makeAdmin ? '👑 Bu foydalanuvchini admin qilishni tasdiqlaysizmi?' : '⚠️ Admin huquqini olishni tasdiqlaysizmi?');
  if (!ok) return;
  const res = await api(`/admin/users/${userId}/admin`, {
    method: 'PUT',
    body: JSON.stringify({ isAdmin: makeAdmin })
  });
  if (res.success) {
    showToast(makeAdmin ? '✅ Admin qilindi' : '✅ Admin huquqi olindi');
    loadAdminUsers(adminPage);
  } else {
    showToast('❌ ' + (res.error || 'Xato'), 'error');
  }
}

async function toggleBan(userId, ban) {
  const ok = confirm(ban ? '🚫 Foydalanuvchini bloklashni tasdiqlaysizmi?' : '✅ Blokdan chiqarishni tasdiqlaysizmi?');
  if (!ok) return;
  const res = await api(`/admin/users/${userId}/ban`, {
    method: 'PUT',
    body: JSON.stringify({ isBanned: ban })
  });
  if (res.success) {
    showToast(ban ? '🚫 Bloklandi' : '✅ Blok ochildi');
    loadAdminUsers(adminPage);
  } else {
    showToast('❌ ' + (res.error || 'Xato'), 'error');
  }
}

async function deleteUser(userId, username) {
  const ok = confirm(`⚠️ "${username}" foydalanuvchisini o'chirishni tasdiqlaysizmi?\nBu amal qaytarilmaydi!`);
  if (!ok) return;
  const ok2 = confirm(`Ishonchingiz komilmi? "${username}" o'chiriladi.`);
  if (!ok2) return;
  const res = await api(`/admin/users/${userId}`, { method: 'DELETE' });
  if (res.success) {
    showToast(`✅ "${username}" o'chirildi`);
    loadAdminUsers(adminPage);
  } else {
    showToast('❌ ' + (res.error || 'Xato'), 'error');
  }
}

// ==================== ADMIN — COURSES ====================
let editingCourseId = null;  // null = yangi, string = tahrirlash
let editingLessonId = null;

async function loadAdminCourses() {
  const wrap = document.getElementById('admin-courses-list');
  if (!wrap) return;
  wrap.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px">⏳ Yuklanmoqda...</p>';

  const data = await api('/admin/courses');
  if (!Array.isArray(data) || data.error) {
    wrap.innerHTML = `<p style="color:var(--red);text-align:center;padding:20px">❌ ${data.error || 'Xato'}</p>`;
    return;
  }

  if (!data.length) {
    wrap.innerHTML = `<p style="color:var(--muted);text-align:center;padding:40px">${t('admin_no_courses')}</p>`;
    return;
  }

  wrap.innerHTML = data.map(c => {
    const title = (c.title && (c.title.ru || c.title.uz || c.title.en)) || '—';
    const icon = c.icon || '📖';
    const lessons = (c.lessons || []).length;
    const color = c.color || '#00aaff';
    return `
      <div class="admin-course-card" id="ccard-${c._id}">
        <div class="admin-course-card-header" style="border-left:4px solid ${color}">
          <div class="admin-course-card-title">
            <span class="admin-course-icon">${icon}</span>
            <div>
              <div style="font-weight:700;font-size:1rem">${title}</div>
              <div style="color:var(--muted);font-size:0.8rem">Daraja ${c.level || 1} · ${lessons} ta dars</div>
            </div>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="admin-btn admin-btn-ok" onclick="showCourseForm('${c._id}')">${t('admin_course_edit')}</button>
            <button class="admin-btn" onclick="toggleCourseExpand('${c._id}')">📋 Darslar</button>
            <button class="admin-btn admin-btn-danger" onclick="deleteCourse('${c._id}', \`${title}\`)">${t('admin_course_delete')}</button>
          </div>
        </div>
        <!-- Darslar (yashirin) -->
        <div id="lessons-${c._id}" style="display:none;padding:12px 16px;border-top:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="color:var(--muted);font-size:0.85rem">${lessons} ta dars</span>
            <button class="admin-btn admin-btn-ok" onclick="showLessonForm('${c._id}')">${t('admin_add_lesson')}</button>
          </div>
          <div id="lesson-form-${c._id}" style="display:none"></div>
          ${(c.lessons||[]).length === 0
            ? `<p style="color:var(--muted);font-size:0.85rem;padding:8px 0">${t('admin_no_lessons')}</p>`
            : (c.lessons||[]).map(l => {
                const ltitle = (l.title && (l.title.ru || l.title.uz || l.title.en)) || '—';
                const ldur = (l.duration && (l.duration.ru || l.duration.uz || '—')) || '—';
                return `
                  <div class="admin-lesson-row" id="lrow-${l.id}">
                    <div>
                      <div style="font-weight:600;font-size:0.9rem">📄 ${ltitle}</div>
                      <div style="color:var(--muted);font-size:0.8rem">⏱ ${ldur}</div>
                    </div>
                    <div style="display:flex;gap:4px">
                      <button class="admin-icon-btn" onclick="showLessonForm('${c._id}', '${l.id}')" title="Tahrirlash">✏️</button>
                      <button class="admin-icon-btn" onclick="deleteLesson('${c._id}', '${l.id}', \`${ltitle}\`)" title="O'chirish">🗑️</button>
                    </div>
                  </div>
                `;
              }).join('')
          }
        </div>
      </div>
    `;
  }).join('');
}

function toggleCourseExpand(courseId) {
  const el = document.getElementById(`lessons-${courseId}`);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function showCourseForm(courseId = null) {
  editingCourseId = courseId;
  const wrap = document.getElementById('admin-course-form');
  if (!wrap) return;
  wrap.style.display = 'block';

  // Agar tahrirlash — mavjud ma'lumotlarni yuklash
  if (courseId) {
    wrap.innerHTML = '<p style="color:var(--muted);padding:16px">Yuklanmoqda...</p>';
    api('/admin/courses').then(courses => {
      const c = Array.isArray(courses) ? courses.find(x => x._id === courseId) : null;
      if (!c) { wrap.innerHTML = '<p style="color:var(--red);padding:16px">Topilmadi</p>'; return; }
      renderCourseForm(wrap, c);
    });
  } else {
    renderCourseForm(wrap, null);
  }

  wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCourseForm(wrap, c) {
  const v = c || {};
  const ti = v.title || {}; const di = v.desc || {}; const ln = v.levelName || {};
  wrap.innerHTML = `
    <div class="admin-form-box">
      <h3 style="margin:0 0 16px">${editingCourseId ? '✏️ Kursni tahrirlash' : '➕ Yangi kurs yaratish'}</h3>

      <div class="admin-form-row">
        <div class="admin-form-group" style="flex:0 0 80px">
          <label>${t('admin_course_icon')}</label>
          <input type="text" id="cf-icon" value="${v.icon || '📖'}" maxlength="8" style="font-size:1.4rem;text-align:center">
        </div>
        <div class="admin-form-group" style="flex:0 0 90px">
          <label>${t('admin_course_color')}</label>
          <input type="color" id="cf-color" value="${v.color || '#00aaff'}" style="height:38px;padding:2px">
        </div>
        <div class="admin-form-group" style="flex:0 0 100px">
          <label>${t('admin_course_level')}</label>
          <select id="cf-level" style="padding:8px;background:var(--bg2);color:var(--text);border:1px solid var(--border);border-radius:8px">
            ${[1,2,3,4].map(n=>`<option value="${n}" ${(v.level||1)==n?'selected':''}>${n}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="admin-form-section-label">📝 ${t('admin_course_title')}</div>
      <div class="admin-form-row">
        <div class="admin-form-group">
          <label>${t('admin_lang_uz')} *</label>
          <input type="text" id="cf-title-uz" value="${ti.uz||''}" placeholder="O'zbekcha sarlavha">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_ru')}</label>
          <input type="text" id="cf-title-ru" value="${ti.ru||''}" placeholder="Русское название">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_en')}</label>
          <input type="text" id="cf-title-en" value="${ti.en||''}" placeholder="English title">
        </div>
      </div>

      <div class="admin-form-section-label">📋 ${t('admin_course_desc')}</div>
      <div class="admin-form-row">
        <div class="admin-form-group">
          <label>${t('admin_lang_uz')}</label>
          <textarea id="cf-desc-uz" rows="2" placeholder="Tavsif (o'zbekcha)">${di.uz||''}</textarea>
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_ru')}</label>
          <textarea id="cf-desc-ru" rows="2" placeholder="Описание (русский)">${di.ru||''}</textarea>
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_en')}</label>
          <textarea id="cf-desc-en" rows="2" placeholder="Description (English)">${di.en||''}</textarea>
        </div>
      </div>

      <div class="admin-form-section-label">🏷️ ${t('admin_course_level_name')}</div>
      <div class="admin-form-row">
        <div class="admin-form-group">
          <label>${t('admin_lang_uz')}</label>
          <input type="text" id="cf-ln-uz" value="${ln.uz||"Qo'shimcha"}" placeholder="Qo'shimcha">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_ru')}</label>
          <input type="text" id="cf-ln-ru" value="${ln.ru||'Дополнительный'}" placeholder="Дополнительный">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_en')}</label>
          <input type="text" id="cf-ln-en" value="${ln.en||'Extra'}" placeholder="Extra">
        </div>
      </div>

      <div id="cf-msg" class="profile-msg" style="margin-top:8px"></div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-primary" onclick="saveCourseForm()" id="cf-save-btn">${t('admin_course_save')}</button>
        <button class="btn btn-secondary" onclick="closeCourseForm()">${t('admin_course_cancel')}</button>
      </div>
    </div>
  `;
}

function closeCourseForm() {
  const wrap = document.getElementById('admin-course-form');
  if (wrap) { wrap.style.display = 'none'; wrap.innerHTML = ''; }
  editingCourseId = null;
}

async function saveCourseForm() {
  const btn = document.getElementById('cf-save-btn');
  const msgEl = document.getElementById('cf-msg');
  const titleUz = document.getElementById('cf-title-uz')?.value.trim();
  if (!titleUz) {
    if (msgEl) { msgEl.className = 'profile-msg error'; msgEl.textContent = "O'zbekcha sarlavha majburiy!"; }
    return;
  }
  btn.disabled = true;
  btn.textContent = t('profile_saving');

  const body = {
    title: { uz: titleUz, ru: document.getElementById('cf-title-ru')?.value.trim()||titleUz, en: document.getElementById('cf-title-en')?.value.trim()||titleUz },
    desc:  { uz: document.getElementById('cf-desc-uz')?.value||'', ru: document.getElementById('cf-desc-ru')?.value||'', en: document.getElementById('cf-desc-en')?.value||'' },
    levelName: { uz: document.getElementById('cf-ln-uz')?.value||"Qo'shimcha", ru: document.getElementById('cf-ln-ru')?.value||'Дополнительный', en: document.getElementById('cf-ln-en')?.value||'Extra' },
    icon:  document.getElementById('cf-icon')?.value || '📖',
    color: document.getElementById('cf-color')?.value || '#00aaff',
    level: parseInt(document.getElementById('cf-level')?.value) || 1,
  };

  const res = editingCourseId
    ? await api(`/admin/courses/${editingCourseId}`, { method: 'PUT', body: JSON.stringify(body) })
    : await api('/admin/courses', { method: 'POST', body: JSON.stringify(body) });

  btn.disabled = false;
  btn.textContent = t('admin_course_save');

  if (res.success || res.course) {
    showToast(editingCourseId ? '✅ Kurs yangilandi' : '✅ Kurs yaratildi');
    closeCourseForm();
    // courses state cache'ni tozalash
    state.courses = [];
    loadAdminCourses();
  } else {
    if (msgEl) { msgEl.className = 'profile-msg error'; msgEl.textContent = res.error || 'Xato'; }
  }
}

async function deleteCourse(courseId, title) {
  if (!confirm(`🗑️ "${title}" kursini o'chirishni tasdiqlaysizmi?`)) return;
  const res = await api(`/admin/courses/${courseId}`, { method: 'DELETE' });
  if (res.success) {
    showToast('✅ Kurs o\'chirildi');
    state.courses = [];
    loadAdminCourses();
  } else {
    showToast('❌ ' + (res.error || 'Xato'), 'error');
  }
}

// ---- Darslar ----
function showLessonForm(courseId, lessonId = null) {
  editingLessonId = lessonId;
  const wrap = document.getElementById(`lesson-form-${courseId}`);
  if (!wrap) return;
  wrap.style.display = 'block';

  if (lessonId) {
    // Mavjud dars ma'lumotlarini topish
    api('/admin/courses').then(courses => {
      const c = Array.isArray(courses) ? courses.find(x => x._id === courseId) : null;
      const l = c ? (c.lessons||[]).find(x => x.id === lessonId) : null;
      renderLessonForm(wrap, courseId, l);
    });
  } else {
    renderLessonForm(wrap, courseId, null);
  }
  wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderLessonForm(wrap, courseId, l) {
  const v = l || {};
  const ti = v.title || {}; const co = v.content || {}; const du = v.duration || {};
  wrap.innerHTML = `
    <div class="admin-form-box" style="margin-bottom:12px">
      <h4 style="margin:0 0 12px">${editingLessonId ? '✏️ Darsni tahrirlash' : '➕ Yangi dars'}</h4>

      <div class="admin-form-section-label">📝 ${t('admin_lesson_title')}</div>
      <div class="admin-form-row">
        <div class="admin-form-group">
          <label>${t('admin_lang_uz')} *</label>
          <input type="text" id="lf-title-uz-${courseId}" value="${ti.uz||''}" placeholder="O'zbekcha">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_ru')}</label>
          <input type="text" id="lf-title-ru-${courseId}" value="${ti.ru||''}" placeholder="Русский">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_en')}</label>
          <input type="text" id="lf-title-en-${courseId}" value="${ti.en||''}" placeholder="English">
        </div>
      </div>

      <div class="admin-form-section-label">⏱ ${t('admin_lesson_duration')}</div>
      <div class="admin-form-row">
        <div class="admin-form-group">
          <label>${t('admin_lang_uz')}</label>
          <input type="text" id="lf-dur-uz-${courseId}" value="${du.uz||''}" placeholder="15 daqiqa">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_ru')}</label>
          <input type="text" id="lf-dur-ru-${courseId}" value="${du.ru||''}" placeholder="15 минут">
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_en')}</label>
          <input type="text" id="lf-dur-en-${courseId}" value="${du.en||''}" placeholder="15 min">
        </div>
      </div>

      <div class="admin-form-section-label">📄 ${t('admin_lesson_content')} <span style="color:var(--muted);font-size:0.75rem">(HTML qo'llab-quvvatlanadi)</span></div>
      <div style="display:grid;gap:8px">
        <div class="admin-form-group">
          <label>${t('admin_lang_uz')}</label>
          <textarea id="lf-content-uz-${courseId}" rows="5" placeholder="<h2>Sarlavha</h2><p>Matn...</p>" style="font-family:monospace;font-size:0.85rem">${co.uz||''}</textarea>
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_ru')}</label>
          <textarea id="lf-content-ru-${courseId}" rows="5" placeholder="<h2>Заголовок</h2><p>Текст...</p>" style="font-family:monospace;font-size:0.85rem">${co.ru||''}</textarea>
        </div>
        <div class="admin-form-group">
          <label>${t('admin_lang_en')}</label>
          <textarea id="lf-content-en-${courseId}" rows="5" placeholder="<h2>Title</h2><p>Content...</p>" style="font-family:monospace;font-size:0.85rem">${co.en||''}</textarea>
        </div>
      </div>

      <div id="lf-msg-${courseId}" class="profile-msg" style="margin-top:8px"></div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-primary" onclick="saveLessonForm('${courseId}')" id="lf-save-btn-${courseId}">${t('admin_lesson_save')}</button>
        <button class="btn btn-secondary" onclick="closeLessonForm('${courseId}')">${t('admin_course_cancel')}</button>
      </div>
    </div>
  `;
}

function closeLessonForm(courseId) {
  const wrap = document.getElementById(`lesson-form-${courseId}`);
  if (wrap) { wrap.style.display = 'none'; wrap.innerHTML = ''; }
  editingLessonId = null;
}

async function saveLessonForm(courseId) {
  const btn = document.getElementById(`lf-save-btn-${courseId}`);
  const msgEl = document.getElementById(`lf-msg-${courseId}`);
  const titleUz = document.getElementById(`lf-title-uz-${courseId}`)?.value.trim();

  if (!titleUz) {
    if (msgEl) { msgEl.className = 'profile-msg error'; msgEl.textContent = "O'zbekcha sarlavha majburiy!"; }
    return;
  }
  btn.disabled = true;
  btn.textContent = t('profile_saving');

  const body = {
    title:   { uz: titleUz, ru: document.getElementById(`lf-title-ru-${courseId}`)?.value.trim()||titleUz, en: document.getElementById(`lf-title-en-${courseId}`)?.value.trim()||titleUz },
    duration:{ uz: document.getElementById(`lf-dur-uz-${courseId}`)?.value||'—', ru: document.getElementById(`lf-dur-ru-${courseId}`)?.value||'—', en: document.getElementById(`lf-dur-en-${courseId}`)?.value||'—' },
    content: { uz: document.getElementById(`lf-content-uz-${courseId}`)?.value||'', ru: document.getElementById(`lf-content-ru-${courseId}`)?.value||'', en: document.getElementById(`lf-content-en-${courseId}`)?.value||'' },
  };

  const res = editingLessonId
    ? await api(`/admin/courses/${courseId}/lessons/${editingLessonId}`, { method: 'PUT', body: JSON.stringify(body) })
    : await api(`/admin/courses/${courseId}/lessons`, { method: 'POST', body: JSON.stringify(body) });

  btn.disabled = false;
  btn.textContent = t('admin_lesson_save');

  if (res.success) {
    showToast(editingLessonId ? '✅ Dars yangilandi' : '✅ Dars qo\'shildi');
    closeLessonForm(courseId);
    state.courses = [];
    loadAdminCourses().then(() => {
      // Darslar ro'yxatini ochiq qoldirish
      const el = document.getElementById(`lessons-${courseId}`);
      if (el) el.style.display = 'block';
    });
  } else {
    if (msgEl) { msgEl.className = 'profile-msg error'; msgEl.textContent = res.error || 'Xato'; }
  }
}

async function deleteLesson(courseId, lessonId, title) {
  if (!confirm(`🗑️ "${title}" darsini o'chirishni tasdiqlaysizmi?`)) return;
  const res = await api(`/admin/courses/${courseId}/lessons/${lessonId}`, { method: 'DELETE' });
  if (res.success) {
    showToast('✅ Dars o\'chirildi');
    state.courses = [];
    loadAdminCourses().then(() => {
      const el = document.getElementById(`lessons-${courseId}`);
      if (el) el.style.display = 'block';
    });
  } else {
    showToast('❌ ' + (res.error || 'Xato'), 'error');
  }
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==================== GLOBAL CHAT ====================
let chatSocket = null;
let chatConnected = false;
let chatIsAdmin = false;

function initChatSocket() {
  // Agar socket mavjud bo'lsa, lekin token o'zgargan bo'lsa — qayta ul
  if (chatSocket) {
    const socketToken = chatSocket.auth?.token || null;
    const currentToken = state.token || null;
    if (socketToken !== currentToken) {
      // Token farqlansa — qayta ulanish kerak
      chatSocket.disconnect();
      chatSocket = null;
      chatConnected = false;
    } else {
      return; // Token bir xil, qayta ulash shart emas
    }
  }

  chatSocket = io({ auth: { token: state.token || null } });

  chatSocket.on('connect', () => {
    chatConnected = true;
    updateChatStatus('online');
  });

  chatSocket.on('disconnect', () => {
    chatConnected = false;
    updateChatStatus('offline');
  });

  chatSocket.on('connect_error', () => {
    chatConnected = false;
    updateChatStatus('offline');
  });

  // Tarix — sahifa ochilganda bir marta keladi
  chatSocket.on('chat:history', (msgs) => {
    const listEl = document.getElementById('chat-messages');
    if (!listEl) return;
    listEl.innerHTML = '';
    if (!msgs.length) {
      listEl.innerHTML = `<div class="chat-empty">${t('chat_empty')}</div>`;
      return;
    }
    msgs.filter(m => !m.deleted).forEach(m => appendChatMessage(m, false));
    scrollChatToBottom();
  });

  // Yangi xabar (broadcast)
  chatSocket.on('chat:message', (msg) => {
    const listEl = document.getElementById('chat-messages');
    if (!listEl) return;
    const emptyEl = listEl.querySelector('.chat-empty');
    if (emptyEl) emptyEl.remove();
    appendChatMessage(msg, true);
    scrollChatToBottom();
    // Agar chat sahifasi ochiq emas bo'lsa — bildirish
    if (currentPage !== 'chat' && msg.userId !== state.user?.id) {
      showChatBadge();
    }
  });

  // O'chirilgan xabar
  chatSocket.on('chat:deleted', (msgId) => {
    const el = document.getElementById(`cmsg-${msgId}`);
    if (el) {
      el.querySelector('.chat-msg-text').textContent = t('chat_deleted');
      el.classList.add('deleted');
    }
  });

  // Xato
  chatSocket.on('chat:error', (err) => {
    showChatError(err);
  });
}

function disconnectChatSocket() {
  if (chatSocket) {
    chatSocket.disconnect();
    chatSocket = null;
    chatConnected = false;
  }
}

function updateChatStatus(status) {
  const el = document.getElementById('chat-status');
  if (!el) return;
  if (status === 'online') {
    el.textContent = '🟢 ' + t('chat_online');
    el.style.color = 'var(--green)';
  } else {
    el.textContent = '🔴 ' + t('chat_offline');
    el.style.color = 'var(--red)';
  }
}

function appendChatMessage(msg, animate) {
  const listEl = document.getElementById('chat-messages');
  if (!listEl) return;

  const isMe = state.user && msg.userId === state.user.id;
  const isAdmin = msg.isAdmin;
  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const avatarHtml = msg.avatar
    ? `<img src="${msg.avatar}" alt="${msg.username}" class="chat-avatar-img">`
    : `<div class="chat-avatar-letter">${(msg.username || '?')[0].toUpperCase()}</div>`;

  const el = document.createElement('div');
  el.id = `cmsg-${msg._id}`;
  el.className = `chat-msg ${isMe ? 'chat-msg-me' : 'chat-msg-other'} ${animate ? 'chat-msg-new' : ''}`;
  el.innerHTML = `
    <div class="chat-avatar">${avatarHtml}</div>
    <div class="chat-msg-body">
      <div class="chat-msg-header">
        <span class="chat-username ${isMe ? 'me' : ''}">${isMe ? t('chat_you') : msg.username}</span>
        ${msg.isAdmin ? '<span class="chat-admin-badge">Admin</span>' : ''}
        <span class="chat-time">${time}</span>
        ${(chatIsAdmin && !isMe) ? `<button class="chat-del-btn" onclick="deleteChatMessage('${msg._id}')" title="O'chirish">🗑️</button>` : ''}
      </div>
      <div class="chat-msg-text">${escapeHtml(msg.text)}</div>
    </div>
  `;
  listEl.appendChild(el);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function scrollChatToBottom() {
  const listEl = document.getElementById('chat-messages');
  if (listEl) listEl.scrollTop = listEl.scrollHeight;
}

function showChatError(msg) {
  const el = document.getElementById('chat-error');
  if (!el) return;
  el.textContent = '⚠️ ' + msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
}

let chatBadgeCount = 0;
function showChatBadge() {
  chatBadgeCount++;
  const btn = document.getElementById('nav-chat');
  if (btn) {
    const existing = btn.querySelector('.chat-badge');
    if (existing) { existing.textContent = chatBadgeCount; return; }
    const badge = document.createElement('span');
    badge.className = 'chat-badge';
    badge.textContent = chatBadgeCount;
    btn.appendChild(badge);
  }
}
function clearChatBadge() {
  chatBadgeCount = 0;
  const badge = document.querySelector('#nav-chat .chat-badge');
  if (badge) badge.remove();
}

function renderChat() {
  const el = document.getElementById('page-chat');
  clearChatBadge();

  // Admin tekshiruv
  const adminEmails = [];
  chatIsAdmin = !!(state.user && state.user.isAdmin);

  el.innerHTML = `
    <div class="chat-page">
      <div class="chat-header">
        <div>
          <h1>💬 ${t('chat_title')}</h1>
          <p>${t('chat_sub')}</p>
        </div>
        <div id="chat-status" class="chat-status">${t('chat_connecting')}</div>
      </div>

      <div class="chat-window">
        <div id="chat-messages" class="chat-messages">
          <div class="chat-empty">${t('chat_connecting')}...</div>
        </div>

        <div id="chat-error" class="chat-error-bar" style="display:none"></div>

        ${state.user ? `
          <div class="chat-input-row">
            <input
              type="text"
              id="chat-input"
              class="chat-input"
              placeholder="${t('chat_placeholder')}"
              maxlength="300"
              autocomplete="off"
              onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendChatMessage()}"
            >
            <button class="btn btn-primary chat-send-btn" id="chat-send-btn" onclick="sendChatMessage()">
              ${t('chat_send')} ➤
            </button>
          </div>
          <div class="chat-char-count"><span id="chat-char">0</span>/300</div>
        ` : `
          <div class="chat-guest-bar">
            ${t('chat_login_hint')} <button class="chat-login-link" onclick="showPage('auth')">${t('chat_login_link')}</button>
          </div>
        `}
      </div>
    </div>
  `;

  // Input char counter
  const input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('input', () => {
      const cnt = document.getElementById('chat-char');
      if (cnt) cnt.textContent = input.value.length;
    });
    setTimeout(() => input.focus(), 100);
  }

  // Socket ulanish (yoki mavjudni ishlatish)
  initChatSocket();
  if (chatConnected) updateChatStatus('online');
}

async function sendChatMessage() {
  if (!chatSocket || !chatConnected) return;
  const input = document.getElementById('chat-input');
  const btn = document.getElementById('chat-send-btn');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  btn.disabled = true;
  chatSocket.emit('chat:send', text);
  input.value = '';
  const cnt = document.getElementById('chat-char');
  if (cnt) cnt.textContent = '0';

  setTimeout(() => { if (btn) btn.disabled = false; }, 1500);
}

function deleteChatMessage(msgId) {
  if (!chatSocket || !chatIsAdmin) return;
  if (!confirm('Xabarni o\'chirishni tasdiqlaysizmi?')) return;
  chatSocket.emit('chat:delete', msgId);
}

// ==================== SUPPORT ====================
function renderSupport() {
  const el = document.getElementById('page-support');
  const faqs = [
    { q: t('faq1_q'), a: t('faq1_a') },
    { q: t('faq2_q'), a: t('faq2_a') },
    { q: t('faq3_q'), a: t('faq3_a') },
    { q: t('faq4_q'), a: t('faq4_a') },
    { q: t('faq5_q'), a: t('faq5_a') },
  ];
  el.innerHTML = `
    <div class="support-page">
      <div class="page-header">
        <h1>💬 ${t('support_title')}</h1>
        <p>${t('support_sub')}</p>
      </div>
      <div class="support-grid">
        <a href="https://t.me/emerx_support" target="_blank" class="support-card" style="text-decoration:none;color:inherit">
          <div class="icon">✈️</div>
          <h3>Telegram</h3>
          <p>Savol yoki muammo bo'lsa, Telegram orqali murojaat qiling.</p>
          <span>@emerx_support →</span>
        </a>
        <a href="mailto:support@emerx.uz" class="support-card" style="text-decoration:none;color:inherit">
          <div class="icon">📧</div>
          <h3>Email</h3>
          <p>Rasmiy murojaatlar uchun elektron pochta orqali yozing.</p>
          <span>support@emerx.uz →</span>
        </a>
      </div>
      <div class="faq-section">
        <h2>${t('faq_title')}</h2>
        ${faqs.map((f, i) => `
          <div class="faq-item" id="faq-${i}">
            <button class="faq-q" onclick="toggleFaq(${i})">
              <span>${f.q}</span>
              <span class="arrow">▼</span>
            </button>
            <div class="faq-a" id="faq-a-${i}">${f.a}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function toggleFaq(i) {
  const faqItem = document.getElementById(`faq-${i}`);
  const faqA = document.getElementById(`faq-a-${i}`);
  const faqQ = faqItem.querySelector('.faq-q');
  const isOpen = faqItem.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('open');
    item.querySelector('.faq-a')?.classList.remove('open');
    item.querySelector('.faq-q')?.classList.remove('open');
  });
  if (!isOpen) {
    faqItem.classList.add('open');
    faqA.classList.add('open');
    faqQ.classList.add('open');
  }
}

// ==================== INIT ====================
async function init() {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => { setLang(b.dataset.lang); closeMobileMenu(); });
  });

  document.getElementById('nav-logout').addEventListener('click', () => { logout(); closeMobileMenu(); });
  document.getElementById('nav-profile').addEventListener('click', () => { showPage('profile'); closeMobileMenu(); });
  document.getElementById('nav-dashboard').addEventListener('click', () => { showPage('dashboard'); closeMobileMenu(); });
  document.getElementById('nav-courses').addEventListener('click', () => { showPage('courses'); closeMobileMenu(); });
  document.getElementById('nav-home').addEventListener('click', () => { showPage('home'); closeMobileMenu(); });
  document.getElementById('nav-login').addEventListener('click', () => { showPage('auth'); closeMobileMenu(); });
  document.getElementById('nav-register').addEventListener('click', () => { switchAuthTab('register'); showPage('auth'); closeMobileMenu(); });
  document.getElementById('nav-leaderboard').addEventListener('click', () => { showPage('leaderboard'); closeMobileMenu(); });
  document.getElementById('nav-chat').addEventListener('click', () => { showPage('chat'); closeMobileMenu(); });
  document.getElementById('nav-support').addEventListener('click', () => { showPage('support'); closeMobileMenu(); });
  document.getElementById('nav-profile').addEventListener('click', () => { showPage('profile'); closeMobileMenu(); });
  document.getElementById('nav-admin').addEventListener('click', () => { showPage('admin'); closeMobileMenu(); });
  document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);

  setLang(state.lang);
  await initAuth();
  updateNavbar();

  const hash = window.location.hash.slice(1) || 'home';
  if (hash === 'dashboard' && state.user) showPage('dashboard');
  else if (hash === 'courses') showPage('courses');
  else showPage('home');
}

document.addEventListener('DOMContentLoaded', () => {
  init().catch(err => {
    console.error('Init xatosi:', err);
    // Foydalanuvchiga texnik xabar emas, tushunarli xabar ko'rsatamiz
    const isJsonErr = err.message && err.message.toLowerCase().includes('json');
    const msg = isJsonErr
      ? '⚠️ Server hozir yuklanmoqda. 30 soniyadan keyin sahifani yangilang (F5)'
      : `❌ Xato: ${err.message}`;
    document.body.insertAdjacentHTML('afterbegin',
      `<div id="init-err" style="position:fixed;top:64px;left:0;right:0;background:${isJsonErr ? '#b45309' : '#ff4444'};color:#fff;padding:12px 20px;z-index:9999;font-size:14px;text-align:center;cursor:pointer" onclick="location.reload()">
        ${msg} — <u>bosing va yangilang</u>
      </div>`
    );
  });
});
