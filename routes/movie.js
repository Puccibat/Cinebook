const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createMovie,
  updateMovie,
  removeMovie,
  readMovieById,
  listMovies,
} = require('../controller/movie');

router.get('/movie/:id', readMovieById);

router.get('/movies', listMovies);

router.post('/movie/create', isAuth, isAdmin, createMovie);

router.delete('/movie/:id', isAuth, isAdmin, removeMovie);

router.put('/movie/:id', isAuth, isAdmin, updateMovie);

module.exports = router;
