/**
 * Super-admin middleware — faqat ADMIN_PHONES ro'yxatidagi (asl) admin(lar)ga ruxsat.
 * Har doim adminAuth'dan KEYIN ishlatiladi (req.adminUser allaqachon o'rnatilgan bo'lishi kerak).
 */
const { t, getLang } = require('../lib/i18nServer');

const ADMIN_PHONES = (process.env.ADMIN_PHONES || '').split(',').map(p => p.trim()).filter(Boolean);

module.exports = function superAdminAuth(req, res, next) {
  const lang = getLang(req);
  if (!req.adminUser || !ADMIN_PHONES.includes(req.adminUser.phone)) {
    return res.status(403).json({ error: t('super_admin_only', lang) });
  }
  next();
};
