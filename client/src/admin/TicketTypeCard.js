import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { removeTicketType } from '../api/apiTicketType';
import { isAuth } from '../api/ApiAuth';

const TicketTypeCard = ({ ticketType, deleteTicketType }) => {
  const { token } = isAuth();
  const [redirect, setRedirect] = useState(false);

  const destroy = async (ticketTypeId) => {
    const result = await removeTicketType(ticketTypeId, token);
    if (result === ticketTypeId) {
      deleteTicketType(result);
    } else {
      alert('Il y a une erreur');
    }
  };

  const redirectAction = () => {
    setRedirect(true);
  };
  if (redirect) {
    const url = `/updateTicketType/${ticketType._id}`;
    return <Redirect to={url} />;
  }

  return (
    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-full'>
      <div className='p-4 bg-white rounded-b-lg grid grid-cols-1'>
        <h5 className='text-sm text-gray-900 font-semibold tracking-widest mb-2 uppercase '>
          {ticketType.name}
        </h5>
        <button
          onClick={redirectAction}
          className='bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 i mt-4 rounded '
        >
          Modifier <i className='fas fa-pen'></i>
        </button>
        <button
          onClick={() => destroy(ticketType._id)}
          className='bg-red-800 hover:bg-red-600 text-white px-4 py-2  mt-4 rounded '
        >
          Supprimer <i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </div>
  );
};

export default TicketTypeCard;
