const Movie = require('../models/movie');

const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { ValidationError } = require('../errors/ValidationError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { CREATED } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  console.log(req.body);
  Movie.create({ userId, ...req.body })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictError('Такая запись с фильмом уже существует.'));
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные при добавлении фильма.'));
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
        return next(new NotFoundError('Передан несуществующий _id фильма.'));
      }
      const userId = req.user._id.toString();
      const movieUserId = movie.owner._id.toString();

      if (userId !== movieUserId) return next(new ForbiddenError('Нельзя удалить чужой фильм.'));

      return removeMovie();
    })
    .catch(next);
};
