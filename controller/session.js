const { updateMovie } = require('../client/src/apiFetching');
const Session = require('../model/Session');

const sessionById = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};

const listSessions = async (req, res) => {
  const sessions = await Session.find({});
  res.json(sessions);
};

const createSession = async (req, res) => {
  const session = new Session({
    movie: req.body.movie,
    theater: req.body.theater,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  try {
    const createdSession = await session.save();
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json('There is an error, please try again');
  }
};

const removeSession = async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (session) {
    await session.remove();
    res.status(200).json({ message: 'Session removed' });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};

const updateSession = async (req, res) => {
  const { movie, theater, date, startTime, endTime } = req.body;

  const session = await Session.findById(req.params.id);

  if (session) {
    (session.movie = movie),
      (session.theater = theater),
      (session.date = date),
      (session.startTime = startTime),
      (session.endTime = endTime);

    const updateSession = await session.save();
    res.json(updateSession);
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};

module.exports = {
  sessionById,
  createSession,
  updateSession,
  removeSession,
  listSessions,
};
