const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwtoken = require('jsonwebtoken');

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
    const newToken = jwtoken.sign({userId: userToLogin.id, email: userToLogin.email}, 'verysecrettoken', {expiresIn: '1h'});
    const newRefreshToken = jwtoken.sign({userId: userToLogin.id, email: userToLogin.email}, 'verysecretrefreshtoken', {expiresIn: '24h'});
    res
      .status(200)
      .json({
        message: 'Authorized',
        user: {
          id: userToLogin._id,
          email: userToLogin.email,
          name: userToLogin.name,
          token: newToken,
          refreshToken: newRefreshToken
        },
      });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = (req, res, next) => {
  try {
    const userRefreshToken = req.body.refreshToken;
    if (!userRefreshToken) {
      const error = new Error('No refresh token specified');
      error.statusCode = 401;
      throw error;
    }
    const decodedRefreshToken = jwtoken.verify(userRefreshToken, 'verysecretrefreshtoken');
    if (!decodedRefreshToken) {
      const error = new Error('Refresh token is invalid');
      error.statusCode = 401;
      throw error;
    }
    const newToken = jwtoken.sign({userId: decodedRefreshToken.userId, email: decodedRefreshToken.email}, 'verysecrettoken', {expiresIn: '1h'});
    res
      .status(200)
      .json({
        message: 'New token generated',
        token: newToken
      });
  } catch (error) {
    next(error);
  }
};