const express = require('express');
const router = express.Router();
const { isAuth } = require('../controller/auth');

router.get('/', isAuth, (req, res) => {
  res.json({
    posts: {
      title: 'Verify if token work',
      description: 'I think it is kindda work',
    },
  });
});

module.exports = router;
