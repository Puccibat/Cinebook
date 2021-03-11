import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateTheater, getTheaterById } from '../api/apiTheater';
import { uploadFileHandler } from '../api/apiUpload';
import { isAuth } from '../api/ApiAuth';

const UpdateTheater = ({ match }) => {
  const { token } = isAuth();

  const initialTheaterState = {
    name: '',
    seats: '',
  };
  const [theater, setTheater] = useState(initialTheaterState);

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
  const saveTheater = async () => {
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
      setTheater(initialTheaterState);
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
            placeholder='Ex: La 6ème aventure des Avengers...'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />
          <label className='text-2xl font-semibold pt-6 mx-auto my-auto'>
            Affiche:
          </label>
          <input
            type='file'
            onChange={handleInputImageChange}
            name='image'
            className='w-64 p-2 text-gray-900 h-10 my-auto'
          />
          <div></div>
          {theater.previewImage ? (
            <img
              src={theater.previewImage}
              alt='Preview theater'
              className='max-h-96 py-5'
            />
          ) : theater.image ? (
            <img src={theater.image} alt='Theater' className='max-h-96 py-5' />
          ) : null}
        </div>
        <div className='text-center'>
          <button
            onClick={saveTheater}
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

export default UpdateTheater;
