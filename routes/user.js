const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const { userById, readProfil, updateProfil } = require('../controller/user');

// router.get('/admin', isAuth, isAdmin, (req, res) => {
//   res.json({
//     message: 'Welcome Admin',
//   });
// });

// router.get('/user/:userId', isAuth, readProfil);

//router.put('/user/:userId', isAuth, updateProfil);

// router.param('userId', userById);

module.exports = router;
