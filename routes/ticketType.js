const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../controller/auth');
const {
  createTicketType,
  readTicketTypeById,
  listTicketType,
  removeTicketType,
  updateTicketType,
} = require('../controller/ticketType');

router.get('/ticketType/:id', readTicketTypeById);

router.get('/ticketTypes', listTicketType);

router.post('/ticketType/create', isAuth, isAdmin, createTicketType);

router.delete('/ticketType/:id', isAuth, isAdmin, removeTicketType);

router.put('/ticketType/:id', isAuth, isAdmin, updateTicketType);

module.exports = router;
