const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendController = require('../controllers/friendship_controller');

router.post('/toggle-friendship/:friendId', passport.checkAuthentication, friendController.toggleFriendship);


module.exports = router;