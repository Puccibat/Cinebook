import React, { useEffect, useState } from 'react';
import { getMovieById } from '../apiFetching';
import { getSessions } from '../apiFetching';
import SessionCard from '../admin/SessionCard';

import {
  getEndDateOfWeek,
  getFirstDateOfWeek,
  getSessionNextWeek,
  getSessionPreviousWeek,
  formatDate,
} from '../commun/communDate';

const SessionMovie = ({ match }) => {
  const [movieItem, setMovieItem] = useState({});
  const [sessions, setSessions] = useState([]);
  const [sessionFilters, setSessionFilters] = useState({
    beginDate: getFirstDateOfWeek(new Date()),
    endDate: getEndDateOfWeek(new Date()),
    movieId: null,
  });
  const loadSessions = () => {
    getSessions(sessionFilters).then((data) => {
      setSessions(data);
    });
  };
  const loadSingleMovie = async (movieId) => {
    const movie = await getMovieById(movieId);
    if (movie) {
      setMovieItem(movie);
      setSessionFilters({ ...sessionFilters, movieId: movie._id });
    }
  };

  useEffect(() => {
    if (!movieItem._id) {
      const movieId = match.params.movieId;
      loadSingleMovie(movieId);
    } else {
      loadSessions();
    }
  }, [sessionFilters]);

  return (
    <div className='container my-5 mx-auto px-4 md:px-12'>
      {' '}
      <button
        className=' inline-block rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'
        onClick={() =>
          getSessionPreviousWeek(setSessionFilters, sessionFilters)
        }
      >
        Previous
      </button>
      <div className=' text-white text-center font-semibold mb-4 '>
        <h1 className='text-5xl'>Séances pour {movieItem.title}</h1>
      </div>
      <button
        className='inline-block rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'
        onClick={() =>
          getSessionNextWeek(
            setSessionFilters,
            getEndDateOfWeek,
            sessionFilters
          )
        }
      >
        Next
      </button>
      <div className='text-center py-8'>
        {sessions
          ? sessions.map((session) => (
              <div>
                <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
                  {formatDate(new Date(session?.date))}
                </button>
                {session?.startTime}
              </div>
            ))
          : null}
      </div>
      <div className='text-center text-white py-8'>
        <label>Combien de place ?</label>
        <input type='number' className='ml-3 w-10' />
      </div>
      <div className=' text-white text-center py-5'>
        <button className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'>
          Valider
        </button>
      </div>
    </div>
  );
};

export default SessionMovie;
