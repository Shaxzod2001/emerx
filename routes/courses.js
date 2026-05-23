const express = require('express');
const router = express.Router();
const staticCourses = require('../courses/index');
const { customCourses } = require('../database');

// Barcha kurslar (statik + admin yaratgan)
router.get('/', async (req, res) => {
  try {
    const custom = await customCourses.findAsync({ deleted: { $ne: true } });

    const staticSummary = staticCourses.map(c => ({
      id: c.id,
      level: c.level,
      levelName: c.levelName,
      icon: c.icon,
      color: c.color,
      title: c.title,
      desc: c.desc,
      duration: c.duration,
      lessonCount: c.lessons.length,
      lessons: c.lessons.map(l => ({ id: l.id, title: l.title, duration: l.duration })),
      isCustom: false,
    }));

    const customSummary = custom.map(c => ({
      id: c._id,
      level: c.level || 1,
      levelName: c.levelName || { uz: "Qo'shimcha", ru: "Дополнительный", en: "Extra" },
      icon: c.icon || '📖',
      color: c.color || '#00aaff',
      title: c.title,
      desc: c.desc,
      duration: c.duration || { uz: '—', ru: '—', en: '—' },
      lessonCount: (c.lessons || []).length,
      lessons: (c.lessons || []).map(l => ({ id: l.id, title: l.title, duration: l.duration || '—' })),
      isCustom: true,
      createdAt: c.createdAt,
    }));

    res.json([...staticSummary, ...customSummary]);
  } catch (e) {
    console.error('courses GET xato:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Dars ma'lumoti — avval statik, keyin custom
router.get('/:courseId/lessons/:lessonId', async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // Statik kurslardan qidirish
    const staticCourse = staticCourses.find(c => c.id === courseId);
    if (staticCourse) {
      const lesson = staticCourse.lessons.find(l => l.id === lessonId);
      if (!lesson) return res.status(404).json({ error: 'Dars topilmadi' });
      return res.json({ ...lesson, courseId, courseTitle: staticCourse.title, level: staticCourse.level });
    }

    // Custom kurslardan qidirish
    const customCourse = await customCourses.findOneAsync({ _id: courseId });
    if (!customCourse) return res.status(404).json({ error: 'Kurs topilmadi' });
    const lesson = (customCourse.lessons || []).find(l => l.id === lessonId);
    if (!lesson) return res.status(404).json({ error: 'Dars topilmadi' });

    return res.json({
      ...lesson,
      courseId,
      courseTitle: customCourse.title,
      level: customCourse.level,
    });
  } catch (e) {
    console.error('lesson GET xato:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
