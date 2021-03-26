import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createMovie } from '../api/apiMovie';
import { uploadFileHandler } from '../api/apiUpload';
import { isAuth } from '../api/ApiAuth';

const AddMovie = () => {
  const { token } = isAuth();

  const initialMovieState = {
    title: '',
    synopsis: '',
    duration: '',
    director: '',
    casting: '',
    genre: '',
    classification: '',
    availability: '',
  };
  const [movie, setMovie] = useState(initialMovieState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleInputImageChange = (event) => {
    const { files } = event.target;
    const file = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setMovie({
        ...movie,
        imageFile: file,
        previewImage: reader.result,
      });
    };
  };
  const saveMovie = async (event) => {
    event.preventDefault();
    const urlImage = await uploadFileHandler(token, movie.imageFile);
    const data = {
      title: movie.title,
      synopsis: movie.synopsis,
      duration: movie.duration,
      director: movie.director,
      casting: movie.casting,
      genre: movie.genre,
      classification: movie.classification,
      availability: movie.availability,
      image: urlImage,
    };

    const movieSaved = await createMovie(token, data);
    if (movieSaved) {
      toast('Film enregistré', {
        draggable: true,
        style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
        position: toast.POSITION.TOP_CENTER,
      });
      setMovie(initialMovieState);
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

      <form onSubmit={saveMovie}>
        <div className='grid grid-cols-4 pt-4 gap-2'>
          <label className='text-2xl font-semibold col-start-2'>
            Titre du film:
          </label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={movie.title}
            name='title'
            placeholder='Avengers 6'
            className=' p-2 rounded text-gray-900 my-auto'
          />

          <label className='text-2xl font-semibold my-auto col-start-2'>
            Synopsis:
          </label>
          <textarea
            required
            type='text'
            onChange={handleInputChange}
            value={movie.synopsis}
            name='synopsis'
            placeholder='Ex: La 6ème aventure des Avengers...'
            className=' p-2 rounded text-gray-900 h-20'
          />

          <label className='text-2xl font-semibold col-start-2'>
            Durée (en min):
          </label>
          <input
            required
            min='1'
            type='number'
            onChange={handleInputChange}
            value={movie.duration}
            name='duration'
            placeholder='Ex: 120'
            className='w-32 p-2 rounded text-gray-900 '
          />

          <label className='text-2xl font-semibold col-start-2'>
            Réalisateur:
          </label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={movie.director}
            name='director'
            placeholder='Ex: Christoper Nolan'
            className='p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2'>Casting:</label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={movie.casting}
            name='casting'
            placeholder='Ex: Scarlett Johansson, Bruce Willis, ...'
            className='p-2 rounded text-gray-900'
          />
          <label className='text-2xl font-semibold col-start-2'>Genre:</label>
          <input
            required
            type='text'
            onChange={handleInputChange}
            value={movie.genre}
            name='genre'
            placeholder='Ex: Action, science-fiction'
            className=' p-2 rounded text-gray-900'
          />

          <label className='text-2xl font-semibold col-start-2'>
            Classification:
          </label>
          <select
            required
            onChange={handleInputChange}
            value={movie.classification}
            name='classification'
            className=' p-2 rounded text-gray-900'
          >
            <option>Sélectionnez une classification</option>
            <option>Tout public</option>
            <option>Pour public averti</option>
            <option>Interdit -12 ans</option>
            <option>Interdit -16 ans</option>
            <option>Interdit -18 ans</option>
          </select>

          <label className='text-2xl font-semibold col-start-2'>Statut:</label>
          <select
            required
            onChange={handleInputChange}
            value={movie.availability}
            name='availability'
            className=' p-2 rounded text-gray-900'
          >
            <option>Sélectionnez le statut du film</option>
            <option>A l'affiche</option>
            <option>Nouveauté</option>
          </select>

          <label className='text-2xl font-semibold my-auto col-start-2'>
            Affiche:
          </label>
          <input
            required
            type='file'
            onChange={handleInputImageChange}
            name='image'
            className='p-2 text-gray-900 '
          />
          <div></div>
          {movie.previewImage ? (
            <img
              src={movie.previewImage}
              alt='Preview movie'
              className='max-h-96 py-5 col-start-3 mx-auto'
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

export default AddMovie;
