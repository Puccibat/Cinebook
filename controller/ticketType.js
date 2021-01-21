const TicketType = require('../model/TicketType');

const ticketTypeById = (req, res, next, id) => {
  TicketType.findById(id).exec((err, ticketType) => {
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
  const ticketType = req.ticketType;
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
  const ticketType = req.ticketType;
  ticketType.name = req.body.name;
  ticketType.description = req.body.description;
  ticketType.price = req.body.price;

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
