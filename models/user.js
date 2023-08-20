let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

let User = mongoose.model('User', userSchema);

module.exports = User;