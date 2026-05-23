const express = require('express');
const router = express.Router();
const { progress, quizResults, users } = require('../database');
const auth = require('../middleware/auth');

const COINS_PER_LESSON = 10;
const COINS_PERFECT_QUIZ = 5;

router.post('/complete', auth, async (req, res) => {
  const { lesson_id, course_id } = req.body;
  if (!lesson_id || !course_id) return res.status(400).json({ error: 'Missing fields' });

  const key = `${req.user.id}_${lesson_id}`;
  const existing = await progress.findOneAsync({ user_lesson: key });

  let coinsEarned = 0;
  if (!existing) {
    await progress.insertAsync({
      user_id: req.user.id, lesson_id, course_id,
      user_lesson: key, completed: true, completed_at: new Date()
    });
    // Yangi dars — coin bering
    await users.updateAsync({ _id: req.user.id }, { $inc: { coins: COINS_PER_LESSON } });
    coinsEarned = COINS_PER_LESSON;
  } else {
    await progress.updateAsync({ user_lesson: key }, { $set: { completed: true, completed_at: new Date() } });
  }

  const user = await users.findOneAsync({ _id: req.user.id });
  res.json({ success: true, coinsEarned, totalCoins: user?.coins || 0 });
});

router.get('/my', auth, async (req, res) => {
  const rows = await progress.findAsync({ user_id: req.user.id, completed: true });
  res.json(rows.map(r => ({ lesson_id: r.lesson_id, course_id: r.course_id, completed: r.completed, completed_at: r.completed_at })));
});

router.post('/quiz', auth, async (req, res) => {
  const { lesson_id, score, total } = req.body;
  await quizResults.insertAsync({ user_id: req.user.id, lesson_id, score, total, taken_at: new Date() });

  // Perfect quiz — bonus coin
  let bonusCoins = 0;
  if (score === total && total > 0) {
    await users.updateAsync({ _id: req.user.id }, { $inc: { coins: COINS_PERFECT_QUIZ } });
    bonusCoins = COINS_PERFECT_QUIZ;
  }
  const user = await users.findOneAsync({ _id: req.user.id });
  res.json({ success: true, bonusCoins, totalCoins: user?.coins || 0 });
});

router.get('/stats', auth, async (req, res) => {
  const completed = await progress.countAsync({ user_id: req.user.id, completed: true });
  const quizzes = await quizResults.findAsync({ user_id: req.user.id });
  const avg = quizzes.length
    ? Math.round(quizzes.reduce((s, q) => s + (q.score / q.total) * 100, 0) / quizzes.length)
    : 0;
  const user = await users.findOneAsync({ _id: req.user.id });
  res.json({ completed, quizAvg: avg, coins: user?.coins || 0 });
});

module.exports = router;
