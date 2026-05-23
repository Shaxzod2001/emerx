/**
 * Admin middleware — faqat adminlarga ruxsat
 * ADMIN_EMAILS env orqali email ro'yxati belgilanadi
 */
const jwt = require('jsonwebtoken');
const { users } = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

module.exports = async function adminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ error: 'Avtorizatsiya kerak' });

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // DB dan admin statusini tekshirish
    const user = await users.findOneAsync({ _id: decoded.id });
    if (!user) return res.status(401).json({ error: 'Foydalanuvchi topilmadi' });

    const isAdmin = user.isAdmin === true || ADMIN_EMAILS.includes((user.email || '').toLowerCase());
    if (!isAdmin) return res.status(403).json({ error: 'Admin huquqi kerak' });

    req.adminUser = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token noto\'g\'ri' });
  }
};
