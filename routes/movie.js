const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');
const {
  createMovie,
  updateMovie,
  removeMovie,
  readMovie,
  movieById,
  list,
  poster,
} = require('../controller/movie');

router.get('/movie/:movieId', readMovie);

router.post('/movie/create/:userId', isAuth, isAdmin, userById, createMovie);

router.delete('/movie/:movieId/:userId', isAuth, isAdmin, removeMovie);

// router.put('/movie/:movieId/:userId', isAuth, isAdmin, updateMovie);

// router.get('/movies', list);

// router.get('/movie/poster/:movieId', poster);

router.param('userId', userById);
router.param('movieId', movieById);

module.exports = router;
