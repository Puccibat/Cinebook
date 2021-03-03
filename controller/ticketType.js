const TicketType = require('../model/TicketType');
const { updateMovie } = require('./movie');

//Ticket type by ID
const readTicketTypeById = async (req, res) => {
  const ticketType = await TicketType.findById(req.params.id);

  if (ticketType) {
    res.json(ticketType);
  } else {
    res.status(404).json({ message: 'Ticket type not found' });
  }
};

//List of ticket type
const listTicketType = async (req, res) => {
  const ticketTypes = await TicketType.find({});
  res.json(ticketTypes);
};

//Create a ticketType
const createTicketType = async (req, res) => {
  const ticketType = new TicketType({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  const createdTicketType = await ticketType.save();
  res.status(201).json(createdTicketType);
};

//Delete ticket type
const removeTicketType = async (req, res) => {
  const ticketTypeId = req.params.id;
  const ticketType = await TicketType.findById(ticketTypeId);

  if (ticketType) {
    await ticketType.remove();
    res.json({ message: 'Ticket type removed', ticketTypeId });
  } else {
    res.status(404).json({ message: 'Ticket type not found' });
  }
};

//Update ticket type
const updateTicketType = async (req, res) => {
  const { name, price, description } = req.body;

  const ticketType = await TicketType.findById(req.params.id);

  if (ticketType) {
    (ticketType.name = name),
      (ticketType.price = price),
      (ticketType.description = description);

    const updateTicketType = await ticketType.save();
    res.json(updateTicketType);
  } else {
    res.status(404).json({ message: 'Ticket type not found' });
  }
};

module.exports = {
  createTicketType,
  readTicketTypeById,
  listTicketType,
  removeTicketType,
  updateTicketType,
};
