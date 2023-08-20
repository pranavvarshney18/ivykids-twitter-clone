const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;