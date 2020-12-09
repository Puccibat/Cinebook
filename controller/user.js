const User = require('../model/User');

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.body = user;
    next();
  });
};

const readProfil = (req, res) => {
  return res.json('Welcome ' + req.body.name);
};

//const updateProfil = (req, res) => {};

module.exports = { userById, readProfil };
