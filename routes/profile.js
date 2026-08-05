const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const { users } = require('../database');
const { t, getLang } = require('../lib/i18nServer');

function isValidName(name) {
  const clean = String(name || '').trim();
  return clean.length >= 2 && clean.length <= 30 && /^[a-zA-Zа-яА-ЯёЁʻʼ'\- ]+$/.test(clean);
}

// Rasm client tomonida kichraytirilib yuboriladi (~200x200, JPEG) —
// shunga qaramay bazadagi hujjat hajmini nazorat qilish uchun cheklov qo'yamiz.
const MAX_AVATAR_LEN = 400000; // ~300KB base64 (taxminan 220KB rasm)
function isValidAvatar(avatar) {
  return typeof avatar === 'string' && avatar.startsWith('data:image/') && avatar.length <= MAX_AVATAR_LEN;
}

// ==================== PROFIL MA'LUMOTLARI ====================
router.get('/', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const user = await users.findOneAsync({ _id: req.user.id });
    if (!user) return res.status(404).json({ error: t('user_not_found', lang) });

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isAdmin: !!user.isAdmin,
      avatar: user.avatar || null,
      created_at: user.created_at,
    });
  } catch (e) {
    console.error('❌ profile GET xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== ISM/FAMILIYA TAHRIRLASH ====================
router.put('/', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { firstName, lastName } = req.body;
    const update = {};

    if (firstName !== undefined) {
      if (!isValidName(firstName)) return res.status(400).json({ error: t('name_invalid', lang) });
      update.firstName = String(firstName).trim();
    }
    if (lastName !== undefined) {
      if (!isValidName(lastName)) return res.status(400).json({ error: t('name_invalid', lang) });
      update.lastName = String(lastName).trim();
    }

    if (Object.keys(update).length === 0)
      return res.status(400).json({ error: t('nothing_changed', lang) });

    await users.updateAsync({ _id: req.user.id }, { $set: update });
    res.json({ success: true, ...update });
  } catch (e) {
    console.error('❌ profile PUT xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== PROFIL RASMI ====================
router.put('/avatar', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { avatar } = req.body || {};

    if (avatar === null) {
      await users.updateAsync({ _id: req.user.id }, { $set: { avatar: null } });
      return res.json({ success: true, avatar: null });
    }

    if (!isValidAvatar(avatar)) return res.status(400).json({ error: t('avatar_invalid', lang) });

    await users.updateAsync({ _id: req.user.id }, { $set: { avatar } });
    res.json({ success: true, avatar });
  } catch (e) {
    console.error('❌ profile/avatar xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== PAROL O'ZGARTIRISH ====================
router.put('/password', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ error: t('fields_required', lang) });
    if (newPassword.length < 6)
      return res.status(400).json({ error: t('password_short', lang) });
    if (newPassword.length > 72)
      return res.status(400).json({ error: t('password_long', lang) });

    const user = await users.findOneAsync({ _id: req.user.id });
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(401).json({ error: t('current_pass_wrong', lang) });

    const hash = await bcrypt.hash(newPassword, 10);
    await users.updateAsync({ _id: req.user.id }, { $set: { password: hash } });
    res.json({ success: true });
  } catch (e) {
    console.error('❌ profile/password xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== SHAXSIY XABARLAR UCHUN FOYDALANUVCHILAR RO'YXATI ====================
router.get('/contacts', auth, async (req, res) => {
  const lang = getLang(req);
  try {
    const all = await users.findAsync({});
    const list = all
      .filter(u => !u._deleted && !u.isBanned && u._id !== req.user.id)
      .map(u => ({ id: u._id, firstName: u.firstName, lastName: u.lastName, isAdmin: !!u.isAdmin, avatar: u.avatar || null }))
      .sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`, 'ru'));
    res.json({ users: list });
  } catch (e) {
    console.error('❌ profile/contacts xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

module.exports = router;
