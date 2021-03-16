const express = require('express');
const router = express.Router();
const { payment } = require('../controller/paymentIntents');

router.post('/payment', payment);

module.exports = router;
