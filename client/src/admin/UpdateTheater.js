import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateTheater, getTheaterById } from '../api/apiTheater';
import { uploadFileHandler } from '../api/apiUpload';
import { isAuth } from '../api/ApiAuth';

const UpdateTheater = ({ match }) => {
  const { token } = isAuth();

  const [theater, setTheater] = useState('');

  const [loadTheater, setLoadTheater] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTheater({ ...theater, [name]: value });
  };

  if (loadTheater) {
    getTheaterById(match?.params?.theaterId)
      .then((theater) => {
        setTheater(theater);
        setLoadTheater(false);
      })
      .catch();
  }
  const handleInputImageChange = (event) => {
    const { files } = event.target;
    const file = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setTheater({
        ...theater,
        imageFile: file,
        previewImage: reader.result,
      });
    };
  };
  const saveTheater = async (event) => {
    event.preventDefault();
    let urlImage = theater.image;
    if (theater.imageFile != null) {
      urlImage = await uploadFileHandler(token, theater.imageFile);
    }
    const data = {
      name: theater.name,
      seats: theater.seats,
      image: urlImage,
    };

    const theaterSaved = await updateTheater(
      token,
      match.params.theaterId,
      data
    );
    if (theaterSaved) {
      toast('Salle modifiée', {
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
        Modifiez votre salle
      </h1>

      <form onSubmit={saveTheater}>
        <div className='grid grid-cols-4 gap-2 pt-4 '>
          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Nom de la salle:
          </label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={theater.name}
            name='name'
            placeholder='Ex: Salle 3'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Nombre de siège:
          </label>
          <input
            required
            min='1'
            type='number'
            onChange={handleInputChange}
            value={theater.seats}
            name='seats'
            placeholder='Ex: La 6ème aventure des Avengers...'
            className='p-2 rounded text-gray-900'
          />
          <label className='text-2xl font-semibold col-start-2 my-auto'>
            Affiche:
          </label>
          <input
            type='file'
            onChange={handleInputImageChange}
            name='image'
            className='p-2 text-gray-900'
          />
          <div></div>
          {theater.previewImage ? (
            <img
              src={theater.previewImage}
              alt='Preview theater'
              className='max-h-96 col-start-3 mx-auto'
            />
          ) : theater.image ? (
            <img
              src={theater.image}
              alt='Theater'
              className='max-h-96 col-start-3 mx-auto'
            />
          ) : null}
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

export default UpdateTheater;
