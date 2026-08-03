const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { breaks, users } = require('../database');
const { getSettings, updateSettings, todayStr } = require('../lib/breakSettings');
const { t, getLang } = require('../lib/i18nServer');
const bus = require('../lib/bus');

function notifyChanged() {
  bus.emit('breaks:changed');
}

function fullName(user) {
  return `${user.firstName} ${user.lastName}`.trim();
}

// ==================== SOZLAMALAR ====================
router.get('/settings', auth, async (req, res) => {
  try {
    res.json(await getSettings());
  } catch (e) {
    console.error('breaks/settings GET xato:', e.message);
    res.status(500).json({ error: t('server_error', getLang(req)) });
  }
});

router.put('/settings', adminAuth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { breakDurationMinutes, maxConcurrent } = req.body;
    const durationNum = parseInt(breakDurationMinutes);
    const maxNum = parseInt(maxConcurrent);
    if (!durationNum || durationNum < 1 || durationNum > 480)
      return res.status(400).json({ error: t('duration_range', lang) });
    if (!maxNum || maxNum < 1 || maxNum > 50)
      return res.status(400).json({ error: t('max_range', lang) });

    const next = await updateSettings({ breakDurationMinutes: durationNum, maxConcurrent: maxNum });
    notifyChanged();
    res.json({ success: true, ...next });
  } catch (e) {
    console.error('breaks/settings PUT xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== ABETGA CHIQISH ====================
router.post('/start', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const today = todayStr();
    const already = await breaks.findOneAsync({
      userId: req.user.id,
      date: today,
      status: { $in: ['active', 'queued'] },
    });
    if (already) {
      return res.status(409).json({
        error: t(already.status === 'active' ? 'already_active' : 'already_queued', lang),
      });
    }

    const { breakDurationMinutes, maxConcurrent } = await getSettings();
    const activeCount = await breaks.countAsync({ date: today, status: 'active' });
    const now = new Date();
    const name = `${req.user.firstName} ${req.user.lastName}`.trim();

    let doc;
    if (activeCount < maxConcurrent) {
      const expectedEndTime = new Date(now.getTime() + breakDurationMinutes * 60000);
      doc = await breaks.insertAsync({
        userId: req.user.id,
        fullName: name,
        date: today,
        status: 'active',
        startTime: now.toISOString(),
        expectedEndTime: expectedEndTime.toISOString(),
        actualEndTime: null,
        queuedAt: null,
        createdAt: now.toISOString(),
      });
    } else {
      doc = await breaks.insertAsync({
        userId: req.user.id,
        fullName: name,
        date: today,
        status: 'queued',
        startTime: null,
        expectedEndTime: null,
        actualEndTime: null,
        queuedAt: now.toISOString(),
        createdAt: now.toISOString(),
      });
    }

    notifyChanged();
    res.json({ success: true, break: doc });
  } catch (e) {
    console.error('breaks/start xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== NAVBATNI BEKOR QILISH ====================
router.delete('/cancel', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const today = todayStr();
    const mine = await breaks.findOneAsync({ userId: req.user.id, date: today, status: 'queued' });
    if (!mine) return res.status(400).json({ error: t('not_in_queue', lang) });

    await breaks.updateAsync({ _id: mine._id }, { $set: { status: 'cancelled' } });
    notifyChanged();
    res.json({ success: true });
  } catch (e) {
    console.error('breaks/cancel xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== ABETDAN QAYTISH ====================
router.post('/end', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const today = todayStr();
    const mine = await breaks.findOneAsync({ userId: req.user.id, date: today, status: 'active' });
    if (!mine) return res.status(400).json({ error: t('not_active', lang) });

    const now = new Date();
    await breaks.updateAsync({ _id: mine._id }, { $set: { status: 'completed', actualEndTime: now.toISOString() } });

    // Navbatdagi birinchi kishini o'tkazish
    const queued = await breaks.findAsync({ date: today, status: 'queued' });
    queued.sort((a, b) => new Date(a.queuedAt) - new Date(b.queuedAt));
    if (queued.length > 0) {
      const { breakDurationMinutes } = await getSettings();
      const next = queued[0];
      const expectedEndTime = new Date(now.getTime() + breakDurationMinutes * 60000);
      await breaks.updateAsync({ _id: next._id }, {
        $set: {
          status: 'active',
          startTime: now.toISOString(),
          expectedEndTime: expectedEndTime.toISOString(),
        },
      });
    }

    notifyChanged();
    res.json({ success: true });
  } catch (e) {
    console.error('breaks/end xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== JORIY HOLAT (bugungi) ====================
router.get('/status', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const today = todayStr();
    const [allToday, allUsers, settings] = await Promise.all([
      breaks.findAsync({ date: today }),
      users.findAsync({}),
      getSettings(),
    ]);

    const active = allToday
      .filter(b => b.status === 'active')
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      .map(b => ({ userId: b.userId, fullName: b.fullName, startTime: b.startTime, expectedEndTime: b.expectedEndTime }));

    const queue = allToday
      .filter(b => b.status === 'queued')
      .sort((a, b) => new Date(a.queuedAt) - new Date(b.queuedAt))
      .map((b, i) => ({ userId: b.userId, fullName: b.fullName, queuedAt: b.queuedAt, position: i + 1 }));

    const completed = allToday
      .filter(b => b.status === 'completed')
      .sort((a, b) => new Date(b.actualEndTime) - new Date(a.actualEndTime))
      .map(b => ({ userId: b.userId, fullName: b.fullName, startTime: b.startTime, actualEndTime: b.actualEndTime }));

    const wentIds = new Set(allToday.filter(b => b.status !== 'cancelled').map(b => b.userId));
    const notGoneYet = allUsers
      .filter(u => !u._deleted && !u.isBanned && !wentIds.has(u._id))
      .map(u => ({ userId: u._id, fullName: fullName(u) }));

    const mine = allToday.filter(b => b.userId === req.user.id);
    const selfDoc = mine.find(b => b.status === 'active')
      || mine.find(b => b.status === 'queued')
      || mine.find(b => b.status === 'completed')
      || null;
    const self = selfDoc && {
      status: selfDoc.status,
      startTime: selfDoc.startTime,
      expectedEndTime: selfDoc.expectedEndTime,
      actualEndTime: selfDoc.actualEndTime,
      queuedAt: selfDoc.queuedAt,
      position: selfDoc.status === 'queued'
        ? queue.findIndex(q => q.userId === req.user.id) + 1
        : null,
    };

    res.json({ settings, active, queue, completed, notGoneYet, self, maxConcurrent: settings.maxConcurrent, activeCount: active.length });
  } catch (e) {
    console.error('breaks/status xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== TARIX (admin) ====================
router.get('/history', adminAuth, async (req, res) => {
  const lang = getLang(req);
  try {
    const date = req.query.date || todayStr();
    const records = await breaks.findAsync({ date });
    records.sort((a, b) => new Date(a.startTime || a.queuedAt) - new Date(b.startTime || b.queuedAt));
    res.json({ date, records });
  } catch (e) {
    console.error('breaks/history xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

module.exports = router;
