const Movie = require('../models/movie');

const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const {
  CREATED,
  VALID_CREATE_MOVIE_ERR_MSG,
  NOTFOUND_MOVIE_ERR_MSG,
  FORBIDDEN_MOVIE_ERR_MSG,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.create({ owner: userId, ...req.body })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError(VALID_CREATE_MOVIE_ERR_MSG));
      return next(err);
    });
};

module.exports.removeMovie = (req, res, next) => {
  const removeMovie = () => {
    Movie.findByIdAndRemove(req.params.movieId)
      .then((movie) => res.send(movie))
      .catch(next);
  };

  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(NOTFOUND_MOVIE_ERR_MSG));
      }
      const userId = req.user._id.toString();
      const movieUserId = movie.owner._id.toString();

      if (userId !== movieUserId) return next(new ForbiddenError(FORBIDDEN_MOVIE_ERR_MSG));

      return removeMovie();
    })
    .catch(next);
};
