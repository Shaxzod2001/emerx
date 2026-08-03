/**
 * EmerX Database — aqlli adapter
 *
 * 1-ustuvor: MongoDB Atlas (agar MONGODB_URI bor va ulansa)
 * 2-ustuvor: NeDB (lokal fayl bazasi — Atlas ishlamasa yoki USE_LOCAL_DB=true)
 *
 * Render da Atlas ulanmasa avtomatik NeDB ga tushadi (ma'lumotlar sessiya davomida saqlanadi)
 */
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const FORCE_LOCAL = process.env.USE_LOCAL_DB === 'true';
const USE_LOCAL_DB = FORCE_LOCAL || !MONGODB_URI;

// ==================== NEDB ADAPTER ====================
function makeNedbCollection(name, indexes = []) {
  const Datastore = require('@seald-io/nedb');
  const path = require('path');
  const fs = require('fs');

  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const db = new Datastore({
    filename: path.join(dataDir, `${name}.db`),
    autoload: true,
  });

  indexes.forEach(({ fieldName, unique }) => {
    db.ensureIndex({ fieldName, unique: !!unique }, () => {});
  });

  return {
    async insertAsync(doc) {
      return new Promise((resolve, reject) => {
        db.insert(doc, (err, newDoc) => {
          if (err) {
            if (err.errorType === 'uniqueViolated' || err.message?.includes('unique')) {
              const e = new Error('uniqueViolated');
              e.errorType = 'uniqueViolated';
              return reject(e);
            }
            return reject(err);
          }
          resolve(newDoc);
        });
      });
    },
    async findOneAsync(query) {
      return new Promise((resolve, reject) => {
        db.findOne(query, (err, doc) => err ? reject(err) : resolve(doc));
      });
    },
    async findAsync(query) {
      return new Promise((resolve, reject) => {
        db.find(query, (err, docs) => err ? reject(err) : resolve(docs));
      });
    },
    async updateAsync(query, update) {
      return new Promise((resolve, reject) => {
        db.update(query, update, {}, (err, n) => err ? reject(err) : resolve(n));
      });
    },
    async countAsync(query) {
      return new Promise((resolve, reject) => {
        db.count(query, (err, n) => err ? reject(err) : resolve(n));
      });
    },
    ensureIndex(opts, cb) { db.ensureIndex(opts, cb); },
  };
}

// ==================== MONGODB ATLAS ADAPTER ====================
let dbInstance = null;
let connectingPromise = null;

async function getDb() {
  if (dbInstance) return dbInstance;
  if (connectingPromise) return connectingPromise;

  connectingPromise = (async () => {
    try {
      const { MongoClient } = require('mongodb');
      const maskedUri = MONGODB_URI
        ? MONGODB_URI.replace(/:([^:@]+)@/, ':***@')
        : '(yo\'q)';
      console.log(`🔗 MongoDB Atlas ulanilmoqda: ${maskedUri}`);

      const client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 10000,
        maxPoolSize: 10,
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
      });
      await client.connect();
      dbInstance = client.db('emerx');
      console.log('✅ MongoDB Atlas ga ulandi');
      return dbInstance;
    } catch (e) {
      connectingPromise = null;
      const hint = e.message.includes('ENOTFOUND') || e.message.includes('getaddrinfo')
        ? '→ DNS xatosi: MONGODB_URI noto\'g\'ri'
        : e.message.includes('Authentication')
        ? '→ Autentifikatsiya xatosi: login/parol noto\'g\'ri'
        : e.message.includes('timed out') || e.message.includes('ETIMEDOUT')
        ? '→ Atlas Network Access → 0.0.0.0/0 qo\'shing'
        : e.message.includes('SSL') || e.message.includes('ssl')
        ? '→ SSL/TLS xatosi: Atlas Network Access → 0.0.0.0/0 qo\'shing'
        : '→ ' + e.message;
      console.error(`❌ MongoDB Atlas xatosi: ${hint}`);
      throw new Error(hint);
    }
  })();

  return connectingPromise;
}

