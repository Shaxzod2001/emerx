const jwt = require('jsonwebtoken');
const { t, getLang } = require('../lib/i18nServer');
const JWT_SECRET = process.env.JWT_SECRET || 'emerx_secret_2024';

module.exports = function(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  const lang = getLang(req);
  if (!token) return res.status(401).json({ error: t('no_token', lang) });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: t('token_invalid', lang) });
  }
};
