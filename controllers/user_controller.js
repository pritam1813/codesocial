const User = require('../models/user');

module.exports.profile = function(req, res){
    //checking if user's cookie is present
    if(req.cookies.user_id){
        //if cookie is present then display user details
        User.findById(req.cookies.user_id, function(err, user){
            if(err){console.log('Error finding user'); return}

            if(user){
                return res.render('profile', {
                    title : user.name,
                    thisuser : user.email
                });
            }
            //if user not found
            return res.redirect('/user/login');
        });
    }else{
        //if cookie not present then redirect to login page
        return res.redirect('/user/login');
    }
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

    //finding user in the database with the email
    User.findOne({email : req.body.email}, function(err, user){
        //handling finding error
        if(err){console.log('Error finding user'); return}

        //If user is found then matching the password that exists
        if(user){
            
            if(user.password != req.body.password){
                //If password doesn't match then re-enter
                console.log('Wrong password');
                return res.redirect('back');
            }
            //If password matches then creating session
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        
        }else{
            //if user not found then redirecting to the page
            console.log('user not found');
            return res.redirect('back');
        }
        
        
    });
    
}

module.exports.logout = function(req, res){
    if(req.cookies.user_id){
        res.clearCookie(req.cookies.user_id, {domain: 'localhost', path :'/', expires: new Date(1)});
        return res.end();
    }
    return res.redirect('/user/login')
}