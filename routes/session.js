const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createSession,
  sessionById,
  removeSession,
  updateSession,
  listSessions,
} = require('../controller/session');

router.get('/session/:sessionId', sessionById);

router.post('/session/create', isAuth, isAdmin, createSession);

router.get('./sessions', listSessions);
router.delete('/session/:sessionId', isAuth, isAdmin, removeSession);

router.put('/session/:sessionId', isAuth, isAdmin, updateSession);

module.exports = router;
