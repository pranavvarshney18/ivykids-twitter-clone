const express = require('express');
const router = express.Router();
const passport = require('passport');

let postController = require('../controllers/post_controller');

router.post('/create', passport.checkAuthentication, postController.create);

router.get('/destroy/:postId', passport.checkAuthentication, postController.destroy);

module.exports = router;