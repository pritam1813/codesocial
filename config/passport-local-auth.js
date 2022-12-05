const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//importing model from DB
const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStrategy({
        //Syntax for setting username
        usernameField: 'email'
    },
    function (email, password, done) {
        // find a user and establish the identity; first email is the emailField of passport and
        //second email is the user.email from the model
        User.findOne({email : email}, function(err, user){
            if(err){console.log('Error Findinh=g user'); return done(err);}

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                done(null, false);
            }

            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//creating funtion for checking Authentication to use as middleware 
passport.checkAuthentication = function(req, res, next){
    //if user is logged in
    if (req.isAuthenticated()){
        return next();
    }

    //if user is not logged in
    return res.redirect('/user/login');
};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie, sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
};

passport.routeValidation = function(req, res, next){
    //if user is logged in
    if (req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    //if user is not logged in
    return next();
};

module.exports = passport;