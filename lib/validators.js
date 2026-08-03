function sanitize(str) {
  return String(str).replace(/[<>&"'`]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;',
    '"': '&quot;', "'": '&#x27;', '`': '&#x60;'
  }[c])).trim();
}

function isValidName(name) {
  const clean = String(name || '').trim();
  return clean.length >= 2 && clean.length <= 30 && /^[a-zA-Zа-яА-ЯёЁʻʼ'\- ]+$/.test(clean);
}

module.exports = { sanitize, isValidName };
