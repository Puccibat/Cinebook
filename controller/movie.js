const Movie = require('../model/Movie');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

createMovie = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    let movie = new Movie(fields);

    if (files.poster) {
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

module.exports = { createMovie };
