const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 256,
  },
  synopsis: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  duration: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 3,
  },
  director: {
    type: String,
    trim: true,
    required: true,
    maxlength: 128,
  },
  casting: {
    type: String,
    trim: true,
    required: true,
    maxlength: 1024,
  },
  genre: {
    type: String,
    trim: true,
    required: true,
    maxlength: 1024,
  },
  classification: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  poster: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
