const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

let dbInstance = null;
let connectingPromise = null;  // parallel ulanish muammosini oldini olish

async function getDb() {
  if (dbInstance) return dbInstance;

  // Agar ulanish jarayoni ketayotgan bo'lsa — kutib turamiz
  if (connectingPromise) return connectingPromise;

  connectingPromise = (async () => {
    try {
      const client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        maxPoolSize: 10,
      });
      await client.connect();
      dbInstance = client.db('emerx');
      console.log('✅ MongoDB Atlas ga ulandi');
      return dbInstance;
    } catch (e) {
      connectingPromise = null; // xato bo'lsa — qaytadan urinishga ruxsat
      console.error('❌ MongoDB ulanish xatosi:', e.message);
      throw e;
    }
  })();

  return connectingPromise;
}

// NeDB API bilan moslik — route fayllarida hech narsa o'zgarmaydi
function makeCollection(name, indexes = []) {
  // Indekslarni yaratish (server ishga tushganda)
  getDb().then(db => {
    indexes.forEach(({ fieldName, unique }) => {
      db.collection(name)
        .createIndex({ [fieldName]: 1 }, unique ? { unique: true } : {})
        .catch(() => {});
    });
  }).catch(console.error);

  return {
    // INSERT
    async insertAsync(doc) {
      const db = await getDb();
      const _id = new ObjectId().toString(); // NeDB kabi string ID
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

    // FIND ONE
    async findOneAsync(query) {
      const db = await getDb();
      return await db.collection(name).findOne(query);
    },

    // FIND MANY
    async findAsync(query) {
      const db = await getDb();
      return await db.collection(name).find(query).toArray();
    },

    // UPDATE
    async updateAsync(query, update) {
      const db = await getDb();
      return await db.collection(name).updateOne(query, update);
    },

    // COUNT
    async countAsync(query) {
      const db = await getDb();
      return await db.collection(name).countDocuments(query);
    },

    // NeDB moslik (hech narsa qilmaydi, indekslar yuqorida yaratilgan)
    ensureIndex(opts, cb) { if (cb) cb(null); }
  };
}

const users = makeCollection('users', [
  { fieldName: 'email', unique: true },
  { fieldName: 'username', unique: true },
]);

const progress = makeCollection('progress', [
  { fieldName: 'user_lesson', unique: true },
]);

const quizResults = makeCollection('quiz_results');

module.exports = { users, progress, quizResults, getDb };
