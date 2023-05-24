const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');
const { AUTH_SERVER_ERR_MSG, LOCAL_SECRET } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (next) => {
  next(new AuthError(AUTH_SERVER_ERR_MSG));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : LOCAL_SECRET);
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;
  return next();
};
