const Movie = require('../model/Movie');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const movieById = (req, res, next, id) => {
  Movie.findById(id).exec((err, movie) => {
    if (err || !movie) {
      return res.status(400).json({
        error: 'Movie not found',
      });
    }
    req.movie = movie;
    next();
  });
};

const readMovie = (req, res) => {
  req.movie.poster = undefined;
  return res.json(req.movie);
};

//Create a movie
const createMovie = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    //All fields verification
    const {
      title,
      synopsis,
      duration,
      director,
      casting,
      genre,
      classification,
      availability,
    } = fields;

    if (
      !title ||
      !synopsis ||
      !duration ||
      !director ||
      !casting ||
      !genre ||
      !classification ||
      !availability
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let movie = new Movie(fields);

    if (files.poster) {
      if (files.poster.size > 5000000) {
        return res.status(400).json({
          error: 'Image should be less than 5Mb',
        });
      }
      movie.poster.data = fs.readFileSync(files.poster.path);
      movie.poster.contenType = files.poster.type;
    }

    movie.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

const removeMovie = (req, res) => {
  let movie = req.movie;
  movie.remove((err) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json({
      message: 'Movie deleted successfully',
    });
  });
};

const updateMovie = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let movie = req.movie;
    movie = _.extend(movie, fields);
    if (files.poster) {
      if (files.poster.size > 5000000) {
        return res.status(400).json({
          error: 'Image should be less than 5Mb',
        });
      }
      movie.poster.data = fs.readFileSync(files.poster.path);
      movie.poster.contenType = files.poster.type;
    }

    movie.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

module.exports = {
  createMovie,
  movieById,
  readMovie,
  removeMovie,
  updateMovie,
};
