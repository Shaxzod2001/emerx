require('dotenv').config(); // .env faylini yuklash (lokal ishlab chiqish uchun)

// Render + Atlas TLS moslik uchun (SSL alert 80 xatosi)
if (process.env.NODE_ENV !== 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const bus = require('./lib/bus');

const app = express();
const server = http.createServer(app);
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

app.use('/api/auth',    require('./routes/auth'));
app.use('/api/breaks',  require('./routes/breaks'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/admin',   require('./routes/admin'));

// ==================== SOCKET.IO — ABET HOLATI JONLI YANGILANISHI ====================
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// breaks.js dagi o'zgarishlar (start/end/settings) sodir bo'lganda hamma clientga xabar beramiz
bus.on('breaks:changed', () => {
  io.emit('breaks:changed');
});

io.on('connection', () => {});

// Diagnostika — Node.js versiyasi va Atlas xato
app.get('/api/diag', async (req, res) => {
  const crypto = require('crypto');
  const info = {
    node: process.version,
    openssl: crypto.constants ? process.versions.openssl : 'unknown',
    platform: process.platform,
    mongoUri: process.env.MONGODB_URI
      ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':***@').substring(0, 60) + '...'
      : 'YO\'Q!',
    tlsReject: process.env.NODE_TLS_REJECT_UNAUTHORIZED,
  };

  // Atlas ga to'g'ridan-to'g'ri ulanib xatoni ko'rish
  try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 6000,
      connectTimeoutMS: 6000,
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
    });
    await client.connect();
    await client.close();
    info.atlasTest = 'OK - ulandi!';
  } catch (e) {
    info.atlasTest = 'XATO: ' + e.message.substring(0, 200);
  }

  res.json(info);
});

// Health check — DB ulanish holati
app.get('/api/health', async (req, res) => {
  const { getDb, checkAtlas } = require('./database');
  const isLocal = process.env.USE_LOCAL_DB === 'true' || !process.env.MONGODB_URI;
  const info = { status: 'ok', time: new Date().toISOString() };

  if (isLocal) {
    info.db = 'nedb-local';
    info.dbStatus = 'ok';
  } else if (checkAtlas) {
    try {
      const force = req.query.retry === '1';
      const ok = await checkAtlas(force);
      if (ok) {
        info.db = 'mongodb-atlas';
        info.dbStatus = 'connected';
      } else {
        info.db = 'nedb-fallback';
        info.dbStatus = 'atlas-unreachable';
        info.hint = 'Atlas Network Access → 0.0.0.0/0 qo\'shing';
        info.status = 'degraded';
      }
    } catch (e) {
      info.db = 'nedb-fallback';
      info.dbStatus = 'error';
      info.dbError = e.message;
      info.status = 'degraded';
    }
  }
  res.json(info);
});

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

server.listen(PORT, () => {
  console.log(`\n🕐 EmerX Abet Nazorati serveri ishga tushdi: http://localhost:${PORT}\n`);
});
