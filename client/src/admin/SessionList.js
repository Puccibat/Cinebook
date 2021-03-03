import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSessions } from '../apiFetching';
import SessionCard from './SessionCard';

import {
  getEndDateOfWeek,
  getFirstDateOfWeek,
  formatDate,
} from '../commun/communDate';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState({
    beginDate: getFirstDateOfWeek(new Date()),
    endDate: getEndDateOfWeek(new Date()),
  });

  const loadSessions = (specificWeek) => {
    getSessions(specificWeek).then((data) => {
      setSessions(data);
    });
    setLoading(false);
  };

  const deleteSession = (sessionDeleted) => {
    setSessions(
      sessions.filter((session) => session._id !== sessionDeleted._id)
    );
    toast('Séance supprimée', {
      draggable: true,
      style: { backgroundColor: 'rgba(239, 68, 68)' },
      position: toast.POSITION.TOP_CENTER,
    });
    setLoading(true);
  };

  const getSessionNextWeek = () => {
    let beginDayOfNextWeekCount = new Date(currentWeek.endDate);
    beginDayOfNextWeekCount.setDate(beginDayOfNextWeekCount.getDate() + 1);
    const specificWeek = {
      beginDate: beginDayOfNextWeekCount,
      endDate: getEndDateOfWeek(beginDayOfNextWeekCount),
    };
    setCurrentWeek(specificWeek);
  };

  const getSessionPreviousWeek = () => {
    let endDayOfCurrentWeek = new Date(currentWeek.beginDate);
    endDayOfCurrentWeek.setDate(currentWeek.beginDate.getDate() - 1);

    let firstDayOfCurrentWeek = new Date(endDayOfCurrentWeek);
    firstDayOfCurrentWeek.setDate(endDayOfCurrentWeek.getDate() - 6);
    const specificWeek = {
      beginDate: firstDayOfCurrentWeek,
      endDate: endDayOfCurrentWeek,
    };
    setCurrentWeek(specificWeek);
  };

  useEffect(() => {
    loadSessions(currentWeek);
  }, [loading, currentWeek]);

  return (
    <div className='text-center'>
      <ToastContainer />
      <h1 className='text-2xl text-white py-4'>Vos Séances programmées</h1>
      <div className=''>
        <button
          className=' inline-block rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'
          onClick={getSessionPreviousWeek}
        >
          Semaine précédente
        </button>
        <h2 className='inline-block text-xl text-white py-4 col-start-2 col-span-4'>
          Semaine du {formatDate(currentWeek?.beginDate)} au{' '}
          {formatDate(currentWeek?.endDate)}
        </h2>
        <button
          className='inline-block rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'
          onClick={getSessionNextWeek}
        >
          Semaine suivante
        </button>
      </div>

      <button className='bg-green-600 hover:bg-green-400 text-white px-4 py-2  mt-4 rounded'>
        <Link to='/addSession'>
          Ajouter une séance <i className='fas fa-plus-circle'></i>
        </Link>
      </button>
      <div className='container my-5 mx-auto px-4 md:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
          {sessions
            ? sessions.map((session) => (
                <SessionCard
                  session={session}
                  key={session._id}
                  deleteSession={deleteSession}
                  formatDate={formatDate}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SessionList;
