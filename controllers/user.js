require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  CREATED,
  UNIQUE_USER_ERR_MSG,
  VALID_CREATE_USER_ERR_MSG,
  VALID_UPDATE_USER_ERR_MSG,
  NOTFOUND_USER_ERR_MSG,
  UNIQUE_UPDATE_USER_ERR_MSG,
} = require('../utils/constants');

const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { ValidationError } = require('../errors/ValidationError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.send({ jwt: token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictError(UNIQUE_USER_ERR_MSG));
      if (err.name === 'ValidationError') return next(new ValidationError(VALID_CREATE_USER_ERR_MSG));
      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) return next(new NotFoundError(NOTFOUND_USER_ERR_MSG));
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictError(UNIQUE_UPDATE_USER_ERR_MSG));
      if (err.name === 'ValidationError') return next(new ValidationError(VALID_UPDATE_USER_ERR_MSG));
      return next(err);
    });
};
