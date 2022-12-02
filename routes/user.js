const express = require('express');
const router = express.Router();

//Importing User Controller
const userController = require('../controllers/user_controller');




//Default /users route
router.get('/', userController.default);

//Setting /profile route
router.get('/profile', userController.profile);

//Setting /profile/edit route
router.get('/profile/edit', userController.edit);

//Setting Signup for user
router.get('/signup', userController.signup);

//Setting Login for user
router.get('/login', userController.login);

module.exports = router;