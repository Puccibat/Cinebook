import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTicketType } from '../api/apiTicketType';
import { isAuth } from '../api/ApiAuth';

const AddTicketType = () => {
  const { token } = isAuth();

  const initialTicketTypeState = {
    name: '',
    price: '',
    description: '',
  };
  const [ticketType, setTicketType] = useState(initialTicketTypeState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicketType({ ...ticketType, [name]: value });
  };

  const saveTicketType = async (event) => {
    event.preventDefault();
    const data = {
      name: ticketType.name,
      price: ticketType.price,
      description: ticketType.description,
    };

    const ticketTypeSaved = await createTicketType(token, data);
    if (ticketTypeSaved) {
      toast('Tarif enregistré', {
        draggable: true,
        style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
        position: toast.POSITION.TOP_CENTER,
      });
      setTicketType(initialTicketTypeState);
    } else {
      toast('Une erreur est survenue, veuillez recommencer', {
        draggable: true,
        style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-4xl text-center font-semibold'>Ajoutez un film</h1>

      <form onSubmit={saveTicketType}>
        <div className='grid grid-cols-4 pt-4 gap-2'>
          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Libellé du tarif:
          </label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={ticketType.name}
            name='name'
            placeholder='Ex: Tarif réduit'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Prix du tarif:
          </label>
          <input
            required
            min='1'
            type='number'
            onChange={handleInputChange}
            value={ticketType.price}
            name='price'
            placeholder='Ex: 4,50'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Description du tarif:
          </label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={ticketType.description}
            name='description'
            placeholder='Ex: Tarif élligible pour les enfants de moins de 12 ans...'
            className='p-2 rounded text-gray-900'
          />
        </div>
        <div className='text-center'>
          <button
            type='submit'
            className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'
          >
            Valider
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default AddTicketType;
