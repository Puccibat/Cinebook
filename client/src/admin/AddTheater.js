import React, { useState } from 'react';
import { createTheater, uploadFileHandler } from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

const AddTheater = () => {
  const { token } = isAuth();

  const initialTheaterState = {
    name: '',
    seats: '',
  };
  const [theater, setTheater] = useState(initialTheaterState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTheater({ ...theater, [name]: value });
  };

  const handleInputImageChange = (event) => {
    const { name, files } = event.target;
    setTheater({ ...theater, [name]: files[0] });
  };
  const saveTheater = async () => {
    const urlImage = await uploadFileHandler(token, theater.image);
    console.log(urlImage);
    const data = {
      name: theater.name,
      seats: theater.seats,
      image: urlImage,
    };

    const theaterSaved = await createTheater(token, data);
    if (theaterSaved) {
      alert('Salle ajoutée');
      setTheater(initialTheaterState);
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
            Nom de la salle:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={theater.name}
            name='name'
            placeholder='Ex: Salle 3'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Nombre de siège:
          </label>
          <input
            type='number'
            onChange={handleInputChange}
            value={theater.seats}
            name='seats'
            placeholder='Ex: 120'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Photo de la salle:
          </label>
          <input
            type='file'
            onChange={handleInputImageChange}
            name='image'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />
        </div>
        <div className='text-center'>
          <button
            onClick={saveTheater}
            className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTheater;