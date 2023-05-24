const mongoose = require('mongoose');
const { isUrl } = require('../utils/utils');
const { VALID_DB_URL_ERR_MSG } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: VALID_DB_URL_ERR_MSG },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: VALID_DB_URL_ERR_MSG },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: VALID_DB_URL_ERR_MSG },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
