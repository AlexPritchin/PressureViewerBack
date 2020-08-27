const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user_model');
const authController = require('../controllers/auth_controller');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email is invalid')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('User with such e-mail already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .isAlphanumeric(),
  ],
  authController.signup
);

module.exports = router;
