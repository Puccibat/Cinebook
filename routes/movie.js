const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createMovie,
  updateMovie,
  removeMovie,
  readMovie,
  movieById,
  list,
  showPoster,
} = require('../controller/movie');

router.get('/movie/:movieId', readMovie);

router.post('/movie/create', isAuth, isAdmin, createMovie);

router.delete('/movie/:movieId', isAuth, isAdmin, removeMovie);

router.put('/movie/:movieId', isAuth, isAdmin, updateMovie);

// router.get('/movies', list);

router.get('/movie/poster/:movieId', showPoster);

router.param('movieId', movieById);

module.exports = router;
