const { required } = require('joi');
const Movie = require('../model/Movie');
const { getSessionsByMovieId } = require('./session');

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
    image: req.body.image,
  });
  try {
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(500).json('There is an error, please try again');
  }
};

//Delete movie
const removeMovie = async (req, res) => {
  const moviedeletedId = req.params.id;

  const sessionsAssociated = await getSessionsByMovieId(moviedeletedId);
  if (sessionsAssociated.length !== 0) {
    return res.status(403).json({
      message: 'Le film ne peux pas être supprimé car il est lié à une session',
      moviedeletedId,
    });
  }
  const movie = await Movie.findById(moviedeletedId);

  if (movie) {
    await movie.remove();
    res.status(200).json({ message: 'Movie removed', moviedeletedId });
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
    image,
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
      (movie.image = image);

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
