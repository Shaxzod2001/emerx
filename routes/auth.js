const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';

function sanitize(str) {
  return String(str).replace(/[<>&"'`]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;',
    '"': '&quot;', "'": '&#x27;', '`': '&#x60;'
  }[c])).trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// CAPTCHA: matematik savol + imzolangan token
router.get('/captcha', (req, res) => {
  try {
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
  } catch (e) {
    console.error('Captcha xatosi:', e.message);
    res.status(500).json({ error: 'Captcha yaratishda xato' });
  }
});

// RO'YXATDAN O'TISH
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, lang, captchaToken, captchaAnswer } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: 'Barcha maydonlarni to\'ldiring' });

    // CAPTCHA tekshiruv
    if (!captchaToken || captchaAnswer === undefined)
      return res.status(400).json({ error: 'CAPTCHA majburiy' });
    try {
      const decoded = jwt.verify(captchaToken, JWT_SECRET);
      if (parseInt(captchaAnswer) !== decoded.answer)
        return res.status(400).json({ error: 'CAPTCHA noto\'g\'ri, qaytadan urinib ko\'ring' });
    } catch {
      return res.status(400).json({ error: 'CAPTCHA muddati o\'tdi, yangi savol oling' });
    }

    if (password.length < 6)
      return res.status(400).json({ error: 'Parol kamida 6 belgi bo\'lishi kerak' });
    if (password.length > 72)
      return res.status(400).json({ error: 'Parol 72 belgidan oshmasligi kerak' });

    if (!isValidEmail(email))
      return res.status(400).json({ error: 'Email formati noto\'g\'ri' });

    const cleanUsername = sanitize(username);
    if (cleanUsername.length < 3 || cleanUsername.length > 30)
      return res.status(400).json({ error: 'Foydalanuvchi nomi 3–30 belgi bo\'lishi kerak' });
    if (!/^[a-zA-Z0-9_]+$/.test(username))
      return res.status(400).json({ error: 'Foydalanuvchi nomida faqat harf, raqam va _ bo\'lishi mumkin' });

    const hash = await bcrypt.hash(password, 10);
    const cleanEmail = email.toLowerCase().trim();
    const user = await users.insertAsync({
      username: cleanUsername,
      email: cleanEmail,
      password: hash,
      lang: lang || 'uz',
      coins: 0,
      created_at: new Date()
    });

    const token = jwt.sign(
      { id: user._id, username: cleanUsername, email: cleanEmail },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, username: cleanUsername, email: cleanEmail, lang: lang || 'uz' } });
  } catch (e) {
    if (e.errorType === 'uniqueViolated') {
      return res.status(409).json({ error: 'Bu username yoki email allaqachon mavjud' });
    }
    console.error('❌ Register xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi, qayta urinib ko\'ring' });
  }
});

// KIRISH
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email va parolni kiriting' });
    if (password.length > 72)
      return res.status(400).json({ error: 'Noto\'g\'ri ma\'lumotlar' });

    const user = await users.findOneAsync({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ error: 'Email yoki parol noto\'g\'ri' });

    if (user.isBanned) return res.status(403).json({ error: 'Hisobingiz bloklangan. Admin bilan bog\'laning.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Email yoki parol noto\'g\'ri' });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
    const isAdmin = user.isAdmin === true || adminEmails.includes((user.email || '').toLowerCase());
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, lang: user.lang, isAdmin }
    });
  } catch (e) {
    console.error('❌ Login xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi, qayta urinib ko\'ring' });
  }
});

// JORIY FOYDALANUVCHI
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await users.findOneAsync({ _id: req.user.id });
    if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    res.json({ id: user._id, username: user.username, email: user.email, lang: user.lang, coins: user.coins || 0 });
  } catch (e) {
    console.error('❌ /me xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// TIL O'ZGARTIRISH
router.put('/lang', require('../middleware/auth'), async (req, res) => {
  try {
    const { lang } = req.body;
    if (!['uz', 'ru', 'en'].includes(lang))
      return res.status(400).json({ error: 'Noto\'g\'ri til' });
    await users.updateAsync({ _id: req.user.id }, { $set: { lang } });
    res.json({ success: true });
  } catch (e) {
    console.error('❌ /lang xatosi:', e.message);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
