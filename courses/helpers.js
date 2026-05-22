// Shared lesson builder — avoids repeating boilerplate
function lesson(id, titles, duration, contents, quizzes) {
  return { id, title: titles, duration, content: contents, quiz: quizzes };
}
function tri(uz, ru, en) { return { uz, ru, en }; }
module.exports = { lesson, tri };
