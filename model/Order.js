const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const TicketSchema = new mongoose.Schema(
  {
    ticketType: { type: ObjectId, ref: 'TicketType' },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', TicketSchema);

const orderSchema = new mongoose.Schema(
  {
    tickets: [ticketSchema],
    amount: {
      type: Number,
    },
    clientName: {
      type: ObjectId,
      ref: 'User',
    },
    movieTitle: {
      type: ObjectId,
      ref: 'Movie',
    },
    theaterName: {
      type: ObjectId,
      ref: 'Theater',
    },
    orderDate: {
      type: Date,
    },
    sessionDate: {
      type: ObjectId,
      ref: 'Session',
    },
    startTime: {
      type: ObjectId,
      ref: 'Movie',
    },
    transaction_id: {},
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, Ticket };
