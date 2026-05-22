const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';

router.post('/register', async (req, res) => {
  const { username, email, password, lang } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields required' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Password min 6 chars' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await users.insertAsync({ username, email, password: hash, lang: lang || 'uz', created_at: new Date() });
    const token = jwt.sign({ id: user._id, username, email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username, email, lang: lang || 'uz' } });
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

  const user = await users.findOneAsync({ email });
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
