const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  seats: {
    type: Number,
    required: true,
    maxlength: 3,
  },
  //Poster image
});

module.exports = mongoose.model('Theater', theaterSchema);
