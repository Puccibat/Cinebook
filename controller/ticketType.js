const TicketType = require('../model/TicketType');

const ticketTypeById = (req, res, next, id) => {
  ticketType.findById(id).exec((err, ticketType) => {
    if (err || !ticketType) {
      return res.status(400).json({
        error: 'Ticket type not found',
      });
    }
    req.ticketType = ticketType;
    next();
  });
};

const readTicketType = (req, res) => {
  return res.json(req.ticketType);
};

//Create a ticketType
const createTicketType = (req, res) => {
  const ticketType = new TicketType(req.body);
  ticketType.save((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.json({ data });
  });
};

const removeTicketType = (req, res) => {
  let ticketType = req.ticketType;
  ticketType.remove((err) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json({
      message: 'Ticket type deleted successfully',
    });
  });
};

const updateTicketType = (req, res) => {
  let ticketType = req.ticketType;

  ticketType.save((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.json(data);
  });
};

module.exports = {
  createTicketType,
  ticketTypeById,
  readTicketType,
  removeTicketType,
  updateTicketType,
};
