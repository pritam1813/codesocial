//require Library mongoose for connecting to a mongodb database
const mongoose = require('mongoose');

//using connect function to specify database
mongoose.connect('mongodb://127.0.0.1:27017/codesocial_db');

//db constant is used to check the connection
const db = mongoose.connection;

//If there is connection error then this message
db.on('error', console.error.bind(console, 'Error connecting to database'));

//If connection is succesful then this message
db.once('open', function(){
    console.log('Connected to Database Successfully');
});

//exporting the constant
module.exports = db;