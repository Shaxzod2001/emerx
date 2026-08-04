const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { breaks, users } = require('../database');
const { getSettings, updateSettings, todayStr } = require('../lib/breakSettings');
const { generateSlots, findSlotStart } = require('../lib/scheduleUtils');
const { t, getLang } = require('../lib/i18nServer');
const bus = require('../lib/bus');

function notifyChanged() {
  bus.emit('breaks:changed');
}

function fullName(user) {
  return `${user.firstName} ${user.lastName}`.trim();
}

// Navbatdagi birinchi kishini abetga chiqaradi (bo'sh joy ochilganda ishlatiladi)
async function promoteNextQueued(today, now, breakDurationMinutes) {
  const queued = await breaks.findAsync({ date: today, status: 'queued' });
  queued.sort((a, b) => new Date(a.queuedAt) - new Date(b.queuedAt));
  if (queued.length > 0) {
    const next = queued[0];
    const expectedEndTime = new Date(now.getTime() + breakDurationMinutes * 60000);
    await breaks.updateAsync({ _id: next._id }, {
      $set: { status: 'active', startTime: now.toISOString(), expectedEndTime: expectedEndTime.toISOString() },
    });
  }
}

// ==================== AVTOMATIK JARAYONLAR ====================
// Vaqti tugagan abetlarni avtomatik yakunlaydi (navbatni oldinga suradi) va
// band qilingan slot vaqti kelgan bronlarni avtomatik faollashtiradi.
async function processAutoEvents() {
  try {
    const today = todayStr();
    const now = new Date();
    const { breakDurationMinutes } = await getSettings();
    let changed = false;

    const activeList = await breaks.findAsync({ date: today, status: 'active' });
    for (const b of activeList) {
      if (b.expectedEndTime && new Date(b.expectedEndTime) <= now) {
        await breaks.updateAsync({ _id: b._id }, {
          $set: { status: 'completed', actualEndTime: b.expectedEndTime, autoEnded: true },
        });
        await promoteNextQueued(today, now, breakDurationMinutes);
        changed = true;
      }
    }

    const bookedList = await breaks.findAsync({ date: today, status: 'booked' });
    for (const b of bookedList) {
      if (b.bookedSlot && new Date(b.bookedSlot) <= now) {
        await breaks.updateAsync({ _id: b._id }, {
          $set: { status: 'active', startTime: b.bookedSlot, expectedEndTime: b.bookedSlotEnd },
        });
        changed = true;
      }
    }

    if (changed) notifyChanged();
  } catch (e) {
    console.error('breaks auto-process xato:', e.message);
  }
}

