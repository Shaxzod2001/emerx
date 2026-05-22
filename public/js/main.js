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
  lang: localStorage.getItem('emerx_lang') || 'uz',
  courses: [],
  progress: [],
  currentCourse: null,
  currentLesson: null,
  stats: { completed: 0, quizAvg: 0 }
};

window.currentLang = state.lang;

// ==================== API HELPER ====================
async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  const res = await fetch(API + path, { headers, ...opts });
  return res.json();
}

// ==================== AUTH ====================
async function initAuth() {
  if (!state.token) return;
  const user = await api('/auth/me');
  if (user.id) {
    state.user = user;
    state.lang = user.lang || state.lang;
    window.currentLang = state.lang;
    setLang(state.lang);
  } else {
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
    state.lang = res.user.lang || 'uz';
    window.currentLang = state.lang;
    localStorage.setItem('emerx_token', res.token);
    localStorage.setItem('emerx_lang', state.lang);
    setLang(state.lang);
    return { ok: true };
  }
  return { ok: false, error: res.error };
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
    setLang(lang);
    return { ok: true };
  }
  return { ok: false, error: res.error };
}

function logout() {
  state.token = null;
  state.user = null;
  state.progress = [];
  localStorage.removeItem('emerx_token');
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
  if (state.user) {
    navAuth.style.display = 'none';
    navUser.style.display = 'flex';
    document.getElementById('nav-username').textContent = state.user.username;
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
  state.courses = data;
}

async function loadProgress() {
  if (!state.user) return;
  const data = await api('/progress/my');
  state.progress = data;
  const stats = await api('/progress/stats');
  state.stats = stats;
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
  quizAnswers[qi] = oi;

  const opts = document.querySelectorAll(`#quiz-q-${qi} .quiz-option`);
  opts.forEach((o, idx) => {
    o.disabled = true;
    if (idx === correct) o.classList.add('correct');
    else if (idx === oi && oi !== correct) o.classList.add('wrong');
  });

  const answered = Object.keys(quizAnswers).length;
  if (answered >= total) {
    const score = Object.entries(quizAnswers).filter(([q, a]) => {
      const qIdx = parseInt(q);
      return a === parseInt(a);
    }).length;

    const correctCount = Object.entries(quizAnswers).filter(([q, a]) => {
      return true;
    }).length;

    let actualScore = 0;
    document.querySelectorAll('.quiz-option.correct').forEach(() => {});

    const resultEl = document.getElementById('quiz-result');
    const pass = Object.values(quizDone).length >= total;
    resultEl.style.display = 'block';
    resultEl.className = `quiz-result ${pass ? 'pass' : 'fail'}`;
    resultEl.textContent = pass ? t('quiz_pass') : t('quiz_fail');

    if (state.user) {
      api('/progress/quiz', { method: 'POST', body: JSON.stringify({ lesson_id: lessonId, score: answered, total }) });
    }

    quizAnswers = {};
    quizDone = {};
  }
}

async function completeLesson(courseId, lessonId) {
  if (!state.user) { showPage('auth'); return; }
  await api('/progress/complete', {
    method: 'POST',
    body: JSON.stringify({ lesson_id: lessonId, course_id: courseId })
  });
  await loadProgress();
  showToast(t('lesson_complete_toast'));
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
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-pass').value;
  const res = await login(email, pass);
  if (res.ok) {
    showPage('dashboard');
  } else {
    showAuthError(res.error);
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('reg-user').value;
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-pass').value;
  const lang = document.getElementById('reg-lang').value;
  const captchaAnswer = document.getElementById('captcha-ans').value;

  const res = await register(username, email, pass, lang, captchaToken, captchaAnswer);
  if (res.ok) {
    showPage('dashboard');
  } else {
    showAuthError(res.error);
    // Noto'g'ri CAPTCHA bo'lsa — yangi savol yuklash
    if (res.error && res.error.toLowerCase().includes('captcha')) {
      await refreshCaptcha();
    }
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

// ==================== INIT ====================
async function init() {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });

  document.getElementById('nav-logout').addEventListener('click', logout);
  document.getElementById('nav-dashboard').addEventListener('click', () => showPage('dashboard'));
  document.getElementById('nav-courses').addEventListener('click', () => showPage('courses'));
  document.getElementById('nav-home').addEventListener('click', () => showPage('home'));
  document.getElementById('nav-login').addEventListener('click', () => showPage('auth'));
  document.getElementById('nav-register').addEventListener('click', () => { switchAuthTab('register'); showPage('auth'); });

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
    document.body.insertAdjacentHTML('afterbegin',
      `<div style="position:fixed;top:64px;left:0;right:0;background:#ff4444;color:#fff;padding:12px 20px;z-index:9999;font-family:monospace;font-size:13px">
        ❌ Init xatosi: ${err.message}
      </div>`
    );
  });
});
