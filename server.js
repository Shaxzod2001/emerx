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
const jwt = require('jsonwebtoken');
const bus = require('./lib/bus');
const { messages, users, directMessages } = require('./database');

const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';

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

app.use('/api/auth',          require('./routes/auth'));
app.use('/api/breaks',        require('./routes/breaks'));
app.use('/api/profile',       require('./routes/profile'));
app.use('/api/admin',         require('./routes/admin'));
app.use('/api/announcements', require('./routes/announcements'));

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

// Admin yangi e'lon joylaganda/o'chirganda hamma clientga xabar beramiz
bus.on('announcements:changed', () => {
  io.emit('announcements:changed');
});

// ==================== CHAT — HAMMA FOYDALANUVCHILAR UCHUN UMUMIY + SHAXSIY ====================
const lastMessageTime = new Map(); // spam-dan himoya: userId -> oxirgi xabar vaqti
const lastDMTime = new Map();      // spam-dan himoya: userId -> oxirgi shaxsiy xabar vaqti
const RATE_LIMIT_MS = 3000;
const MAX_MSG_LENGTH = 300;
const HISTORY_COUNT = 100;

// userId -> socket.id lar to'plami — shaxsiy xabarni faqat ikkala tomonga yetkazish uchun
const userSockets = new Map();

function emitToUser(userId, event, payload) {
  const set = userSockets.get(userId);
  if (!set) return;
  for (const sid of set) io.to(sid).emit(event, payload);
}

io.on('connection', async (socket) => {
  let chatUser = null;
  const token = socket.handshake.auth?.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const dbUser = await users.findOneAsync({ _id: decoded.id });
      if (dbUser && !dbUser.isBanned && !dbUser._deleted) {
        chatUser = {
          id: decoded.id,
          fullName: `${dbUser.firstName} ${dbUser.lastName}`.trim(),
          isAdmin: !!dbUser.isAdmin,
        };
      }
    } catch {}
  }

  if (chatUser) {
    if (!userSockets.has(chatUser.id)) userSockets.set(chatUser.id, new Set());
    userSockets.get(chatUser.id).add(socket.id);
  }

  socket.on('disconnect', () => {
    if (!chatUser) return;
    const set = userSockets.get(chatUser.id);
    if (set) {
      set.delete(socket.id);
      if (!set.size) userSockets.delete(chatUser.id);
    }
  });

  try {
    const all = await messages.findAsync({});
    const history = all
      .filter(m => !m.deleted)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-HISTORY_COUNT);
    socket.emit('chat:history', history);
  } catch (e) {
    console.error('chat history xato:', e.message);
    socket.emit('chat:history', []);
  }

  socket.on('chat:send', async (text) => {
    if (!chatUser) {
      return socket.emit('chat:error', 'auth_required');
    }

    const now = Date.now();
    const last = lastMessageTime.get(chatUser.id) || 0;
    if (now - last < RATE_LIMIT_MS) {
      return socket.emit('chat:error', 'rate_limit');
    }

    if (!text || typeof text !== 'string') return;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_MSG_LENGTH) {
      return socket.emit('chat:error', 'invalid_length');
    }

    lastMessageTime.set(chatUser.id, now);

    try {
      const msg = await messages.insertAsync({
        userId: chatUser.id,
        fullName: chatUser.fullName,
        isAdmin: chatUser.isAdmin,
        text: trimmed,
        createdAt: new Date().toISOString(),
      });
      io.emit('chat:message', msg);
    } catch (e) {
      console.error('chat insert xato:', e.message);
      socket.emit('chat:error', 'server_error');
    }
  });

  socket.on('chat:delete', async (msgId) => {
    if (!chatUser) return;
    try {
      const dbUser = await users.findOneAsync({ _id: chatUser.id });
      if (!dbUser || !dbUser.isAdmin) return socket.emit('chat:error', 'no_access');

      await messages.updateAsync({ _id: msgId }, { $set: { deleted: true } });
      io.emit('chat:deleted', msgId);
    } catch (e) {
      console.error('chat delete xato:', e.message);
    }
  });

  // ==================== SHAXSIY XABARLAR (ikki foydalanuvchi orasida) ====================
  socket.on('dm:open', async (withUserId) => {
    if (!chatUser) return socket.emit('dm:error', 'auth_required');
    if (typeof withUserId !== 'string' || withUserId === chatUser.id) return;

    try {
      const target = await users.findOneAsync({ _id: withUserId });
      if (!target || target._deleted) return socket.emit('dm:error', 'not_found');

      const all = await directMessages.findAsync({
        $or: [
          { fromId: chatUser.id, toId: withUserId },
          { fromId: withUserId, toId: chatUser.id },
        ],
      });
      const history = all
        .filter(m => !m.deleted)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .slice(-HISTORY_COUNT);
      socket.emit('dm:history', { with: withUserId, messages: history });
    } catch (e) {
      console.error('dm:open xato:', e.message);
      socket.emit('dm:error', 'server_error');
    }
  });

  socket.on('dm:send', async (payload) => {
    if (!chatUser) return socket.emit('dm:error', 'auth_required');
    const to = payload?.to;
    const text = payload?.text;
    if (!to || typeof to !== 'string' || to === chatUser.id) return;

    if (!text || typeof text !== 'string') return;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_MSG_LENGTH) {
      return socket.emit('dm:error', 'invalid_length');
    }

    const now = Date.now();
    const last = lastDMTime.get(chatUser.id) || 0;
    if (now - last < RATE_LIMIT_MS) {
      return socket.emit('dm:error', 'rate_limit');
    }

    try {
      const target = await users.findOneAsync({ _id: to });
      if (!target || target._deleted) return socket.emit('dm:error', 'not_found');

      lastDMTime.set(chatUser.id, now);

      const msg = await directMessages.insertAsync({
        fromId: chatUser.id,
        toId: to,
        fromName: chatUser.fullName,
        text: trimmed,
        createdAt: new Date().toISOString(),
      });
      emitToUser(chatUser.id, 'dm:message', msg);
      emitToUser(to, 'dm:message', msg);
    } catch (e) {
      console.error('dm insert xato:', e.message);
      socket.emit('dm:error', 'server_error');
    }
  });

  socket.on('dm:delete', async (msgId) => {
    if (!chatUser) return;
    try {
      const msg = await directMessages.findOneAsync({ _id: msgId });
      if (!msg || msg.fromId !== chatUser.id) return socket.emit('dm:error', 'no_access');

      await directMessages.updateAsync({ _id: msgId }, { $set: { deleted: true } });
      const payload = { id: msgId, with: msg.toId };
      emitToUser(msg.fromId, 'dm:deleted', payload);
      emitToUser(msg.toId, 'dm:deleted', { id: msgId, with: msg.fromId });
    } catch (e) {
      console.error('dm delete xato:', e.message);
    }
  });
});

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
