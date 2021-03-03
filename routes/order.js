const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const { createOrder } = require('../controller/order');

router.post('/order', isAuth, isAdmin, createOrder);

module.exports = router;
