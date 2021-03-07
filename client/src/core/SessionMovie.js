import React, { useEffect, useState } from 'react';
import { getMovieById, getSessions } from '../apiFetching';
import {
  getEndDateOfWeek,
  getFirstDateOfWeek,
  getSessionNextWeek,
  getSessionPreviousWeek,
  formatDate,
} from '../commun/communDate';
import ValidationTable from './ValidationTable';

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
      setSessionFilters({ ...sessionFilters, movieId: movie._id });
      setMovieItem(movie);
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

  return (
    <div className='container my-5 mx-auto px-4 md:px-12'>
      {sessions.length === 0 ? (
        <h1 className='text-white text-center font-semibold py-8 mb-4 text-5xl'>
          Pas de séance pour {movieItem.title}
        </h1>
      ) : (
        <>
          {nextStep ? (
            <ValidationTable sessionSelected={sessionSelected} />
          ) : (
            <div>
              <div className='text-center '>
                <h1 className='text-white text-center font-semibold py-8 mb-4 text-5xl'>
                  Séances pour {movieItem.title}
                </h1>
                <div className='flex justify-around'>
                  <button
                    className='font-semibold rounded-md py-2 px-4 bg-gray-300 focus:outline-none'
                    onClick={() =>
                      getSessionPreviousWeek(setSessionFilters, sessionFilters)
                    }
                  >
                    Previous
                  </button>
                  <button
                    className='font-semibold rounded-md py-2 px-4 bg-gray-300 focus:outline-none'
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
                </div>

                {sessions
                  ? sessions.map((session) => (
                      <div key={session._id}>
                        <button
                          className=' text-white font-semibold rounded-md py-2 px-4 mt-6  bg-red-500 focus:outline-none'
                          onClick={() => selectSessionHandler(session)}
                        >
                          {formatDate(new Date(session?.date))}
                          <br />
                          {session?.startTime}
                        </button>
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
          )}
        </>
      )}
    </div>
  );
};

export default SessionMovie;
