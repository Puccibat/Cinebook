const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createTicketType,
  ticketTypeById,
  readTicketType,
  removeTicketType,
  updateTicketType,
} = require('../controller/ticketType');

router.get('/ticketType/:ticketTypeId', readTicketType);

router.post('/ticketType/create', isAuth, isAdmin, createTicketType);

router.delete('/ticketType/:ticketTypeId', isAuth, isAdmin, removeTicketType);

router.put('/ticketType/:ticketTypeId', isAuth, isAdmin, updateTicketType);

router.param('ticketTypeId', ticketTypeById);

module.exports = router;
