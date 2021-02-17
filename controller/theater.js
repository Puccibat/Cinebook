const Theater = require('../model/Theater');

//Movie by ID
const readTheaterById = async (req, res) => {
  const theater = await Theater.findById(req.params.id);

  if (theater) {
    res.json(theater);
  } else {
    res.status(404).json({ message: 'Theater not found' });
  }
};

//List of theaters
const listTheater = async (req, res) => {
  const theaters = await Theater.find({});
  res.json(theaters);
};

//Create a theater
const createTheater = async (req, res) => {
  const theater = new Theater({
    name: req.body.name,
    seats: req.body.seats,
    image: req.body.image,
  });
  const createdTheater = await theater.save();
  res.status(201).json(createdTheater);
};

//Delete theater
const removeTheater = async (req, res) => {
  const theater = await Theater.findById(req.params.id);

  if (theater) {
    await theater.remove();
    res.json({ message: 'Theater removed' });
  } else {
    res.status(404).json({ message: 'Theater not found' });
  }
};

const updateTheater = async (req, res) => {
  const { name, seats, image } = req.body;

  const theater = await Theater.findById(req.params.id);

  if (theater) {
    (theater.name = name), (theater.seats = seats), (theater.image = image);

    const updateTheater = await theater.save();
    res.json(updateTheater);
  } else {
    res.status(404).json({ message: 'Theater not found' });
  }
};

module.exports = {
  createTheater,
  readTheaterById,
  listTheater,
  removeTheater,
  updateTheater,
};
