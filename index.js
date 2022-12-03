const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

const app = express();
const port = 8000;


app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//use express router
app.use('/', require('./routes'));


//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//app.set('view engine', 'pug');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});