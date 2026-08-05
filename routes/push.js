const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { pushSubscriptions } = require('../database');
const { getPublicKey } = require('../lib/push');
const { t, getLang } = require('../lib/i18nServer');

// ==================== VAPID PUBLIC KEY ====================
router.get('/public-key', auth, async (req, res) => {
  try {
    const publicKey = await getPublicKey();
    res.json({ publicKey });
  } catch (e) {
    console.error('push/public-key xato:', e.message);
    res.status(500).json({ error: t('server_error', getLang(req)) });
  }
});

// ==================== OBUNA BO'LISH ====================
router.post('/subscribe', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { endpoint, keys } = req.body || {};
    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return res.status(400).json({ error: t('fields_required', lang) });
    }

    const existing = await pushSubscriptions.findAsync({ endpoint });
    const mine = existing.find(s => s.userId === req.user.id);
    if (mine) {
      await pushSubscriptions.updateAsync({ _id: mine._id }, { $set: { active: true, keys } });
    } else {
      await pushSubscriptions.insertAsync({ userId: req.user.id, endpoint, keys, active: true, createdAt: new Date().toISOString() });
    }
    res.json({ success: true });
  } catch (e) {
    console.error('push/subscribe xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== OBUNADAN CHIQISH ====================
router.post('/unsubscribe', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { endpoint } = req.body || {};
    if (!endpoint) return res.status(400).json({ error: t('fields_required', lang) });

    await pushSubscriptions.updateAsync({ endpoint, userId: req.user.id }, { $set: { active: false } });
    res.json({ success: true });
  } catch (e) {
    console.error('push/unsubscribe xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

module.exports = router;
