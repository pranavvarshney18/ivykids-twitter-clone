const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try{
        let userIds = await req.user.friends;
        await userIds.push(req.user.id);
        let posts = await Post.find({user: {$in: userIds}})
                              .sort('-createdAt')
                              .populate('user', 'name');

        let allUsers = await User.find()
                                 .sort({name: 'asc'});

        return res.render('home', {
            title: 'Twitter Clone',
            posts: posts,
            allUsers: allUsers
        });
    }
    catch(err){
        console.log('error in loading the posts', err);
        return res.end('<h4> Internal server error </h4>');
    }
}