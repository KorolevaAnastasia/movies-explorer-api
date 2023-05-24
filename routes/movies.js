const router = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movie');
const { validateCreateMovie, validateRemoveMovie } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateRemoveMovie, removeMovie);

module.exports = router;
