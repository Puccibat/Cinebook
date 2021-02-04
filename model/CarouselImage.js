const mongoose = require('mongoose');

const carouselImageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 128,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('CarouselImage', carouselImageSchema);
