import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateSession, getSessionById } from '../api/apiSession';
import { getMovies } from '../api/apiMovie';
import { getTheaters } from '../api/apiTheater';
import { isAuth } from '../api/ApiAuth';

const UpdateSession = ({ match }) => {
  const { token } = isAuth();
  const [session, setSession] = useState('');
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

  const saveSession = async (event) => {
    event.preventDefault();
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
      toast('Séance modifiée', {
        draggable: true,
        style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast('Une erreur est survenue, veuillez recommencer', {
        draggable: true,
        style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-4xl text-center font-semibold'>
        Modifiez votre séance
      </h1>

      <form onSubmit={saveSession}>
        <div className='grid grid-cols-4 gap-2 pt-4 '>
          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Film:
          </label>
          <select
            required
            onChange={handleInputChange}
            value={session.movie?._id}
            name='movie'
            className='p-2 rounded text-gray-900'
          >
            <option>Sélectionnez un film</option>
            {movies &&
              movies.map((movie, index) => (
                <option key={index} value={movie._id}>
                  {movie.title}
                </option>
              ))}
          </select>

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Salle:
          </label>
          <select
            required
            onChange={handleInputChange}
            value={session.theater?._id}
            name='theater'
            className='p-2 rounded text-gray-900'
          >
            <option>Sélectionnez une salle</option>
            {theaters &&
              theaters.map((theater, index) => (
                <option key={index} value={theater._id}>
                  {theater.name}
                </option>
              ))}
          </select>

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Date:
          </label>
          <input
            required
            type='date'
            onChange={handleInputChange}
            value={getFormatDateToString(session.date)}
            name='date'
            placeholder='Ex: 24/04'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Heure de début:
          </label>
          <input
            required
            type='time'
            onChange={handleInputChange}
            value={session.startTime}
            name='startTime'
            placeholder='Ex: 12:00'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Heure de fin:
          </label>
          <input
            required
            type='time'
            onChange={handleInputChange}
            value={session.endTime}
            name='endTime'
            placeholder='Ex: 14:00'
            className='p-2 rounded text-gray-900'
          />
        </div>
        <div className='text-center'>
          <button
            type='submit'
            className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'
          >
            Valider
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default UpdateSession;
