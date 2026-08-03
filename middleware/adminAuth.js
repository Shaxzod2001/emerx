/**
 * Admin middleware — faqat adminlarga ruxsat
 * ADMIN_PHONES env orqali telefon raqamlar ro'yxati belgilanadi (+7XXXXXXXXXX)
 */
const jwt = require('jsonwebtoken');
const { users } = require('../database');
const { t, getLang } = require('../lib/i18nServer');

const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';
const ADMIN_PHONES = (process.env.ADMIN_PHONES || '').split(',').map(p => p.trim()).filter(Boolean);

module.exports = async function adminAuth(req, res, next) {
  const lang = getLang(req);
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ error: t('auth_required', lang) });

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // DB dan admin statusini tekshirish
    const user = await users.findOneAsync({ _id: decoded.id });
    if (!user) return res.status(401).json({ error: t('user_not_found', lang) });

    const isAdmin = user.isAdmin === true || ADMIN_PHONES.includes(user.phone);
    if (!isAdmin) return res.status(403).json({ error: t('no_access', lang) });

    req.adminUser = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: t('token_invalid', lang) });
  }
};
