const User = require('../models/user');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{    
        let newPost = Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log('new post created');
        return res.redirect('back');
    }
    catch(err){
        console.log('error in creating post', err);
        return res.redirect('back');
    }
}