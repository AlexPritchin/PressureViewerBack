const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user_model');

exports.signup = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
      const error = new Error('Validation failed');
      error.status = 422;
      error.data = validationErrors.array();
      throw error;
    }
    const newUserEmail = req.body.email;
    const newUserPassword = req.body.password;
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
