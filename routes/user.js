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

//Route for Signing Up
router.post('/create', userController.create);

//Route for Signin In
router.post('/create_session', userController.create_session);

router.get('/logout', userController.logout);

module.exports = router;