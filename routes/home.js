const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');

router.use('/user', require('./user'));
router.use('/post', require('./post'));

router.get('/', passport.checkAuthentication, homeController.home);

module.exports = router;