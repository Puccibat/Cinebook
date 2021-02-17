import React from 'react';
import { Link } from 'react-router-dom';
import { removeTicketType } from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

const TicketTypeCard = ({ ticketType, deleteTicketType }) => {
  const { token } = isAuth();

  const destroy = (ticketTypeId) => {
    const ticketTypeRemoved = removeTicketType(ticketTypeId, token);
    if (ticketTypeRemoved) {
      alert('Tarif supprimé');
      deleteTicketType(ticketTypeRemoved);
    } else {
      alert('Il y a une erreur');
    }
  };

  return (
    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-full'>
      <div className='p-4 bg-white rounded-b-lg grid grid-cols-1'>
        <h5 className='text-sm text-gray-900 font-semibold tracking-widest mb-2 uppercase '>
          {ticketType.name}
        </h5>
        <button className='bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 i mt-4 rounded '>
          <Link to='/updateTheater'>
            Modifier <i className='fas fa-pen'></i>
          </Link>
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
