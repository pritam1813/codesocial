const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;

//Libraries for Session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-auth');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

dotenv.config();

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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
    },
    //using MongoStore to store the session-cookie into the db
    store: new MongoStore(
        {
            mongoUrl: process.env.MONGO_URI,
            autoRemove: 'disabled'
        },
        function(err){
        if(err){console.log(err || 'db connected Successfully')}
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});