const { updateMovie } = require('../client/src/apiFetching');
const Session = require('../model/Session');

const sessionById = async (req, res) => {
  const session = await Session.findById(req.params.sessionId)
    .populate('movie')
    .populate('theater');
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};

const listSessions2 = async (req, res) => {
  const sessions = await Session.find({}).populate('movie').populate('theater');
  res.json(sessions);
};

const listSessions = async (req, res) => {
  try {
    const { beginDate, endDate, movieId } = req.query;
    let filterSession = {};
    if (beginDate && endDate) {
      filterSession.date = {
        $gte: new Date(req.query?.beginDate),
        $lt: new Date(req.query?.endDate),
      };
    }
    if (movieId) {
      filterSession.movie = movieId;
    }
    const sessions = await Session.find(filterSession)
      .populate('movie')
      .populate('theater')
      .sort({ date: 1 })
      .sort({ startTime: 1 });
    res.json(sessions);
  } catch (e) {
    res.status(500).json('There is an error, please try again');
  }
};

const getSessionsByMovieId = async (movieId) => {
  try {
    const sessions = await Session.find({ movie: movieId });
    return sessions;
  } catch (e) {
    return null;
  } finally {
  }
};

const createSession = async (req, res) => {
  const { date, startTime, endTime } = req.body;
  const sessionDate = new Date(date);

  const session = new Session({
    movie: req.body.movie,
    theater: req.body.theater,
    date: sessionDate,
    startTime,
    endTime,
  });
  try {
    const createdSession = await session.save();
    res.status(201).json(createdSession);
  } catch (error) {
    res.status(500).json('There is an error, please try again');
  }
};

const removeSession = async (req, res) => {
  const sessionDeletedId = req.params.sessionId;
  const session = await Session.findById(sessionDeletedId);

  if (session) {
    await session.remove();
    res.status(200).json({ message: 'Session removed', sessionDeletedId });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};

const updateSession = async (req, res) => {
  try {
    const { movie, theater, date, startTime, endTime } = req.body;

    const session = await Session.findById(req.params.sessionId);

    const currentDate = new Date(date);
    console.log(startTime);
    console.log(endTime);
    console.log(currentDate);
    if (session) {
      session.movie = movie;
      session.theater = theater;
      session.date = currentDate;
      session.startTime = startTime;
      session.endTime = endTime;

      console.log(session);
      const updateSession = await session.save();
      res.json(updateSession);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (e) {
    //console.log(e);
    res.status(500).json({ message: 'server error' });
  }
};

module.exports = {
  sessionById,
  createSession,
  updateSession,
  removeSession,
  listSessions,
  getSessionsByMovieId,
};
