const User = require('../models/user');
const Friendship = require('../models/friendship');
const Post = require('../models/post');

module.exports.toggleFriendship = async function(req, res){
    try{
        let removeFriend = false;
        let friendship = await User.findOne({
            _id: req.user.id,
            friends: req.params.friendId
        });

        let posts = null;
        let userIds = null;
        if(!friendship){
            //establish friendship
            let firstUser = await User.findById(req.user.id);
            let secondUser = await User.findById(req.params.friendId);
            
            firstUser.friends.push(secondUser._id);
            await firstUser.save();
            secondUser.friends.push(firstUser._id);
            await secondUser.save();

            let newFriend = await Friendship.create({
                from_user: firstUser._id,
                to_user: secondUser._id
            });

            //refresh posts of users with ajax
            userIds = await firstUser.friends;
            await userIds.push(req.user.id);
            posts = await Post.find({user: {$in: userIds}})
                                .sort('-createdAt')
                                .populate('user', 'name');

        }
        //remove friendship
        else{
            removeFriend = true;
            let existingFriendship = await Friendship.findOne({
                from_user: req.user.id,
                to_user: req.params.friendId
            });

            if(!existingFriendship){
                existingFriendship = await Friendship.findOne({
                    from_user: req.params.friendId,
                    to_user: req.user.id
                });
            }

            await existingFriendship.deleteOne();

            let firstUser = await User.findById(req.user.id);
            let secondUser = await User.findById(req.params.friendId);

            firstUser.friends.pull(secondUser._id);
            await firstUser.save();
            secondUser.friends.pull(firstUser._id);
            await secondUser.save();

            //refresh posts of users with ajax
            userIds = await firstUser.friends;
            await userIds.push(req.user.id);
            posts = await Post.find({user: {$in: userIds}})
                                .sort('-createdAt')
                                .populate('user', 'name');
        }

        
        
        
        //ajax request
        if(req.xhr){
            return res.status(200).json({
                data: {
                    removeFriend: removeFriend,
                    posts: posts,
                    userId: req.user.id
                },
                message: 'friendship toggled'
            });
        }

        return res.redirect('back');
    }
    catch(err){
        console.log('error in toggeling friendship ', err);
        return res.status(500).json({
            message: 'Internal server error / Unable to toggle friend request'
        });
    }
}