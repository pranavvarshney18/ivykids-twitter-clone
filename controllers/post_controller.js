const User = require('../models/user');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{    
        let newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log('new post created');

        //ajax
        if(req.xhr){
            newPost = await newPost.populate('user', 'name');
            return res.status(200).json({
                data:{
                    post: newPost
                },
                message: 'Post created!!!'
            });
        }

        return res.redirect('back');
    }
    catch(err){
        console.log('error in creating post', err);
        req.flash('error', 'error in creating new post');
        return res.redirect('back');
    }
}

//to delete a post
module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.postId);
        if(!post || post.user != req.user.id){
            console.log('this post does not exist');
            req.flash('error', 'unable to delete post');
            return res.redirect('back');
        }

        await post.deleteOne();
        
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id: req.params.postId
                },
                message: 'Post Deleted!!!'
            });
        }
        res.redirect('back');
    }
    catch(err){
        console.log('error in deleting the post', err);
        req.flash('error', 'error in deleting post');
        return res.redirect('back');
    }
}