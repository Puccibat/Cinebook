import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTicketTypes } from '../apiFetching';
import TicketTypeCard from './TicketTypeCard';

const TicketTypeList = () => {
  const [ticketTypes, setTicketTypes] = useState([]);

  const loadTicketTypes = () => {
    getTicketTypes().then((data) => {
      setTicketTypes(data);
    });
  };

  const deleteTicketType = (ticketTypeDeleted) => {
    setTicketTypes(
      ticketTypes.filter((ticketType) => ticketType._id !== ticketTypeDeleted)
    );
    toast('Tarif supprimée', {
      draggable: true,
      style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    loadTicketTypes();
  }, []);

  return (
    <div className='text-center'>
      <ToastContainer />
      <h1 className='text-2xl text-white py-4'>Vos tarifs</h1>
      <button className='bg-green-600 hover:bg-green-400 text-white px-4 py-2  mt-4 rounded'>
        <Link to='/addTicketType'>
          Ajouter un tarif <i className='fas fa-plus-circle'></i>
        </Link>
      </button>
      <div className='container my-5 mx-auto px-4 md:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
          {ticketTypes.map((ticketType) => (
            <TicketTypeCard
              ticketType={ticketType}
              key={ticketType._id}
              deleteTicketType={deleteTicketType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketTypeList;
