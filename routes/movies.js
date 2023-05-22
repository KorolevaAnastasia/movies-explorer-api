const router = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movie');
const { validateCreateMovie } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:movieId', removeMovie);

module.exports = router;
