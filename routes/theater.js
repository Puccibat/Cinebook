const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');
const {
  createTheater,
  theaterById,
  readTheater,
  removeTheater,
  updateTheater,
  showImage,
} = require('../controller/theater');

router.get('/theater/:theaterId', readTheater);

router.post('/theater/create/:userId', isAuth, isAdmin, createTheater);

router.delete('/theater/:theaterId/:userId', isAuth, isAdmin, removeTheater);

router.put('/theater/:theaterId/:userId', isAuth, isAdmin, updateTheater);

router.get('/theater/image/:theaterId', showImage);

router.param('userId', userById);
router.param('theaterId', theaterById);

module.exports = router;
