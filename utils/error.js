exports.getErrorWithStatusCodeAndData = (message, statusCode, data) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (data) {
    error.data = data;
  }
  return error;
};
