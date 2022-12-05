const express = require('express');
const router = express.Router();
const passport = require('passport');

//Importing User Controller
const userController = require('../controllers/user_controller');


//Default /users route
router.get('/', userController.default);

//Setting /profile route
router.get('/profile', passport.checkAuthentication , userController.profile);

//Setting /profile/edit route
router.get('/profile/edit', userController.edit);

//Setting Signup for user
router.get('/signup', passport.routeValidation, userController.signup);

//Setting Login for user
router.get('/login', passport.routeValidation, userController.login);

//Route for Signing Up
router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/login'}
) ,userController.create_session);

//Setting logout
router.get('/logout', userController.destroySession);

module.exports = router;