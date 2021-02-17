import React from 'react';
import { Link } from 'react-router-dom';
import { removeMovie } from '../apiFetching';
import { isAuth } from '../auth/ApiAuth';

const AdminMovieCard = ({ movie, deleteMovie }) => {
  const { token } = isAuth();

  const destroy = (movieId) => {
    const movieRemoved = removeMovie(movieId, token);
    if (movieRemoved) {
      alert('Film supprimé');
      deleteMovie(movieRemoved);
    } else {
      alert('Il y a une erreur');
    }
  };

  return (
    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-full'>
      <img src={movie.image} className='w-full' alt='Movie poster' />
      <div className='p-4 bg-white rounded-b-lg grid grid-cols-1'>
        <h5 className='text-sm text-gray-900 font-semibold tracking-widest mb-2 uppercase '>
          {movie.title}
        </h5>
        <button className='bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 i mt-4 rounded '>
          <Link to='/updateMovie'>
            Modifier <i className='fas fa-pen'></i>
          </Link>
        </button>
        <button
          onClick={() => destroy(movie._id)}
          className='bg-red-800 hover:bg-red-600 text-white px-4 py-2  mt-4 rounded '
        >
          Supprimer <i className='fas fa-trash-alt'></i>
        </button>
      </div>
    </div>
  );
};

export default AdminMovieCard;