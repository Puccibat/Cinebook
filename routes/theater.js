const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createTheater,
  readTheaterById,
  listTheater,
  removeTheater,
  updateTheater,
} = require('../controller/theater');

router.get('/theater/:id', readTheaterById);

router.get('/theaters', listTheater);

router.post('/theater/create', isAuth, isAdmin, createTheater);

router.delete('/theater/:id', isAuth, isAdmin, removeTheater);

router.put('/theater/:id', isAuth, isAdmin, updateTheater);

module.exports = router;
