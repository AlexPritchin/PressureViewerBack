const { validationResult, Result } = require('express-validator');

const errorsConstructor = require('../error');

exports.checkIfValidationErrorsOccured = req => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return errorsConstructor.getErrorWithStatusCodeAndData(
      'Validation failed',
      422,
      validationErrors.array()
    );
  }
  return null;
};
