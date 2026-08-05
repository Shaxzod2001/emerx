const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { announcements, users } = require('../database');
const { t, getLang } = require('../lib/i18nServer');
const { sanitize } = require('../lib/validators');
const bus = require('../lib/bus');
const push = require('../lib/push');

function notifyChanged() {
  bus.emit('announcements:changed');
}

// ==================== RO'YXAT (jonli xabarlar) ====================
router.get('/', auth, async (req, res) => {
  try {
    const all = await announcements.findAsync({});
    const items = all
      .filter(a => !a._deleted)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 30)
      .map(a => ({ id: a._id, title: a.title, body: a.body, createdAt: a.createdAt, createdBy: a.createdBy }));

    const me = await users.findOneAsync({ _id: req.user.id });
    const lastSeenAt = (me && me.lastSeenAnnouncementsAt) || null;
    const hasUnread = items.length > 0 && (!lastSeenAt || new Date(items[0].createdAt) > new Date(lastSeenAt));

    res.json({ items, lastSeenAt, hasUnread });
  } catch (e) {
    console.error('announcements GET xato:', e.message);
    res.status(500).json({ error: t('server_error', getLang(req)) });
  }
});

// ==================== O'QILGAN DEB BELGILASH ====================
router.put('/seen', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    await users.updateAsync({ _id: req.user.id }, { $set: { lastSeenAnnouncementsAt: new Date().toISOString() } });
    res.json({ success: true });
  } catch (e) {
    console.error('announcements/seen xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== YANGI XABAR (admin) ====================
router.post('/', adminAuth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ error: t('fields_required', lang) });

    const cleanTitle = sanitize(title).slice(0, 120);
    const cleanBody = sanitize(body).slice(0, 2000);
    if (!cleanTitle || !cleanBody) return res.status(400).json({ error: t('fields_required', lang) });

    const doc = await announcements.insertAsync({
      title: cleanTitle,
      body: cleanBody,
      createdAt: new Date().toISOString(),
      createdBy: `${req.adminUser.firstName} ${req.adminUser.lastName}`.trim(),
    });

    notifyChanged();
    push.sendToAllExcept(req.user.id, { title: cleanTitle, body: cleanBody, url: '/' }).catch(() => {});
    res.json({ success: true, announcement: doc });
  } catch (e) {
    console.error('announcements POST xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== XABARNI O'CHIRISH (admin) ====================
router.delete('/:id', adminAuth, async (req, res) => {
  const lang = getLang(req);
  try {
    await announcements.updateAsync({ _id: req.params.id }, { $set: { _deleted: true } });
    notifyChanged();
    res.json({ success: true });
  } catch (e) {
    console.error('announcements DELETE xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

module.exports = router;
