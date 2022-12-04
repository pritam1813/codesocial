//mongoose module is a schema-based solution to model of the database Mongodb
const mongoose = require('mongoose');

//creating a schema for DB
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//declaring 'userSchema' as a mongoose model
const User = mongoose.model('User', userSchema);

module.exports = User;