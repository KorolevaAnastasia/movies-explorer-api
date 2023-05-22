const mongoose = require('mongoose');
const { isUrl } = require('../utils/utils');

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
    validate: { validator: isUrl, message: 'Введите корректный URL' },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: 'Введите корректный URL' },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: 'Введите корректный URL' },
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