function makeMongoCollection(name, indexes = []) {
  getDb().then(db => {
    indexes.forEach(({ fieldName, unique }) => {
      db.collection(name)
        .createIndex({ [fieldName]: 1 }, unique ? { unique: true } : {})
        .catch(() => {});
    });
  }).catch(() => {});

  return {
    async insertAsync(doc) {
      const db = await getDb();
      const { ObjectId } = require('mongodb');
      const _id = new ObjectId().toString();
      const docWithId = { ...doc, _id };
      try {
        await db.collection(name).insertOne(docWithId);
        return docWithId;
      } catch (e) {
        if (e.code === 11000) {
          const err = new Error('uniqueViolated');
          err.errorType = 'uniqueViolated';
          throw err;
        }
        throw e;
      }
    },
    async findOneAsync(query) {
      const db = await getDb();
      return await db.collection(name).findOne(query);
    },
    async findAsync(query) {
      const db = await getDb();
      return await db.collection(name).find(query).toArray();
    },
    async updateAsync(query, update) {
      const db = await getDb();
      return await db.collection(name).updateOne(query, update);
    },
    async countAsync(query) {
      const db = await getDb();
      return await db.collection(name).countDocuments(query);
    },
    ensureIndex(opts, cb) { if (cb) cb(null); },
  };
}

// ==================== SMART FALLBACK ADAPTER ====================
// Atlas ulanmasa NeDB ga avtomatik tushadi

let atlasWorking = null; // null=test qilinmagan, true=ishlaydi, false=ishlamaydi

async function checkAtlas(force = false) {
  if (!force && atlasWorking !== null) return atlasWorking;
  // force=true yoki birinchi marta: qayta tekshir
  dbInstance = null;
  connectingPromise = null;
  try {
    await getDb();
    atlasWorking = true;
    return true;
  } catch {
    atlasWorking = false;
    console.warn('⚠️  Atlas ulanmadi → NeDB ishlatilmoqda');
    console.warn('   Atlas Network Access → 0.0.0.0/0 qo\'shing');
    return false;
  }
}

function makeSmartCollection(name, indexes = []) {
  const mongo = makeMongoCollection(name, indexes);
  const nedb = makeNedbCollection(name, indexes);

  async function pick() {
    const ok = await checkAtlas();
    return ok ? mongo : nedb;
  }

  return {
    async insertAsync(doc)         { return (await pick()).insertAsync(doc); },
    async findOneAsync(query)      { return (await pick()).findOneAsync(query); },
    async findAsync(query)         { return (await pick()).findAsync(query); },
    async updateAsync(query, upd)  { return (await pick()).updateAsync(query, upd); },
    async countAsync(query)        { return (await pick()).countAsync(query); },
    ensureIndex(opts, cb)          { nedb.ensureIndex(opts, cb); },
  };
}

// ==================== EKSPORT ====================
let users, breaks, settings;

if (USE_LOCAL_DB) {
  console.log('📁 NeDB (lokal) ishlatilmoqda — data/ papkasi');
  users    = makeNedbCollection('users', [{ fieldName: 'phone', unique: true }]);
  breaks   = makeNedbCollection('breaks');
  settings = makeNedbCollection('settings');
} else {
  console.log('☁️  MongoDB Atlas sinab ko\'rilmoqda, muvaffaqiyatsiz bo\'lsa NeDB...');
  users    = makeSmartCollection('users', [{ fieldName: 'phone', unique: true }]);
  breaks   = makeSmartCollection('breaks');
  settings = makeSmartCollection('settings');
}

module.exports = {
  users,
  breaks,
  settings,
  getDb: USE_LOCAL_DB ? null : getDb,
  checkAtlas: USE_LOCAL_DB ? null : checkAtlas,
};
