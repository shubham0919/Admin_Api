const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/uploadAPI');

const db = mongoose.connection;

db.on('error',console.error.bind(console.log('DB not Connected')));

db.once('open',() => {console.log('DB COnnected')});

module.exports = db;