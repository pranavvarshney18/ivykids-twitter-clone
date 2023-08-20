const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.use('/user', require('./user'));

router.get('/', homeController.home);

module.exports = router;