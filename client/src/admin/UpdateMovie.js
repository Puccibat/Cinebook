import React, { useState } from 'react';
import { updateMovie, uploadFileHandler } from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

const UpdateMovie = ({ match }) => {
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
    const { name, files } = event.target;
    setMovie({ ...movie, [name]: files[0] });
  };
  const saveMovie = async () => {
    const urlImage = await uploadFileHandler(token, movie.image);
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

    const movieSaved = await updateMovie(token, match.params.movieId, data);
    if (movieSaved) {
      alert('Film modifié');
      setMovie(initialMovieState);
    } else {
      alert('error');
    }
  };

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-4xl text-center font-semibold'>
        Modifiez votre film
      </h1>

      <div>
        <div className='grid grid-cols-2 pt-4 '>
          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Titre du film:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.title}
            name='title'
            placeholder='Avengers 6'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Synopsis:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.synopsis}
            name='synopsis'
            placeholder='Ex: La 6ème aventure des Avengers...'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Durée (en min):
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.duration}
            name='duration'
            placeholder='Ex: 120'
            className='w-32 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Réalisateur:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.director}
            name='director'
            placeholder='Ex: Christoper Nolan'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Casting:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.casting}
            name='casting'
            placeholder='Ex: Scarlett Johansson, Bruce Willis, ...'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />
          <label className='text-2xl font-semibold pt-6 mx-auto'>Genre:</label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.genre}
            name='genre'
            placeholder='Ex: Action, science-fiction'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Classification:
          </label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.classification}
            name='classification'
            placeholder='Ex: Tout public'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>Statut:</label>
          <input
            type='text'
            onChange={handleInputChange}
            value={movie.availability}
            name='availability'
            placeholder='Ex: Nouveau'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          />

          <label className='text-2xl font-semibold pt-6 mx-auto'>
            Affiche:
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
            onClick={saveMovie}
            className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
