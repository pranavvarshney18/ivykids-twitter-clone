const Post = require('../models/post');

module.exports.home = async function(req, res){
    try{
        let posts = await Post.find()
                              .sort('-createdAt')
                              .populate('user', 'name');

        return res.render('home', {
            title: 'Twitter Clone',
            posts: posts
        });
    }
    catch(err){
        console.log('error in loading the posts', err);
        return res.end('<h4> Internal server error </h4>');
    }
}