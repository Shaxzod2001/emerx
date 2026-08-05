// Web Push — VAPID kalitlari avtomatik generatsiya qilinadi va bazada saqlanadi
// (Render'da qo'lda environment variable qo'shish shart emas).
const webpush = require('web-push');
const { settings, pushSubscriptions, users } = require('../database');

// Eslatma: Mongo adapter insertAsync() har doim yangi _id generatsiya qiladi,
// shuning uchun VAPID hujjatini `key` maydoni orqali topamiz (_id emas) —
// aks holda har server qayta ishga tushganda yangi kalit yaratilib,
// eski obunalar ishlamay qolar edi.
const VAPID_KEY = 'vapid';
let ready = null;

async function init() {
  if (ready) return ready;
  ready = (async () => {
    let doc = await settings.findOneAsync({ key: VAPID_KEY });
    if (!doc) {
      const keys = webpush.generateVAPIDKeys();
      doc = await settings.insertAsync({ key: VAPID_KEY, publicKey: keys.publicKey, privateKey: keys.privateKey });
    }
    webpush.setVapidDetails('mailto:noreply@x5abet.app', doc.publicKey, doc.privateKey);
    return doc.publicKey;
  })();
  return ready;
}

async function getPublicKey() {
  return init();
}

async function sendToSubscription(sub, payload) {
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: sub.keys },
      JSON.stringify(payload)
    );
  } catch (e) {
    if (e.statusCode === 404 || e.statusCode === 410) {
      // Obuna eskirgan/o'chirilgan — bazadan tozalaymiz
      await pushSubscriptions.updateAsync({ _id: sub._id }, { $set: { active: false } }).catch(() => {});
    } else {
      console.error('push yuborish xatosi:', e.message);
    }
  }
}

async function sendToUser(userId, payload) {
  await init();
  const subs = await pushSubscriptions.findAsync({ userId });
  const active = subs.filter(s => s.active !== false);
  await Promise.all(active.map(s => sendToSubscription(s, payload)));
}

async function sendToAll(payload) {
  await init();
  const subs = await pushSubscriptions.findAsync({});
  const active = subs.filter(s => s.active !== false);
  await Promise.all(active.map(s => sendToSubscription(s, payload)));
}

// Chat kabi holatlar uchun: yozgan kishiga (u xabarni allaqachon ko'rgan) va
// hozir ilovada onlayn bo'lganlarga (socket orqali jonli oladi) push yubormaymiz —
// faqat oflayn foydalanuvchilarga.
async function sendToOfflineExcept(excludeUserId, onlineUserIds, payload) {
  await init();
  const online = new Set(onlineUserIds);
  const subs = await pushSubscriptions.findAsync({});
  const active = subs.filter(s => s.active !== false && s.userId !== excludeUserId && !online.has(s.userId));
  await Promise.all(active.map(s => sendToSubscription(s, payload)));
}

// Abetga chiqish/vaqti tugashi kabi hodisalarda barcha adminlarga xabar berish uchun
async function sendToAdmins(excludeUserId, payload) {
  await init();
  const allUsers = await users.findAsync({ isAdmin: true });
  const adminIds = new Set(
    allUsers.filter(u => !u._deleted && u._id !== excludeUserId).map(u => u._id)
  );
  if (!adminIds.size) return;
  const subs = await pushSubscriptions.findAsync({});
  const active = subs.filter(s => s.active !== false && adminIds.has(s.userId));
  await Promise.all(active.map(s => sendToSubscription(s, payload)));
}

module.exports = { getPublicKey, sendToUser, sendToAll, sendToOfflineExcept, sendToAdmins };
