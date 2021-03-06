const jwtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('No token specified');
      error.statusCode = 401;
      throw error;
    }
    const userToken = authHeader.split(' ')[1];
    if (!authHeader) {
        const error = new Error('Invalid token');
        error.statusCode = 401;
        throw error;
      }
    const decodedUserToken = jwtoken.verify(userToken, 'verysecrettoken');
    if (!decodedUserToken) {
        const error = new Error('Invalid token');
        error.statusCode = 401;
        throw error;
      }
    req.userId = decodedUserToken.userId;
    next();
  } catch (error) {
    next(error);
  }
};
