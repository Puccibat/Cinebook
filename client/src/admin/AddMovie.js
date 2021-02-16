import React, { useState } from 'react';
import { createMovie } from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

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
    // image: '',
  };
  const [movie, setMovie] = useState(initialMovieState);
  // const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const saveMovie = () => {
    let data = {
      title: movie.title,
      synopsis: movie.synopsis,
      duration: movie.duration,
      director: movie.director,
      casting: movie.casting,
      genre: movie.genre,
      classification: movie.classification,
      availability: movie.availability,
      // image: movie.image,
    };
    console.log(data);
    createMovie(token, data)
      .then((res) => {
        console.log('toto');
        console.log(res);
        setMovie({
          title: res.data.title,
          synopsis: res.data.synopsis,
          duration: res.data.duration,
          director: res.data.director,
          casting: res.data.casting,
          genre: res.data.genre,
          classification: res.data.classification,
          availability: res.data.availability,
          // image: res.data.image,
        });
        // setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]
  //   const formData = new FormData()
  //   formData.append('image', file)

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }

  //     const { data } = await axios.post('/api/upload', formData, config)

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const newMovie = () => {
    setMovie(initialMovieState);
    // setSubmitted(false);
  };

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-4xl text-center font-semibold'>Ajoutez un film</h1>

      {/* {submitted ? (
          <div>
            <h4>Film ajouté</h4>
            <button
              onClick={newMovie}
              className='bg-green-600 hover:bg-green-400 text-white px-4 py-2  mt-4 rounded'
            >
              <i className='fas fa-plus-circle'></i>
            </button>
          </div>
        ) : ( */}
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
            onChange={handleInputChange}
            value={movie.image}
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
      {/* )} */}
    </div>
  );
};

export default AddMovie;
