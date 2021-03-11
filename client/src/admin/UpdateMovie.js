import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateMovie, getMovieById } from '../api/apiMovie';
import { uploadFileHandler } from '../api/apiUpload';
import { isAuth } from '../api/ApiAuth';

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

  const [loadMovie, setLoadMovie] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  if (loadMovie) {
    getMovieById(match?.params?.movieId)
      .then((movie) => {
        setMovie(movie);
        setLoadMovie(false);
      })
      .catch();
  }
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
  const saveMovie = async () => {
    let urlImage = movie.image;
    if (movie.imageFile != null) {
      urlImage = await uploadFileHandler(token, movie.imageFile);
    }
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
      toast('Film modifié', {
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
          <textarea
            type='text'
            onChange={handleInputChange}
            value={movie.synopsis}
            name='synopsis'
            placeholder='Ex: La 6ème aventure des Avengers...'
            className='w-64 p-2 rounded text-gray-900 h-20 my-auto'
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
          <select
            onChange={handleInputChange}
            value={movie.classification}
            name='classification'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          >
            <option>Sélectionnez une classification</option>
            <option>Tout public</option>
            <option>Pour public averti</option>
            <option>Interdit -12 ans</option>
            <option>Interdit -16 ans</option>
            <option>Interdit -18 ans</option>
          </select>

          <label className='text-2xl font-semibold pt-6 mx-auto'>Statut:</label>
          <select
            onChange={handleInputChange}
            value={movie.availability}
            name='availability'
            className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
          >
            <option>Sélectionnez le statut du film</option>
            <option>A l'affiche</option>
            <option>Nouveauté</option>
          </select>

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
          {movie.previewImage ? (
            <img
              src={movie.previewImage}
              alt='Preview movie'
              className='max-h-96 py-5'
            />
          ) : movie.image ? (
            <img
              src={movie.image}
              alt='Movie poster'
              className='max-h-96 py-5'
            />
          ) : null}
        </div>
        <div className='text-center'>
          <button
            onClick={saveMovie}
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

export default UpdateMovie;
