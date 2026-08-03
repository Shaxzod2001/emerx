const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../database');
const { normalizePhone } = require('../lib/phone');
const { t, getLang } = require('../lib/i18nServer');

const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';
const ADMIN_PHONES = (process.env.ADMIN_PHONES || '').split(',').map(p => p.trim()).filter(Boolean);

function sanitize(str) {
  return String(str).replace(/[<>&"'`]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;',
    '"': '&quot;', "'": '&#x27;', '`': '&#x60;'
  }[c])).trim();
}

function isValidName(name) {
  const clean = String(name || '').trim();
  return clean.length >= 2 && clean.length <= 30 && /^[a-zA-Zа-яА-ЯёЁʻʼ'\- ]+$/.test(clean);
}

// CAPTCHA: matematik savol + imzolangan token
router.get('/captcha', (req, res) => {
  const lang = getLang(req);
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
    res.status(500).json({ error: t('server_error', lang) });
  }
});

function isAdminUser(user) {
  return user.isAdmin === true || ADMIN_PHONES.includes(user.phone);
}

// RO'YXATDAN O'TISH
router.post('/register', async (req, res) => {
  const lang = getLang(req);
  try {
    const { firstName, lastName, phone, password, captchaToken, captchaAnswer } = req.body;

    if (!firstName || !lastName || !phone || !password)
      return res.status(400).json({ error: t('fields_required', lang) });

    // CAPTCHA tekshiruv
    if (!captchaToken || captchaAnswer === undefined)
      return res.status(400).json({ error: t('captcha_required', lang) });
    try {
      const decoded = jwt.verify(captchaToken, JWT_SECRET);
      if (parseInt(captchaAnswer) !== decoded.answer)
        return res.status(400).json({ error: t('captcha_wrong', lang) });
    } catch {
      return res.status(400).json({ error: t('captcha_expired', lang) });
    }

    if (password.length < 6)
      return res.status(400).json({ error: t('password_short', lang) });
    if (password.length > 72)
      return res.status(400).json({ error: t('password_long', lang) });

    if (!isValidName(firstName) || !isValidName(lastName))
      return res.status(400).json({ error: t('name_invalid', lang) });

    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone)
      return res.status(400).json({ error: t('phone_invalid', lang) });

    const cleanFirstName = sanitize(firstName);
    const cleanLastName = sanitize(lastName);

    const hash = await bcrypt.hash(password, 10);
    const user = await users.insertAsync({
      firstName: cleanFirstName,
      lastName: cleanLastName,
      phone: normalizedPhone,
      password: hash,
      created_at: new Date()
    });

    const token = jwt.sign(
      { id: user._id, firstName: cleanFirstName, lastName: cleanLastName, phone: normalizedPhone },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: { id: user._id, firstName: cleanFirstName, lastName: cleanLastName, phone: normalizedPhone, isAdmin: isAdminUser(user) }
    });
  } catch (e) {
    if (e.errorType === 'uniqueViolated') {
      return res.status(409).json({ error: t('phone_taken', lang) });
    }
    console.error('❌ Register xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// KIRISH
router.post('/login', async (req, res) => {
  const lang = getLang(req);
  try {
    const { phone, password } = req.body;

    if (!phone || !password)
      return res.status(400).json({ error: t('fields_required', lang) });
    if (password.length > 72)
      return res.status(400).json({ error: t('login_wrong', lang) });

    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone)
      return res.status(400).json({ error: t('phone_invalid', lang) });

    const user = await users.findOneAsync({ phone: normalizedPhone });
    if (!user) return res.status(401).json({ error: t('login_wrong', lang) });

    if (user.isBanned) return res.status(403).json({ error: t('banned', lang) });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: t('login_wrong', lang) });

    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone, isAdmin: isAdminUser(user) }
    });
  } catch (e) {
    console.error('❌ Login xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

// JORIY FOYDALANUVCHI
router.get('/me', require('../middleware/auth'), async (req, res) => {
  const lang = getLang(req);
  try {
    const user = await users.findOneAsync({ _id: req.user.id });
    if (!user) return res.status(404).json({ error: t('user_not_found', lang) });
    res.json({ id: user._id, firstName: user.firstName, lastName: user.lastName, phone: user.phone, isAdmin: isAdminUser(user) });
  } catch (e) {
    console.error('❌ /me xatosi:', e.message);
    res.status(500).json({ error: t('server_error', lang) });
  }
});

module.exports = router;
