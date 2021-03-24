const express = require('express');
const router = express.Router();
const { createOrder } = require('../controller/order');

router.post('/order', createOrder);

module.exports = router;
