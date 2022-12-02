const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

//console.log("router loaded");
router.get('/',homeController.home);
router.get('/profile', homeController.profile);

//For users, setting '/users' route and mapping routes/user.js
router.use('/user', require('./user'));


module.exports = router;