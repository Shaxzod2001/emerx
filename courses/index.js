const level1 = require('./level1');
const level2 = require('./level2');
const level3 = require('./level3');
const level4 = require('./level4');

const levelNames = {
  1: { uz: "Boshlang'ich", ru: "Начальный", en: "Beginner" },
  2: { uz: "O'rta daraja", ru: "Средний", en: "Intermediate" },
  3: { uz: "Ilg'or daraja", ru: "Продвинутый", en: "Advanced" },
  4: { uz: "Senior daraja", ru: "Senior", en: "Senior" },
};

function withMeta(courses) {
  return courses.map(c => ({ ...c, levelName: levelNames[c.level] }));
}

module.exports = [
  ...withMeta(level1),
  ...withMeta(level2),
  ...withMeta(level3),
  ...withMeta(level4),
];
