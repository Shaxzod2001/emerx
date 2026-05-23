const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const { users, progress, quizResults } = require('../database');

// ==================== PROFIL MA'LUMOTLARI ====================
router.get('/', auth, async (req, res) => {
  try {
    const user = await users.findOneAsync({ _id: req.user.id });
    if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });

    // Statistika
    const completed = await progress.countAsync({ user_id: req.user.id, completed: true });
    const allQuiz = await quizResults.findAsync({ user_id: req.user.id });
    const quizAvg = allQuiz.length
      ? Math.round(allQuiz.reduce((s, q) => s + (q.total > 0 ? (q.score / q.total) * 100 : 0), 0) / allQuiz.length)
      : 0;

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      lang: user.lang,
      coins: user.coins || 0,
      avatar: user.avatar || null,
      bio: user.bio || '',
      created_at: user.created_at,
      stats: { completed, quizAvg },
    });
  } catch (e) {
    console.error('❌ profile GET xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== USERNAME / BIO TAHRIRLASH ====================
router.put('/', auth, async (req, res) => {
  try {
    const { username, bio } = req.body;
    const update = {};

    if (username !== undefined) {
      const clean = String(username).trim();
      if (!/^[a-zA-Z0-9_]{3,30}$/.test(clean))
        return res.status(400).json({ error: 'Username: 3-30 belgi, faqat harf/raqam/_' });
      // Band emasligini tekshir
      const existing = await users.findOneAsync({ username: clean });
      if (existing && existing._id !== req.user.id)
        return res.status(409).json({ error: 'Bu username band' });
      update.username = clean;
    }

    if (bio !== undefined) {
      update.bio = String(bio).trim().substring(0, 200);
    }

    if (Object.keys(update).length === 0)
      return res.status(400).json({ error: 'Hech narsa o\'zgartirilmadi' });

    await users.updateAsync({ _id: req.user.id }, { $set: update });
    res.json({ success: true, ...update });
  } catch (e) {
    console.error('❌ profile PUT xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== PAROL O'ZGARTIRISH ====================
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ error: 'Barcha maydonlarni to\'ldiring' });
    if (newPassword.length < 6)
      return res.status(400).json({ error: 'Yangi parol kamida 6 belgi' });
    if (newPassword.length > 72)
      return res.status(400).json({ error: 'Parol 72 belgidan oshmasin' });

    const user = await users.findOneAsync({ _id: req.user.id });
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(401).json({ error: 'Joriy parol noto\'g\'ri' });

    const hash = await bcrypt.hash(newPassword, 10);
    await users.updateAsync({ _id: req.user.id }, { $set: { password: hash } });
    res.json({ success: true });
  } catch (e) {
    console.error('❌ profile/password xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== AVATAR YUKLASH ====================
router.put('/avatar', auth, async (req, res) => {
  try {
    const { avatar } = req.body;

    if (!avatar)
      return res.status(400).json({ error: 'Rasm ma\'lumoti kerak' });
    if (!avatar.startsWith('data:image/'))
      return res.status(400).json({ error: 'Noto\'g\'ri rasm formati' });
    if (avatar.length > 800000)  // ~600KB rasm
      return res.status(400).json({ error: 'Rasm hajmi katta (max 600KB)' });

    await users.updateAsync({ _id: req.user.id }, { $set: { avatar } });
    res.json({ success: true, avatar });
  } catch (e) {
    console.error('❌ profile/avatar xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// ==================== AVATAR O'CHIRISH ====================
router.delete('/avatar', auth, async (req, res) => {
  try {
    await users.updateAsync({ _id: req.user.id }, { $set: { avatar: null } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
