const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth');
const { users, breaks } = require('../database');
const { todayStr } = require('../lib/breakSettings');
const { t, getLang } = require('../lib/i18nServer');
const { sanitize, isValidName } = require('../lib/validators');
const { normalizePhone } = require('../lib/phone');

// Barcha admin routelari himoyalangan
router.use(adminAuth);

// ==================== STATISTIKA ====================
router.get('/stats', async (req, res) => {
  try {
    const allUsers = await users.findAsync({});
    const today = todayStr();
    const todayBreaks = await breaks.findAsync({ date: today });
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;
    const newUsers = allUsers.filter(u => u.created_at && (now - new Date(u.created_at).getTime()) < week).length;

    res.json({
      totalUsers: allUsers.filter(u => !u._deleted).length,
      newUsersWeek: newUsers,
      admins: allUsers.filter(u => u.isAdmin).length,
      banned: allUsers.filter(u => u.isBanned).length,
      activeNow: todayBreaks.filter(b => b.status === 'active').length,
      queuedNow: todayBreaks.filter(b => b.status === 'queued').length,
      completedToday: todayBreaks.filter(b => b.status === 'completed').length,
    });
  } catch (e) {
    console.error('admin/stats xato:', e.message);
    res.status(500).json({ error: t('server_error', getLang(req)) });
  }
});

// ==================== FOYDALANUVCHILAR RO'YXATI ====================
router.get('/users', async (req, res) => {
  try {
    const { q = '', page = 1, limit = 20 } = req.query;
    const all = await users.findAsync({});

    let filtered = all.filter(u => !u._deleted);
    if (q) {
      const search = q.toLowerCase();
      filtered = filtered.filter(u =>
        `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase().includes(search) ||
        (u.phone || '').includes(search)
      );
    }

    // Oxirgi qo'shilganlar birinchi
    filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    const total = filtered.length;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    res.json({
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      users: paginated.map(u => ({
        id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone,
        isAdmin: !!u.isAdmin,
        isBanned: !!u.isBanned,
        created_at: u.created_at,
      }))
    });
  } catch (e) {
    console.error('admin/users xato:', e.message);
    res.status(500).json({ error: t('server_error', getLang(req)) });
  }
});

// ==================== ADMIN BERISH / OLISH ====================
router.put('/users/:id/admin', async (req, res) => {
  const lang = getLang(req);
  try {
    // O'zini admin huquqidan mahrum qila olmaydi
    if (req.params.id === req.adminUser._id)
      return res.status(400).json({ error: t('self_manage', lang) });
    const { isAdmin } = req.body;
    await users.updateAsync({ _id: req.params.id }, { $set: { isAdmin: !!isAdmin } });
    res.json({ success: true, isAdmin: !!isAdmin });
  } catch (e) {
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== BAN / UNBAN ====================
router.put('/users/:id/ban', async (req, res) => {
  const lang = getLang(req);
  try {
    if (req.params.id === req.adminUser._id)
      return res.status(400).json({ error: t('self_ban', lang) });
    const { isBanned } = req.body;
    await users.updateAsync({ _id: req.params.id }, { $set: { isBanned: !!isBanned } });
    res.json({ success: true, isBanned: !!isBanned });
  } catch (e) {
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== PAROLNI QAYTA O'RNATISH (admin tomonidan) ====================
router.put('/users/:id/password', async (req, res) => {
  const lang = getLang(req);
  try {
    const { newPassword } = req.body;
    if (!newPassword)
      return res.status(400).json({ error: t('fields_required', lang) });
    if (newPassword.length < 6)
      return res.status(400).json({ error: t('password_short', lang) });
    if (newPassword.length > 72)
      return res.status(400).json({ error: t('password_long', lang) });

    const target = await users.findOneAsync({ _id: req.params.id });
    if (!target || target._deleted)
      return res.status(404).json({ error: t('not_found', lang) });

    const hash = await bcrypt.hash(newPassword, 10);
    await users.updateAsync({ _id: req.params.id }, { $set: { password: hash } });
    res.json({ success: true });
  } catch (e) {
    console.error('admin/users/password PUT xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== FOYDALANUVCHINI O'CHIRISH ====================
router.delete('/users/:id', async (req, res) => {
  const lang = getLang(req);
  try {
    if (req.params.id === req.adminUser._id)
      return res.status(400).json({ error: t('self_delete', lang) });
    await users.updateAsync({ _id: req.params.id }, { $set: { _deleted: true, firstName: '[o\'chirilgan]', lastName: '', phone: `deleted_${req.params.id}` } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== XODIM QO'SHISH (admin tomonidan) ====================
router.post('/employees', async (req, res) => {
  const lang = getLang(req);
  try {
    const { firstName, lastName, phone, password } = req.body;

    if (!firstName || !lastName || !phone || !password)
      return res.status(400).json({ error: t('fields_required', lang) });
    if (!isValidName(firstName) || !isValidName(lastName))
      return res.status(400).json({ error: t('name_invalid', lang) });
    if (password.length < 6)
      return res.status(400).json({ error: t('password_short', lang) });
    if (password.length > 72)
      return res.status(400).json({ error: t('password_long', lang) });

    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone)
      return res.status(400).json({ error: t('phone_invalid', lang) });

    const hash = await bcrypt.hash(password, 10);
    const user = await users.insertAsync({
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      phone: normalizedPhone,
      password: hash,
      isAdmin: false,
      created_at: new Date(),
    });

    res.json({
      success: true,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone },
    });
  } catch (e) {
    if (e.errorType === 'uniqueViolated') {
      return res.status(409).json({ error: t('phone_taken', lang) });
    }
    console.error('admin/employees POST xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// ==================== BARCHA XODIMLARNI TOZALASH ====================
// O'zini (chaqiruvchi adminni) saqlab qolgan holda qolgan hammani soft-delete qiladi
// va bugungi/o'tgan abet yozuvlarini tozalaydi — yangi jamoani nol nuqtadan boshlash uchun.
router.post('/wipe-all', async (req, res) => {
  const lang = getLang(req);
  try {
    const all = await users.findAsync({});
    for (const u of all) {
      if (u._id === req.adminUser._id) continue;
      await users.updateAsync({ _id: u._id }, { $set: { _deleted: true, firstName: '[o\'chirilgan]', lastName: '', phone: `deleted_${u._id}` } });
    }

    const allBreaks = await breaks.findAsync({});
    for (const b of allBreaks) {
      await breaks.updateAsync({ _id: b._id }, { $set: { _wiped: true, status: 'cancelled' } });
    }

    res.json({ success: true, message: t('wipe_done', lang) });
  } catch (e) {
    console.error('admin/wipe-all xato:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

module.exports = router;
