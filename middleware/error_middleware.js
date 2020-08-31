exports.errorHandler = (error, req, res, next) => {
  console.log(error);
  res
    .status(error.statusCode || 500)
    .json({ message: error.message, data: error.data });
};

exports.errorHandler404 = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};
