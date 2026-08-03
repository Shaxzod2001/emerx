// Ichki event bus — breaks.js o'zgarishlarni server.js dagi socket.io ga yetkazadi
const { EventEmitter } = require('events');
module.exports = new EventEmitter();
