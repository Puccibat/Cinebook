const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createSession,
  sessionById,
  readSession,
  removeSession,
  updateSession,
} = require('../controller/session');

router.get('/session/:sessionId', readSession);

router.post('/session/create', isAuth, isAdmin, createSession);

router.delete('/session/:sessionId', isAuth, isAdmin, removeSession);

router.put('/session/:sessionId', isAuth, isAdmin, updateSession);

router.param('sessionId', sessionById);

module.exports = router;
