import React, { Fragment, useEffect, useState } from 'react';
import { getMovieById } from '../api/apiMovie';
import { getSessions } from '../api/apiSession';
import {
  getEndDateOfWeek,
  getFirstDateOfWeek,
  getSessionNextWeek,
  getSessionPreviousWeek,
  formatDate,
} from '../commun/communDate';
import ValidationTable from './ValidationTable';
import CheckoutForm from './CheckoutForm';

const SessionMovie = ({ match }) => {
  const OrderStepEnum = {
    session: 'session',
    price: 'price',
    order: 'order',
  };
  const [movieItem, setMovieItem] = useState({});
  const [orderStep, setOrderStep] = useState(OrderStepEnum.session);
  const [orderBilling, setOrderBilling] = useState(OrderStepEnum.session);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(0);
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

  const activeHandler = (id) => setActiveSession(id);
  console.log(activeSession);

  const inactiveButton =
    'text-white font-semibold rounded-md py-2 px-4 mt-6  bg-red-500 focus:outline-none';

  const activeButton =
    'text-red-500 font-semibold rounded-md py-2 px-4 mt-6  bg-white focus:outline-none';

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

  const orderStepAction = (orderStep) => {
    setOrderStep(orderStep);
  };

  const selectPrice = () => {
    return (
      <ValidationTable
        sessionSelected={sessionSelected}
        orderStepAction={orderStepAction}
        setOrderBilling={setOrderBilling}
      />
    );
  };

  const selectSession = () => {
    return (
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

          {sessions ? (
            <div className='flex justify-around mt-3.5'>
              {' '}
              {sessions.map((session, index) => (
                <button
                  key={session._id}
                  className={
                    activeSession === session._id
                      ? activeButton
                      : inactiveButton
                  }
                  onClick={() =>
                    selectSessionHandler(session) & activeHandler(session._id)
                  }
                >
                  {formatDate(new Date(session?.date))}
                  <br />
                  {session?.startTime}
                </button>
              ))}
            </div>
          ) : null}
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
              onClick={() => orderStepAction(OrderStepEnum.price)}
            >
              Valider
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const selectOrder = () => {
    return <CheckoutForm orderBilling={orderBilling.order} />;
  };
  return (
    <div className='container my-5 mx-auto px-4 md:px-12'>
      {sessions.length === 0 ? (
        <h1 className='text-white text-center font-semibold py-8 mb-4 text-5xl'>
          Pas de séance pour {movieItem.title}
        </h1>
      ) : (
        <>
          {orderStep === OrderStepEnum.session ? selectSession() : null}
          {orderStep === OrderStepEnum.price ? selectPrice() : null}
          {orderStep === OrderStepEnum.order ? selectOrder() : null}
        </>
      )}
    </div>
  );
};

export default SessionMovie;
