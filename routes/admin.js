const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { users, progress, quizResults } = require('../database');

// Barcha admin routelari himoyalangan
router.use(adminAuth);

// ==================== STATISTIKA ====================
router.get('/stats', async (req, res) => {
  try {
    const allUsers = await users.findAsync({});
    const allProgress = await progress.findAsync({ completed: true });
    const allQuiz = await quizResults.findAsync({});
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;
    const newUsers = allUsers.filter(u => u.created_at && (now - new Date(u.created_at).getTime()) < week).length;
    const totalCoins = allUsers.reduce((s, u) => s + (u.coins || 0), 0);

    res.json({
      totalUsers: allUsers.length,
      newUsersWeek: newUsers,
      totalCompleted: allProgress.length,
      totalQuizzes: allQuiz.length,
      totalCoins,
      admins: allUsers.filter(u => u.isAdmin).length,
      banned: allUsers.filter(u => u.isBanned).length,
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

    let filtered = all;
    if (q) {
      const search = q.toLowerCase();
      filtered = all.filter(u =>
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
        coins: u.coins || 0,
        lang: u.lang,
        isAdmin: !!u.isAdmin,
        isBanned: !!u.isBanned,
        avatar: u.avatar ? true : false,  // avatar mavjudligini boolean sifatida
        created_at: u.created_at,
      }))
    });
  } catch (e) {
    console.error('admin/users xato:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== FOYDALANUVCHI DETALI ====================
router.get('/users/:id', async (req, res) => {
  try {
    const user = await users.findOneAsync({ _id: req.params.id });
    if (!user) return res.status(404).json({ error: 'Topilmadi' });

    const completed = await progress.countAsync({ user_id: req.params.id, completed: true });
    const quizAll = await quizResults.findAsync({ user_id: req.params.id });
    const quizAvg = quizAll.length
      ? Math.round(quizAll.reduce((s, q) => s + (q.total > 0 ? (q.score / q.total) * 100 : 0), 0) / quizAll.length)
      : 0;

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      coins: user.coins || 0,
      lang: user.lang,
      bio: user.bio || '',
      isAdmin: !!user.isAdmin,
      isBanned: !!user.isBanned,
      created_at: user.created_at,
      stats: { completed, quizAvg, quizCount: quizAll.length },
    });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== COIN TAHRIRLASH ====================
router.put('/users/:id/coins', async (req, res) => {
  try {
    const { coins } = req.body;
    if (coins === undefined || isNaN(coins) || coins < 0)
      return res.status(400).json({ error: 'Noto\'g\'ri coin miqdori' });
    await users.updateAsync({ _id: req.params.id }, { $set: { coins: parseInt(coins) } });
    res.json({ success: true, coins: parseInt(coins) });
  } catch (e) {
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
    await users.updateAsync({ _id: req.params.id }, { $set: { _deleted: true, username: '[deleted]', email: `deleted_${req.params.id}@deleted`, avatar: null } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== COIN RESET (barcha foydalanuvchilar) ====================
router.post('/reset-coins', async (req, res) => {
  try {
    const all = await users.findAsync({});
    for (const u of all) {
      await users.updateAsync({ _id: u._id }, { $set: { coins: 0 } });
    }
    res.json({ success: true, affected: all.length });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
