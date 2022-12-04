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



module.exports = passport;