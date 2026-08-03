const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { users, breaks } = require('../database');
const { todayStr } = require('../lib/breakSettings');

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
    res.status(500).json({ error: 'Server xatosi' });
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
        (u.username || '').toLowerCase().includes(search) ||
        (u.email || '').toLowerCase().includes(search)
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
        username: u.username,
        email: u.email,
        isAdmin: !!u.isAdmin,
        isBanned: !!u.isBanned,
        created_at: u.created_at,
      }))
    });
  } catch (e) {
    console.error('admin/users xato:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== ADMIN BERISH / OLISH ====================
router.put('/users/:id/admin', async (req, res) => {
  try {
    // O'zini admin huquqidan mahrum qila olmaydi
    if (req.params.id === req.adminUser._id)
      return res.status(400).json({ error: 'O\'zingizni boshqara olmaysiz' });
    const { isAdmin } = req.body;
    await users.updateAsync({ _id: req.params.id }, { $set: { isAdmin: !!isAdmin } });
    res.json({ success: true, isAdmin: !!isAdmin });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== BAN / UNBAN ====================
router.put('/users/:id/ban', async (req, res) => {
  try {
    if (req.params.id === req.adminUser._id)
      return res.status(400).json({ error: 'O\'zingizni ban qila olmaysiz' });
    const { isBanned } = req.body;
    await users.updateAsync({ _id: req.params.id }, { $set: { isBanned: !!isBanned } });
    res.json({ success: true, isBanned: !!isBanned });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== FOYDALANUVCHINI O'CHIRISH ====================
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.params.id === req.adminUser._id)
      return res.status(400).json({ error: 'O\'zingizni o\'chira olmaysiz' });
    await users.updateAsync({ _id: req.params.id }, { $set: { _deleted: true, username: '[deleted]', email: `deleted_${req.params.id}@deleted` } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
