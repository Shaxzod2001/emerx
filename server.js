require('dotenv').config(); // .env faylini yuklash (lokal ishlab chiqish uchun)
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const isLocal = process.env.USE_LOCAL_DB === 'true' || !process.env.MONGODB_URI;
if (!isLocal && !process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable topilmadi!');
  console.error('   Render Dashboard → Environment → MONGODB_URI ni qo\'shing');
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Noto'g'ri API yo'li — JSON qaytarsin (HTML emas)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API yo\'li topilmadi' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global xato handler — route'lardan KEYIN bo'lishi shart
app.use((err, req, res, next) => {
  console.error('Server xatosi:', err.message);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: 'Server ichki xatosi' });
  }
  res.status(500).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🛡️  EmerX Server running at http://localhost:${PORT}\n`);
});
