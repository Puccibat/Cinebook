const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    tickets: [{ type: ObjectId, ref: 'TicketType' }],
    clientName: {
      type: ObjectId,
      ref: 'User',
    },
    session: {
      type: ObjectId,
      ref: 'Session',
    },
    transaction_id: {},
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
