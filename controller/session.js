const Session = require('../model/Session');

const sessionById = (req, res, next, id) => {
  Session.findById(id).exec((err, session) => {
    if (err || !session) {
      return res.status(400).json({
        error: 'Session not found',
      });
    }
    req.session = session;
    next();
  });
};

const createSession = (req, res) => {
  const session = new Session(req.body.session);
  session.save((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.json(data);
  });
};

const readSession = () => {};

const updateSession = () => {};

const removeSession = () => {};

module.exports = {
  sessionById,
  createSession,
  readSession,
  updateSession,
  removeSession,
};
