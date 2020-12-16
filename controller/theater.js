const Theater = require('../model/Theater');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const theaterById = (req, res, next, id) => {
  Theater.findById(id).exec((err, theater) => {
    if (err || !theater) {
      return res.status(400).json({
        error: 'Theater not found',
      });
    }
    req.theater = theater;
    next();
  });
};

const readTheater = (req, res) => {
  req.theater.image = undefined;
  return res.json(req.theater);
};

//Create a theater
const createTheater = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    //All fields verification
    const { name, seats } = fields;

    if (!name || !seats) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let theater = new Theater(fields);

    if (files.image) {
      if (files.image.size > 5000000) {
        return res.status(400).json({
          error: 'Image should be less than 5Mb',
        });
      }
      theater.image.data = fs.readFileSync(files.image.path);
      theater.image.contenType = files.image.type;
    }

    theater.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

const removeTheater = (req, res) => {
  let theater = req.theater;
  theater.remove((err) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json({
      message: 'Theater deleted successfully',
    });
  });
};

const updateTheater = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let theater = req.theater;
    theater = _.extend(theater, fields);
    if (files.image) {
      if (files.image.size > 5000000) {
        return res.status(400).json({
          error: 'Image should be less than 5Mb',
        });
      }
      theater.image.data = fs.readFileSync(files.image.path);
      theater.image.contenType = files.image.type;
    }

    theater.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

const showImage = (req, res) => {
  if (req.theater.image.data) {
    res.set('Content-Type', req.theater.image.contentType);
    return res.send(req.theater.image.data);
  }
  next();
};

module.exports = {
  createTheater,
  theaterById,
  readTheater,
  removeTheater,
  updateTheater,
  showImage,
};
