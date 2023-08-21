const User = require('../models/user');

//sign-up for user
module.exports.create = async function(req, res){
    try{
        //check for password
        if(req.body.password != req.body['confirm-password']){
            console.log('passwords are not matching');
            req.flash('error', 'password and confirm password are not matching');
            return res.redirect('back');
        }

        //check if email is unique
        let user = await User.findOne({email: req.body.email});

        //if user already exist, do not create one
        if(user){
            req.flash('error', 'This user already exists');
            console.log('User already exists');
            return res.redirect('back');
        }
        //otherwise create new user and redirect to sign-in page
        else{
            let newUser = await User.create(req.body);
            req.flash('success', 'User created !!!');
            console.log('New user created!!!', newUser.name, newUser.email);
            return res.redirect('/user/sign-in');
        }
    }
    catch(err){
        req.flash('error', 'error in creating new user');
        console.log('error in creating new user', err);
        return res.redirect('back');
    }
}


module.exports.createSession = function(req, res){
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}


module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: 'sign-up'
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: 'sign-in'
    });
}


//sign out
module.exports.destroySession = function(req, res){
    //predefined function in passport
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'you have logged out');
        res.redirect('/user/sign-in');
    });

}