const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const dotenv = require('dotenv');
const app = express();
const port = 8000;

//Libraries for Session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-auth');

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

dotenv.config();


//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//app.set('view engine', 'pug');



app.use(session({
    name: 'Codesocial',
    secret: 'letitleavefornow',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});