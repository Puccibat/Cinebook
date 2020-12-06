const express = require('express');
const router = express.Router();
const { isAuth } = require('../controller/auth');
const { userById, readProfil } = require('../controller/user');

router.get('/user/:userId', isAuth, readProfil);

router.param('userId', userById);

module.exports = router;
