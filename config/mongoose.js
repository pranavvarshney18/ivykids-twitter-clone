const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ivykids_twitter_clone');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error coonnecting to mongoDB'));
db.once('open', () => {
    console.log('connected to database :: MongoDB');
});

module.exports = db;