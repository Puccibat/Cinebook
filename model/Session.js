const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const sessionSchema = new mongoose.Schema(
  {
    movie: {
      type: ObjectId,
      ref: 'Movie',
      name: String,
      required: true,
    },
    theater: {
      type: ObjectId,
      ref: 'Theater',
      name: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);
