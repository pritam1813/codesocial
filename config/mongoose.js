const dotenv = require('dotenv');
dotenv.config();
//require Library mongoose for connecting to a mongodb database
const mongoose = require('mongoose');

//using connect function to specify database
//For connecting using mongo hosted on local, use
//mongoose.connect('mongodb://localhost/codesocial_db');

mongoose.connect(process.env.MONGO_URI);

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