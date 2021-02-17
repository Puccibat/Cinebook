import React, { useState } from 'react';
import { createTicketType } from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

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

  const saveTicketType = async () => {
    const data = {
      name: ticketType.name,
      price: ticketType.price,
      description: ticketType.description,
    };

    const ticketTypeSaved = await createTicketType(token, data);
    if (ticketTypeSaved) {
      alert('Tarif ajouté');
      setTicketType(initialTicketTypeState);
    } else {
      alert('error');
    }
  };

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-4xl text-center font-semibold'>Ajoutez un film</h1>

      <div>
        <div className='grid grid-cols-2 pt-4 '>
          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Libellé du tarif:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={ticketType.name}
            name='name'
            placeholder='Ex: Tarif réduit'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Prix du tarif:
          </label>
          <input
            type='number'
            onChange={handleInputChange}
            value={ticketType.price}
            name='price'
            placeholder='Ex: 4,50'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Description du tarif:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={ticketType.description}
            name='description'
            placeholder='Ex: Tarif élligible pour les enfants de moins de 12 ans...'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />
        </div>
        <div className='text-center'>
          <button
            onClick={saveTicketType}
            className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTicketType;
