const { settings } = require('../database');

// Eslatma: Mongo adapter insertAsync() har doim yangi _id generatsiya qiladi,
// shuning uchun bitta sozlama hujjatini `key` maydoni orqali topamiz (_id emas).
const SETTINGS_KEY = 'config';
const DEFAULTS = { breakDurationMinutes: 60, maxConcurrent: 3, workStart: '09:00', workEnd: '18:00' };

async function getSettings() {
  const doc = await settings.findOneAsync({ key: SETTINGS_KEY });
  if (!doc) return { ...DEFAULTS };
  return {
    breakDurationMinutes: doc.breakDurationMinutes || DEFAULTS.breakDurationMinutes,
    maxConcurrent: doc.maxConcurrent || DEFAULTS.maxConcurrent,
    workStart: doc.workStart || DEFAULTS.workStart,
    workEnd: doc.workEnd || DEFAULTS.workEnd,
  };
}

async function updateSettings({ breakDurationMinutes, maxConcurrent, workStart, workEnd }) {
  const existing = await settings.findOneAsync({ key: SETTINGS_KEY });
  const next = {
    breakDurationMinutes: breakDurationMinutes || (existing && existing.breakDurationMinutes) || DEFAULTS.breakDurationMinutes,
    maxConcurrent: maxConcurrent || (existing && existing.maxConcurrent) || DEFAULTS.maxConcurrent,
    workStart: workStart || (existing && existing.workStart) || DEFAULTS.workStart,
    workEnd: workEnd || (existing && existing.workEnd) || DEFAULTS.workEnd,
  };
  if (existing) {
    await settings.updateAsync({ key: SETTINGS_KEY }, { $set: next });
  } else {
    await settings.insertAsync({ key: SETTINGS_KEY, ...next });
  }
  return next;
}

// Moskva vaqti bo'yicha bugungi sana (YYYY-MM-DD)
function todayStr(date = new Date()) {
  return date.toLocaleDateString('en-CA', { timeZone: 'Europe/Moscow' });
}

module.exports = { getSettings, updateSettings, todayStr };
