// Rossiya telefon raqamini +7XXXXXXXXXX ko'rinishiga normallashtiradi.
// Qabul qilinadi: +7XXXXXXXXXX, 8XXXXXXXXXX, 7XXXXXXXXXX, XXXXXXXXXX (10 xonali)
function normalizePhone(raw) {
  if (!raw) return null;
  const digits = String(raw).replace(/\D/g, '');
  let d = digits;

  if (d.length === 11 && (d[0] === '7' || d[0] === '8')) {
    d = '7' + d.slice(1);
  } else if (d.length === 10) {
    d = '7' + d;
  } else {
    return null;
  }

  if (!/^7\d{10}$/.test(d)) return null;
  return '+' + d;
}

module.exports = { normalizePhone };
