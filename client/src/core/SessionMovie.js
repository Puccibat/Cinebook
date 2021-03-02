import React, { useEffect, useState } from 'react';
import { getMovieById } from '../apiFetching';
import { getSessions } from '../apiFetching';

import {
  getEndDateOfWeek,
  getFirstDateOfWeek,
  getSessionNextWeek,
  getSessionPreviousWeek,
  formatDate,
} from '../commun/communDate';

const SessionMovie = ({ match }) => {
  const [movieItem, setMovieItem] = useState({});
  const [nextStep, setnextStep] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sessionSelected, setsessionSelected] = useState({
    places: '',
    session: null,
  });

  const [sessionFilters, setSessionFilters] = useState({
    beginDate: getFirstDateOfWeek(new Date()),
    endDate: getEndDateOfWeek(new Date()),
    movieId: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadSessions = async (initSessionFilters) => {
    const session = await getSessions(initSessionFilters);
    if (session) {
      setSessions(session);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadSingleMovie = async (movieId) => {
    const movie = await getMovieById(movieId);
    if (movie) {
      setMovieItem(movie);
      setSessionFilters({ ...sessionFilters, movieId: movie._id });
    }
  };

  const selectSessionHandler = (session) => {
    setsessionSelected({ ...sessionSelected, session });
  };

  const selectPlaceHandler = (event) => {
    let { name, value } = event.target;
    setsessionSelected({ ...sessionSelected, [name]: parseInt(value) });
  };

  useEffect(() => {
    if (!movieItem._id) {
      loadSingleMovie(match.params.movieId);
    } else {
      loadSessions(sessionFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.movieId, movieItem._id, sessionFilters]);

  const nextStepAction = () => {
    setnextStep(true);
  };
  if (nextStep) {
    console.log(sessionSelected);
    return <div>Next Step</div>;
  }
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
              <div key={session._id}>
                <button
                  className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'
                  onClick={() => selectSessionHandler(session)}
                >
                  {formatDate(new Date(session?.date))}
                </button>
                {session?.startTime}
              </div>
            ))
          : null}
      </div>
      {sessionSelected.session ? (
        <div className='text-center  py-8'>
          <label className=' text-white'>Combien de place ?</label>
          <input
            type='number'
            className='ml-3 w-10'
            value={sessionSelected.places}
            name='places'
            onChange={selectPlaceHandler}
          />
        </div>
      ) : null}
      {sessionSelected.places ? (
        <div className=' text-white text-center py-5'>
          <button
            className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'
            onClick={nextStepAction}
          >
            Valider
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SessionMovie;
