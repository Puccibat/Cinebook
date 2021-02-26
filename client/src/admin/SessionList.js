import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSessions, getEndDateOfWeek } from '../apiFetching';
import SessionCard from './SessionCard';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [currentWeek, setCurrentWeek] = useState({
    beginDate: new Date(),
    endDate: getEndDateOfWeek(new Date()),
  });

  const loadSessions = (specificWeek) => {
    getSessions(specificWeek).then((data) => {
      setSessions(data);
    });
  };

  const deleteSession = (sessionDeleted) => {
    setSessions(
      sessions.filter((session) => session._id !== sessionDeleted._id)
    );
  };

  const updateWeek = () => {
    let beginDayOfNextWeekCount = new Date(currentWeek.endDate);
    beginDayOfNextWeekCount.setDate(beginDayOfNextWeekCount.getDate() + 1);
    const specificWeek = {
      beginDate: beginDayOfNextWeekCount,
      endDate: getEndDateOfWeek(beginDayOfNextWeekCount),
    };
    setCurrentWeek(specificWeek);
    loadSessions(specificWeek);
  };

  useEffect(() => {
    loadSessions(currentWeek);
  }, [currentWeek]);

  const getFormatDateToString = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  return (
    <div className='text-center'>
      <h1 className='text-2xl text-white py-4'>Vos Séances programmées</h1>
      <div className=''>
        <button
          className=' inline-block rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'
          onClick={updateWeek}
        >
          Previous
        </button>
        <h2 className='inline-block text-xl text-white py-4 col-start-2 col-span-4'>
          Semaine du {getFormatDateToString(currentWeek?.beginDate)} au{' '}
          {getFormatDateToString(currentWeek?.endDate)}
        </h2>
        <button
          className='inline-block rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'
          onClick={updateWeek}
        >
          Next
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
                  deleteMovie={deleteSession}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SessionList;
