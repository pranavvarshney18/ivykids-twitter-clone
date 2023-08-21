const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toggleFriendship = async function(req, res){
    try{
        let removeFriend = false;
        let friendship = await User.findOne({
            _id: req.user.id,
            friends: req.params.friendId
        });


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

            existingFriendship.deleteOne();

            let firstUser = await User.findById(req.user.id);
            let secondUser = await User.findById(req.params.friendId);

            firstUser.friends.pull(secondUser._id);
            firstUser.save();
            secondUser.friends.pull(firstUser._id);
            secondUser.save();
        }
        
        //ajax request
        if(req.xhr){
            return res.status(200).json({
                data: {
                    removeFriend: removeFriend
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