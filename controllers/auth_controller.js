const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user_model');
const validationHelper = require('../utils/helpers/validation_helper');

exports.signup = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = validationErrors.array();
      throw error;
    }
    const newUserEmail = req.body.email;
    const newUserPassword = req.body.password;
    const newUserConfirmPassword = req.body.confirmPassword;
    if (newUserPassword != newUserConfirmPassword) {
      const error = new Error('Password and Confirm password must match');
      error.statusCode = 422;
      error.data = validationErrors.array();
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newUserPassword, 12);
    const newUser = User({
      email: newUserEmail,
      password: hashedPassword,
    });
    const result = await newUser.save();
    res.status(201).json({ message: 'User created', userId: result._id });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const validationError = validationHelper.checkIfValidationErrorsOccured(
      req
    );
    if (validationError) {
      throw validationError;
    }
    const emailForLogin = req.body.email;
    const passwordForLogin = req.body.password;
    const userToLogin = await User.findOne({ email: emailForLogin });
    if (!userToLogin) {
      const error = new Error('E-mail or password is incorrect');
      error.statusCode = 401;
      throw error;
    }
    const isPasswordsEqual = await bcrypt.compare(
      passwordForLogin,
      userToLogin.password
    );
    if (!isPasswordsEqual) {
      const error = new Error('E-mail or password is incorrect');
      error.statusCode = 401;
      throw error;
    }
    res
      .status(200)
      .json({
        message: 'Authorized',
        user: {
          id: userToLogin._id,
          email: userToLogin.email,
          name: userToLogin.name,
        },
      });
  } catch (error) {
    next(error);
  }
};
