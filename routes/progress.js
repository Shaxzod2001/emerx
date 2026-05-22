const express = require('express');
const router = express.Router();
const { progress, quizResults } = require('../database');
const auth = require('../middleware/auth');

router.post('/complete', auth, async (req, res) => {
  const { lesson_id, course_id } = req.body;
  if (!lesson_id || !course_id) return res.status(400).json({ error: 'Missing fields' });

  const key = `${req.user.id}_${lesson_id}`;
  const existing = await progress.findOneAsync({ user_lesson: key });
  if (existing) {
    await progress.updateAsync({ user_lesson: key }, { $set: { completed: true, completed_at: new Date() } });
  } else {
    await progress.insertAsync({ user_id: req.user.id, lesson_id, course_id, user_lesson: key, completed: true, completed_at: new Date() });
  }
  res.json({ success: true });
});

router.get('/my', auth, async (req, res) => {
  const rows = await progress.findAsync({ user_id: req.user.id, completed: true });
  res.json(rows.map(r => ({ lesson_id: r.lesson_id, course_id: r.course_id, completed: r.completed, completed_at: r.completed_at })));
});

router.post('/quiz', auth, async (req, res) => {
  const { lesson_id, score, total } = req.body;
  await quizResults.insertAsync({ user_id: req.user.id, lesson_id, score, total, taken_at: new Date() });
  res.json({ success: true });
});

router.get('/stats', auth, async (req, res) => {
  const completed = await progress.countAsync({ user_id: req.user.id, completed: true });
  const quizzes = await quizResults.findAsync({ user_id: req.user.id });
  const avg = quizzes.length
    ? Math.round(quizzes.reduce((s, q) => s + (q.score / q.total) * 100, 0) / quizzes.length)
    : 0;
  res.json({ completed, quizAvg: avg });
});

module.exports = router;
