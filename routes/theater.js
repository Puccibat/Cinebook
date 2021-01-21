const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createTheater,
  theaterById,
  readTheater,
  removeTheater,
  updateTheater,
  showImage,
} = require('../controller/theater');

router.get('/theater/:theaterId', readTheater);

router.post('/theater/create', isAuth, isAdmin, createTheater);

router.delete('/theater/:theaterId', isAuth, isAdmin, removeTheater);

router.put('/theater/:theaterId', isAuth, isAdmin, updateTheater);

router.get('/theater/image/:theaterId', showImage);

router.param('theaterId', theaterById);

module.exports = router;
