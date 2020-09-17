const jwtoken = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
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
    if (!decodeduserToken) {
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
