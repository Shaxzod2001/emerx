const Datastore = require('@seald-io/nedb');
const path = require('path');

const dbPath = p => path.join(__dirname, 'data', p);

const users = new Datastore({ filename: dbPath('users.db'), autoload: true });
const progress = new Datastore({ filename: dbPath('progress.db'), autoload: true });
const quizResults = new Datastore({ filename: dbPath('quiz_results.db'), autoload: true });

// Unique indexes
users.ensureIndex({ fieldName: 'email', unique: true }, () => {});
users.ensureIndex({ fieldName: 'username', unique: true }, () => {});
progress.ensureIndex({ fieldName: 'user_lesson', unique: true }, () => {});

module.exports = { users, progress, quizResults };
