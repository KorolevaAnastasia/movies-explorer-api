const express = require('express');

const routes = express.Router();
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/user');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');

routes.all('*', express.json());

routes.post('/signup', validateCreateUser, createUser);

routes.post('/signin', validateLogin, login);

routes.use('/users', auth, require('./users'));
routes.use('/movies', auth, require('./movies'));

routes.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { routes };
