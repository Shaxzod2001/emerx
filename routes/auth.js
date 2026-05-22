const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';

// HTML teglarini tozalash (XSS oldini olish)
function sanitize(str) {
  return String(str).replace(/[<>&"'`]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;',
    '"': '&quot;', "'": '&#x27;', '`': '&#x60;'
  }[c])).trim();
}

// Email formatini tekshirish
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// CAPTCHA: matematik savol + imzolangan token
router.get('/captcha', (req, res) => {
  const a = Math.floor(Math.random() * 15) + 1;
  const b = Math.floor(Math.random() * 15) + 1;
  const ops = [
    { q: `${a} + ${b}`, ans: a + b },
    { q: `${a + b} - ${b}`, ans: a },
    { q: `${a} × ${b > 5 ? 2 : b}`, ans: a * (b > 5 ? 2 : b) },
  ];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const token = jwt.sign({ answer: op.ans }, JWT_SECRET, { expiresIn: '10m' });
  res.json({ token, question: `${op.q} = ?` });
});

router.post('/register', async (req, res) => {
  const { username, email, password, lang, captchaToken, captchaAnswer } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields required' });

  // CAPTCHA tekshiruv
  if (!captchaToken || captchaAnswer === undefined)
    return res.status(400).json({ error: 'CAPTCHA required' });
  try {
    const decoded = jwt.verify(captchaToken, JWT_SECRET);
    if (parseInt(captchaAnswer) !== decoded.answer)
      return res.status(400).json({ error: 'CAPTCHA noto\'g\'ri, qaytadan urinib ko\'ring' });
  } catch {
    return res.status(400).json({ error: 'CAPTCHA muddati o\'tdi, sahifani yangilang' });
  }

  // Parol uzunligi: 6–72 belgi (bcrypt 72 dan ko'proq belgini qabul qilmaydi)
  if (password.length < 6)
    return res.status(400).json({ error: 'Password min 6 chars' });
  if (password.length > 72)
    return res.status(400).json({ error: 'Password max 72 chars' });

  // Email format tekshiruv
  if (!isValidEmail(email))
    return res.status(400).json({ error: 'Invalid email format' });

  // Username: 3–30 belgi, faqat harf/raqam/_ va XSS tozalash
  const cleanUsername = sanitize(username);
  if (cleanUsername.length < 3 || cleanUsername.length > 30)
    return res.status(400).json({ error: 'Username must be 3–30 chars' });
  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return res.status(400).json({ error: 'Username: only letters, numbers and _' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const cleanEmail = email.toLowerCase().trim();
    const user = await users.insertAsync({ username: cleanUsername, email: cleanEmail, password: hash, lang: lang || 'uz', created_at: new Date() });
    const token = jwt.sign({ id: user._id, username: cleanUsername, email: cleanEmail }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: cleanUsername, email: cleanEmail, lang: lang || 'uz' } });
  } catch (e) {
    if (e.errorType === 'uniqueViolated') {
      res.status(409).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'All fields required' });

  // Parol juda uzun bo'lsa bcrypt sekinlashadi — tekshiruv
  if (password.length > 72)
    return res.status(400).json({ error: 'Invalid credentials' });

  const user = await users.findOneAsync({ email: email.toLowerCase().trim() });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, username: user.username, email: user.email, lang: user.lang } });
});

router.get('/me', require('../middleware/auth'), async (req, res) => {
  const user = await users.findOneAsync({ _id: req.user.id });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user._id, username: user.username, email: user.email, lang: user.lang, created_at: user.created_at });
});

router.put('/lang', require('../middleware/auth'), async (req, res) => {
  const { lang } = req.body;
  if (!['uz', 'ru', 'en'].includes(lang)) return res.status(400).json({ error: 'Invalid lang' });
  await users.updateAsync({ _id: req.user.id }, { $set: { lang } });
  res.json({ success: true });
});

module.exports = router;
