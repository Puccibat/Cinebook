const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');
const { createMovie } = require('../controller/movie');

router.post('/movie/create/:userId', isAuth, isAdmin, userById, createMovie);

router.param('userId', userById);

module.exports = router;
