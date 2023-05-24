const { INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERR_MSG } = require('../utils/constants');

module.exports.handleError = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : INTERNAL_SERVER_ERROR;
  const message = (statusCode === INTERNAL_SERVER_ERROR) ? INTERNAL_SERVER_ERR_MSG : err.message;
  res.status(statusCode).send({ message });
  next();
};