setInterval(processAutoEvents, 20000);
processAutoEvents();

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
    const { breakDurationMinutes, maxConcurrent, workStart, workEnd } = req.body;
    const durationNum = parseInt(breakDurationMinutes);
    const maxNum = parseInt(maxConcurrent);
    if (!durationNum || durationNum < 1 || durationNum > 480)
      return res.status(400).json({ error: t('duration_range', lang) });
    if (!maxNum || maxNum < 1 || maxNum > 50)
      return res.status(400).json({ error: t('max_range', lang) });
    if (workStart && !/^([01]\d|2[0-3]):[0-5]\d$/.test(workStart))
      return res.status(400).json({ error: t('slot_invalid', lang) });
    if (workEnd && !/^([01]\d|2[0-3]):[0-5]\d$/.test(workEnd))
      return res.status(400).json({ error: t('slot_invalid', lang) });

    const next = await updateSettings({ breakDurationMinutes: durationNum, maxConcurrent: maxNum, workStart, workEnd });
    notifyChanged();
    res.json({ success: true, ...next });
  } catch (e) {
    console.error('breaks/settings PUT xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== KUNLIK JADVAL (bron qilish uchun) ====================
router.get('/schedule', auth, async (req, res) => {
  try {
    const today = todayStr();
    const settings = await getSettings();
    const slots = generateSlots(today, settings.workStart, settings.workEnd, settings.breakDurationMinutes);
    const bookings = await breaks.findAsync({ date: today, status: 'booked' });
    const now = new Date();

    const result = slots.map(s => {
      const startIso = s.start.toISOString();
      const count = bookings.filter(b => b.bookedSlot === startIso).length;
      return {
        start: startIso,
        end: s.end.toISOString(),
        booked: count,
        capacity: settings.maxConcurrent,
        isFull: count >= settings.maxConcurrent,
        isPast: s.start <= now,
      };
    });

    res.json({ slots: result, breakDurationMinutes: settings.breakDurationMinutes });
  } catch (e) {
    console.error('breaks/schedule xato:', e.message);
    res.status(500).json({ error: t('server_error', getLang(req)) });
  }
});

// ==================== VAQTNI OLDINDAN BAND QILISH ====================
router.post('/book', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { slotStart } = req.body;
    if (!slotStart) return res.status(400).json({ error: t('fields_required', lang) });

    const today = todayStr();
    const already = await breaks.findOneAsync({
      userId: req.user.id, date: today, status: { $in: ['active', 'queued', 'booked'] },
    });
    if (already) {
      const key = already.status === 'active' ? 'already_active' : already.status === 'queued' ? 'already_queued' : 'already_booked';
      return res.status(409).json({ error: t(key, lang) });
    }

    const settings = await getSettings();
    const slots = generateSlots(today, settings.workStart, settings.workEnd, settings.breakDurationMinutes);
    const slot = slots.find(s => s.start.toISOString() === slotStart);
    if (!slot) return res.status(400).json({ error: t('slot_invalid', lang) });

    const now = new Date();
    if (slot.start <= now) return res.status(400).json({ error: t('slot_past', lang) });

    const bookedCount = await breaks.countAsync({ date: today, status: 'booked', bookedSlot: slot.start.toISOString() });
    if (bookedCount >= settings.maxConcurrent) return res.status(409).json({ error: t('slot_full', lang) });

    const doc = await breaks.insertAsync({
      userId: req.user.id,
      fullName: `${req.user.firstName} ${req.user.lastName}`.trim(),
      date: today,
      status: 'booked',
      startTime: null,
      expectedEndTime: null,
      actualEndTime: null,
      queuedAt: null,
      bookedSlot: slot.start.toISOString(),
      bookedSlotEnd: slot.end.toISOString(),
      createdAt: now.toISOString(),
    });

    notifyChanged();
    res.json({ success: true, break: doc });
  } catch (e) {
    console.error('breaks/book xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

router.delete('/book', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const today = todayStr();
    const mine = await breaks.findOneAsync({ userId: req.user.id, date: today, status: 'booked' });
    if (!mine) return res.status(400).json({ error: t('no_booking', lang) });

    await breaks.updateAsync({ _id: mine._id }, { $set: { status: 'cancelled' } });
    notifyChanged();
    res.json({ success: true });
  } catch (e) {
    console.error('breaks/book DELETE xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== ABETGA CHIQISH (hoziroq) ====================
router.post('/start', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const today = todayStr();
    const already = await breaks.findOneAsync({
      userId: req.user.id,
      date: today,
      status: { $in: ['active', 'queued', 'booked'] },
    });
    if (already) {
      const key = already.status === 'active' ? 'already_active' : already.status === 'queued' ? 'already_queued' : 'already_booked';
      return res.status(409).json({ error: t(key, lang) });
    }

    const settings = await getSettings();
    const { breakDurationMinutes, maxConcurrent } = settings;
    const now = new Date();
    const name = `${req.user.firstName} ${req.user.lastName}`.trim();

    // Hozirgi slotga band qilinganlar ham joy egallaydi — ularning o'rnini
    // erkin yurgan (walk-in) kishilar bosib olib qo'ymasligi uchun.
    const currentSlotStart = findSlotStart(today, settings.workStart, settings.workEnd, breakDurationMinutes, now);
    let bookedNowCount = 0;
    if (currentSlotStart) {
      bookedNowCount = await breaks.countAsync({ date: today, status: 'booked', bookedSlot: currentSlotStart.toISOString() });
    }
    const activeCount = await breaks.countAsync({ date: today, status: 'active' });

    let doc;
    if (activeCount + bookedNowCount < maxConcurrent) {
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

    const { breakDurationMinutes } = await getSettings();
    await promoteNextQueued(today, now, breakDurationMinutes);

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

    const booked = allToday
      .filter(b => b.status === 'booked')
      .sort((a, b) => new Date(a.bookedSlot) - new Date(b.bookedSlot))
      .map(b => ({ userId: b.userId, fullName: b.fullName, bookedSlot: b.bookedSlot, bookedSlotEnd: b.bookedSlotEnd }));

    const completed = allToday
      .filter(b => b.status === 'completed')
      .sort((a, b) => new Date(b.actualEndTime) - new Date(a.actualEndTime))
      .map(b => ({ userId: b.userId, fullName: b.fullName, startTime: b.startTime, actualEndTime: b.actualEndTime, autoEnded: !!b.autoEnded }));

    const wentIds = new Set(allToday.filter(b => b.status !== 'cancelled').map(b => b.userId));
    const notGoneYet = allUsers
      .filter(u => !u._deleted && !u.isBanned && !wentIds.has(u._id))
      .map(u => ({ userId: u._id, fullName: fullName(u) }));

    const mine = allToday.filter(b => b.userId === req.user.id);
    const selfDoc = mine.find(b => b.status === 'active')
      || mine.find(b => b.status === 'queued')
      || mine.find(b => b.status === 'booked')
      || mine.find(b => b.status === 'completed')
      || null;
    const self = selfDoc && {
      status: selfDoc.status,
      startTime: selfDoc.startTime,
      expectedEndTime: selfDoc.expectedEndTime,
      actualEndTime: selfDoc.actualEndTime,
      queuedAt: selfDoc.queuedAt,
      bookedSlot: selfDoc.bookedSlot,
      bookedSlotEnd: selfDoc.bookedSlotEnd,
      autoEnded: !!selfDoc.autoEnded,
      position: selfDoc.status === 'queued'
        ? queue.findIndex(q => q.userId === req.user.id) + 1
        : null,
    };

    res.json({ settings, active, queue, booked, completed, notGoneYet, self, maxConcurrent: settings.maxConcurrent, activeCount: active.length });
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
    records.sort((a, b) => new Date(a.startTime || a.bookedSlot || a.queuedAt) - new Date(b.startTime || b.bookedSlot || b.queuedAt));
    res.json({ date, records });
  } catch (e) {
    console.error('breaks/history xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

module.exports = router;
