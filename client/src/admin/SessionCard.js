import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { removeSession } from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

const SessionCard = ({ session, deleteSession, formatDate }) => {
  const { token } = isAuth();
  const [redirect, setRedirect] = useState(false);

  const destroy = async (sessionId) => {
    const sessionRemoved = await removeSession(sessionId, token);
    if (sessionRemoved) {
      alert(`La séance a été supprimé avec succès`);
      deleteSession(sessionRemoved);
    } else {
      alert('Il y a une erreur');
    }
  };

  const redirectAction = () => {
    setRedirect(true);
  };
  if (redirect) {
    const url = `/updateSession/${session._id}`;
    return <Redirect to={url} />;
  }
  return (
    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-full'>
      <img
        src={session.movie?.image}
        className='w-full lg:max-h-96'
        alt='Movie poster'
      />
      <div className='p-4 bg-white rounded-b-lg grid grid-cols-1'>
        <h5 className='text-sm text-gray-900 font-semibold tracking-widest mb-2 uppercase '>
          {session.movie?.title}
        </h5>
        <h5 className='text-sm text-gray-900 font-semibold tracking-widest mb-2 uppercase '>
          {session.theater?.name}
        </h5>
        <h5 className='text-sm text-gray-900 font-semibold tracking-widest mb-2 uppercase '>
          {formatDate(new Date(session?.date))}
        </h5>

        <button
          onClick={redirectAction}
          className='bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 i mt-4 rounded '
        >
          Modifier <i className='fas fa-pen'></i>
        </button>
        <button
          onClick={async () => destroy(session._id)}
          className='bg-red-800 hover:bg-red-600 text-white px-4 py-2  mt-4 rounded '
        >
          Supprimer <i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
