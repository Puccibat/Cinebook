import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { removeTheater } from '../api/apiTheater';
import { isAuth } from '../api/ApiAuth';

const TheaterCard = ({ theater, deleteTheater }) => {
  const { token } = isAuth();
  const [redirect, setRedirect] = useState(false);

  const destroy = async (theaterId) => {
    const result = await removeTheater(theaterId, token);
    if (result === theaterId) {
      deleteTheater(result);
    } else {
      alert('Il y a une erreur');
    }
  };

  const redirectAction = () => {
    setRedirect(true);
  };
  if (redirect) {
    const url = `/updateTheater/${theater._id}`;
    return <Redirect to={url} />;
  }

  return (
    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-full'>
      <img
        src={theater.image}
        className='w-full lg:max-h-96'
        alt='Theater poster'
      />
      <div className='p-4 bg-white rounded-b-lg grid grid-cols-1'>
        <h5 className='text-sm text-gray-900 font-semibold tracking-widest mb-2 uppercase '>
          {theater.name}
        </h5>
        <button
          onClick={redirectAction}
          className='bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 i mt-4 rounded '
        >
          Modifier <i className='fas fa-pen'></i>
        </button>
        <button
          onClick={async () => destroy(theater._id)}
          className='bg-red-800 hover:bg-red-600 text-white px-4 py-2  mt-4 rounded '
        >
          Supprimer <i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </div>
  );
};

export default TheaterCard;
