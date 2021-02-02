const Movie = require('../model/Movie');

//Movie by ID
const readMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

//List of movies
const listMovies = async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
};

//Create a movie
const createMovie = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    synopsis: req.body.synopsis,
    duration: req.body.duration,
    director: req.body.director,
    casting: req.body.casting,
    genre: req.body.genre,
    classification: req.body.classification,
    availability: req.body.availability,
    poster: req.body.poster,
  });
  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
};

//Delete movie
const removeMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.remove();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

//update movie
const updateMovie = async (req, res) => {
  const {
    title,
    synopsis,
    duration,
    director,
    casting,
    genre,
    classification,
    availability,
    poster,
  } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    (movie.title = title),
      (movie.synopsis = synopsis),
      (movie.duration = duration),
      (movie.director = director),
      (movie.casting = casting),
      (movie.genre = genre),
      (movie.classification = classification),
      (movie.availability = availability),
      (movie.poster = poster);

    const updateMovie = await movie.save();
    res.json(updateMovie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

module.exports = {
  createMovie,
  listMovies,
  removeMovie,
  updateMovie,
  readMovieById,
};
