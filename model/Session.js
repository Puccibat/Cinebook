const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const sessionSchema = new mongoose.Schema({
  movie: {
    type: ObjectId,
    ref: 'Movie',
    required: true,
  },
  theater: {
    type: ObjectId,
    ref: 'Theater',
    required: true,
  },
  date: {
    type: Date,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
