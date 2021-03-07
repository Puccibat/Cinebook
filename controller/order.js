const Order = require('../model/Order');

//Create a order
const createOrder = async (req, res) => {
  try {
    const { session, tickets, clientName, transactionId } = req.body;
    const newOrder = new Order({
      tickets,
      session,
      clientName,
      transactionId,
    });

    const orderCreated = await newOrder.save();
    res.status(201).json(orderCreated);
  } catch (e) {
    console.error(e);
    res.status(500).json('There is an error, please try again');
  }
};

module.exports = {
  createOrder,
};
