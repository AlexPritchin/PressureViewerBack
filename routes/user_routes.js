const express = require('express');

const userController = require('../controllers/user_controller');
const isAuth = require('../middleware/auth_middleware');

const router = express.Router();

router.get('/data', isAuth, userController.getUserData);

module.exports = router;