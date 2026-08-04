// Toshkent UTC+5 da yil bo'yi turadi (yozgi vaqtga o'tish yo'q), shuning uchun
// aniq offset bilan ISO satr qurish orqali ishonchli local-vaqt Date olamiz.
const TASHKENT_OFFSET = '+05:00';

function slotDate(dateStr, hhmm) {
  return new Date(`${dateStr}T${hhmm}:00${TASHKENT_OFFSET}`);
}

// Ish kunini breakDurationMinutes o'lchamidagi ketma-ket, bir-biriga
// ustma-ust tushmaydigan bo'laklarga (slotlarga) ajratadi.
function generateSlots(dateStr, workStart, workEnd, durationMinutes) {
  const start = slotDate(dateStr, workStart);
  const end = slotDate(dateStr, workEnd);
  const slots = [];
  let cursor = start;
  while (true) {
    const slotEnd = new Date(cursor.getTime() + durationMinutes * 60000);
    if (slotEnd > end) break;
    slots.push({ start: cursor, end: slotEnd });
    cursor = slotEnd;
  }
  return slots;
}

// Berilgan vaqt ichiga tushadigan slotning boshlanish vaqtini topadi (topilmasa null)
function findSlotStart(dateStr, workStart, workEnd, durationMinutes, at) {
  const slots = generateSlots(dateStr, workStart, workEnd, durationMinutes);
  const hit = slots.find(s => at >= s.start && at < s.end);
  return hit ? hit.start : null;
}

module.exports = { generateSlots, slotDate, findSlotStart };
