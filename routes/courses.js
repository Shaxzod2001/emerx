const express = require('express');
const router = express.Router();
const courses = require('../courses/index');

router.get('/', (req, res) => {
  const summary = courses.map(c => ({
    id: c.id,
    level: c.level,
    levelName: c.levelName,
    icon: c.icon,
    color: c.color,
    title: c.title,
    desc: c.desc,
    duration: c.duration,
    lessonCount: c.lessons.length,
    lessons: c.lessons.map(l => ({ id: l.id, title: l.title, duration: l.duration }))
  }));
  res.json(summary);
});

router.get('/:courseId/lessons/:lessonId', (req, res) => {
  const course = courses.find(c => c.id === req.params.courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const lesson = course.lessons.find(l => l.id === req.params.lessonId);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json({ ...lesson, courseId: course.id, courseTitle: course.title, level: course.level });
});

module.exports = router;
