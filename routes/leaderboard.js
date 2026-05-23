const express = require('express');
const router = express.Router();
const { users } = require('../database');
const authMiddleware = require('../middleware/auth');

// Top 20 reyting
router.get('/', async (req, res) => {
  try {
    const all = await users.findAsync({});
    const sorted = all
      .sort((a, b) => (b.coins || 0) - (a.coins || 0))
      .slice(0, 20)
      .map((u, i) => ({ rank: i + 1, username: u.username, coins: u.coins || 0 }));
    res.json(sorted);
  } catch (e) {
    console.error('❌ leaderboard xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Joriy foydalanuvchi rangi
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await users.findOneAsync({ _id: req.user.id });
    const myCoins = user?.coins || 0;
    const all = await users.findAsync({});
    const above = all.filter(u => (u.coins || 0) > myCoins).length;
    res.json({ rank: above + 1, coins: myCoins, username: user?.username });
  } catch (e) {
    console.error('❌ leaderboard/me xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
