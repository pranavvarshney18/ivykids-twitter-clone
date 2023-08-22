const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pranavvarshney18:QvrF3fNztj9DJnm5@cluster0.plgnm0r.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error coonnecting to mongoDB'));
db.once('open', () => {
    console.log('connected to database :: MongoDB');
});

module.exports = db;