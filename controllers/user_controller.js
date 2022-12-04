const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('Users', {
        title : 'User Profile'
    });
};

module.exports.edit = function(req, res){
    return res.end('<h1>Edit your profile</h1>');
};

module.exports.default = function(req,res){
    return res.end('profile');
};

module.exports.signup = function(req, res){
    return res.render('SignUp', {
        title: 'Codesocial | SignUp'
    });
};

module.exports.login = function(req, res){
    return res.render('Login', {
        title: 'Codesocial | Login'
    });
};


// get the sign up data
module.exports.create = function(req, res){

    //First matching password and confirm password field
    //If it doesn't match then throw error 
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //Finding if user exists in the Database. 'User' is imported from models/user (i.e. the userSchema)
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/user/login');
            })
        }else{
            return res.redirect('back');
        }

    });
}

//Validating Sign In data
module.exports.create_session = function(req,res){
    return res.redirect('/');
}