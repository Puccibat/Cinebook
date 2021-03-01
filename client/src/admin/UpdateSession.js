import React, { useState, useEffect } from 'react';
import {
  updateSession,
  getSessionById,
  getMovies,
  getTheaters,
} from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

const UpdateSession = ({ match, history }) => {
  const { token } = isAuth();
  const initialSessionState = {
    movie: {},
    theater: {},
    date: '',
    startTime: '',
    endTime: '',
  };
  const [session, setSession] = useState(initialSessionState);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  const loadSession = async (sessionId) => {
    const sessionById = await getSessionById(sessionId);
    if (sessionById) {
      setSession(sessionById);
    }
  };

  const loadMovies = () => {
    getMovies().then((data) => {
      setMovies(data);
    });
  };

  const loadTheater = () => {
    getTheaters().then((data) => {
      setTheaters(data);
    });
  };

  useEffect(() => {
    const sessionId = match?.params?.sessionId;
    if (sessionId) {
      loadSession(sessionId);
      loadMovies();
      loadTheater();
    }
  }, [match?.params?.sessionId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSession({ ...session, [name]: value });
  };

  const getFormatDateToString = (dateToString) => {
    let date = new Date();
    if (dateToString !== '') {
      date = new Date(dateToString);
    }
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  };

  const saveSession = async () => {
    const data = {
      movie: session.movie,
      theater: session.theater,
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
    };

    const sessionSaved = await updateSession(
      token,
      match.params.sessionId,
      data
    );
    if (sessionSaved) {
      alert('Film modifié');
      setSession(initialSessionState);
      history.push('/sessionList');
    } else {
      alert('error');
    }
  };
  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-4xl text-center font-semibold'>
        Modifiez votre séance
      </h1>

      <div>
        <div className='grid grid-cols-2 pt-4 '>
          <label className='text-2xl font-semibold pt-6 mx-auto'>Film:</label>
          <select
            onChange={handleInputChange}
            value={session.movie?._id}
            name='movie'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          >
            <option>Sélectionnez un film</option>
            {movies &&
              movies.map((movie, index) => (
                <option key={index} value={movie._id}>
                  {movie.title}
                </option>
              ))}
          </select>

          <label className='text-2xl font-semibold pt-6 mx-auto'>Salle:</label>
          <select
            onChange={handleInputChange}
            value={session.theater?._id}
            name='theater'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          >
            <option>Sélectionnez une salle</option>
            {theaters &&
              theaters.map((theater, index) => (
                <option key={index} value={theater._id}>
                  {theater.name}
                </option>
              ))}
          </select>

          <label className='text-2xl font-semibold pt-6 mx-auto'>Date:</label>
          <input
            type='date'
            onChange={handleInputChange}
            value={getFormatDateToString(session.date)}
            name='date'
            placeholder='Ex: 120'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Heure de début:
          </label>
          <input
            type='time'
            onChange={handleInputChange}
            value={session.startTime}
            name='startTime'
            placeholder='Ex: Christoper Nolan'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Heure de fin:
          </label>
          <input
            type='time'
            onChange={handleInputChange}
            value={session.endTime}
            name='endTime'
            placeholder='Ex: Scarlett Johansson, Bruce Willis, ...'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />
        </div>
        <div className='text-center'>
          <button
            onClick={saveSession}
            className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSession;
