const express = require('express');
const router = express.Router();
const { getDb } = require('../database');
const authMiddleware = require('../middleware/auth');

// Top 20 + joriy foydalanuvchi rangi
router.get('/', async (req, res) => {
  try {
    const db = await getDb();

    const top = await db.collection('users')
      .find({ test: { $ne: true } }, { projection: { username: 1, coins: 1, created_at: 1 } })
      .sort({ coins: -1 })
      .limit(20)
      .toArray();

    // Raqamlarni qo'shish
    const leaderboard = top.map((u, i) => ({
      rank: i + 1,
      username: u.username,
      coins: u.coins || 0,
    }));

    res.json(leaderboard);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Joriy foydalanuvchi rangi
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: req.user.id });
    const myCoins = user?.coins || 0;

    const above = await db.collection('users').countDocuments({
      coins: { $gt: myCoins },
      test: { $ne: true }
    });

    res.json({ rank: above + 1, coins: myCoins, username: user?.username });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
