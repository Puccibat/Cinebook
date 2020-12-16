const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');
const {
  createTicketType,
  ticketTypeById,
  readTicketType,
  removeTicketType,
  updateTicketType,
} = require('../controller/ticketType');

router.get('/ticketType/:ticketTypeId', readTicketType);

router.post('/ticketType/create/:userId', isAuth, isAdmin, createTicketType);

router.delete(
  '/ticketType/:ticketTypeId/:userId',
  isAuth,
  isAdmin,
  removeTicketType
);

router.put(
  '/ticketType/:ticketTypeId/:userId',
  isAuth,
  isAdmin,
  updateTicketType
);

router.param('userId', userById);
router.param('ticketTypeId', ticketTypeById);

module.exports = router;
