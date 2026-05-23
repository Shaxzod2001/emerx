/**
 * EmerX Database — aqlli adapter
 *
 * Production (Render):  MONGODB_URI bor → MongoDB Atlas
 * Local (MONGODB_URI yo'q yoki Atlas ulanmasa) → NeDB (fayl bazasi)
 */
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const USE_LOCAL_DB = !MONGODB_URI || process.env.USE_LOCAL_DB === 'true';

// ==================== MONGODB ATLAS ====================
let dbInstance = null;
let connectingPromise = null;

async function getDb() {
  if (dbInstance) return dbInstance;
  if (connectingPromise) return connectingPromise;

  connectingPromise = (async () => {
    try {
      const { MongoClient } = require('mongodb');
      const client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
        maxPoolSize: 10,
      });
      await client.connect();
      dbInstance = client.db('emerx');
      console.log('✅ MongoDB Atlas ga ulandi');
      return dbInstance;
    } catch (e) {
      connectingPromise = null;
      console.error('❌ MongoDB ulanish xatosi:', e.message);
      throw e;
    }
  })();

  return connectingPromise;
}

// ==================== NEDB (LOKAL) ====================
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

  // Indekslar
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

// ==================== MONGODB KOLLEKSIYA ====================
function makeMongoCollection(name, indexes = []) {
  // Indekslarni server start-da yaratish
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

// ==================== ADAPTERLARNI TANLASH ====================
const makeCollection = USE_LOCAL_DB ? makeNedbCollection : makeMongoCollection;

if (USE_LOCAL_DB) {
  console.log('📁 NeDB (lokal fayl bazasi) ishlatilmoqda — data/ papkasi');
} else {
  console.log('☁️  MongoDB Atlas ga ulanilmoqda...');
}

const users = makeCollection('users', [
  { fieldName: 'email', unique: true },
  { fieldName: 'username', unique: true },
]);

const progress = makeCollection('progress', [
  { fieldName: 'user_lesson', unique: true },
]);

const quizResults = makeCollection('quiz_results');

module.exports = { users, progress, quizResults, getDb: USE_LOCAL_DB ? null : getDb };
