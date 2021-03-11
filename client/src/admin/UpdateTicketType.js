import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateTicketType, getTicketTypeById } from '../api/apiTicketType';
import { isAuth } from '../api/ApiAuth';

const UpdateTicketType = ({ match }) => {
  const { token } = isAuth();

  const initialTicketTypeState = {
    name: '',
    price: '',
    description: '',
  };
  const [ticketType, setTicketType] = useState(initialTicketTypeState);

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

  const saveTicketType = async () => {
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
      <h1 className='text-4xl text-center font-semibold'>
        Modifiez votre tarif
      </h1>

      <div>
        <div className='grid grid-cols-2 pt-4 '>
          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Nom du tarif:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={ticketType.name}
            name='name'
            placeholder='Ex: Salle 3'
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
            placeholder='Ex: La 6ème aventure des Avengers...'
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
            placeholder='Ex: Salle 3'
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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UpdateTicketType;
