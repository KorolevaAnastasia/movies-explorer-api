const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/utils');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required().min(1).max(120),
    nameEN: Joi.string().required().min(1).max(120),
    country: Joi.string().required().min(1).max(120),
    director: Joi.string().required().min(1).max(120),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(1).max(1000),
    image: Joi.string().required().pattern(regExp),
    trailerLink: Joi.string().required().pattern(regExp),
    thumbnail: Joi.string().required().pattern(regExp),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateUpdateUserProfile, validateCreateMovie, validateLogin, validateCreateUser,
};
