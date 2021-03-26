import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateTicketType, getTicketTypeById } from '../api/apiTicketType';
import { isAuth } from '../api/ApiAuth';

const UpdateTicketType = ({ match }) => {
  const { token } = isAuth();

  const [ticketType, setTicketType] = useState('');

  const [loadTicketType, setLoadTicketType] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicketType({ ...ticketType, [name]: value });
  };

  if (loadTicketType) {
    getTicketTypeById(match?.params?.ticketTypeId)
      .then((ticketType) => {
        setTicketType(ticketType);
        setLoadTicketType(false);
      })
      .catch();
  }

  const saveTicketType = async (event) => {
    event.preventDefault();
    const data = {
      name: ticketType.name,
      price: ticketType.price,
      description: ticketType.description,
    };

    const ticketTypeSaved = await updateTicketType(
      token,
      match.params.ticketTypeId,
      data
    );
    if (ticketTypeSaved) {
      toast('Tarif enregistrée', {
        draggable: true,
        style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
        position: toast.POSITION.TOP_CENTER,
      });
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
      <h1 className='text-4xl text-center font-semibold'>
        Modifiez votre tarif
      </h1>

      <form onSubmit={saveTicketType}>
        <div className='grid grid-cols-4 gap-2 pt-4 '>
          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Nom du tarif:
          </label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={ticketType.name}
            name='name'
            placeholder='Ex: Salle 3'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Prix du tarif:
          </label>
          <input
            required
            type='number'
            min='1'
            onChange={handleInputChange}
            value={ticketType.price}
            name='price'
            placeholder='Ex: La 6ème aventure des Avengers...'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Description du tarif:
          </label>
          <textarea
            required
            type='text'
            onChange={handleInputChange}
            value={ticketType.description}
            name='description'
            placeholder='Ex: Salle 3'
            className='p-2 rounded text-gray-900 h-20'
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

export default UpdateTicketType;
