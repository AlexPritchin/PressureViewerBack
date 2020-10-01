const User = require('../models/user_model');

exports.getUserData = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw error;
    }
    const userForDataExtract = await User.findById(userId);
    if (!userForDataExtract) {
      let error = new Error('User with specified id not found');
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ email: userForDataExtract.email, name: userForDataExtract.name });
  } catch (error) {
    next(error);
  }
};
