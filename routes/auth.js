const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controller/auth');

router.post('/signup', signup);

module.exports = router;
