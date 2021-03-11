import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovieById } from '../api/apiMovie';

const MovieDetail = ({ match }) => {
  const [movieItem, setMovieItem] = useState({});

  const loadSingleMovie = (movieId) => {
    getMovieById(movieId).then((data) => {
      setMovieItem(data);
    });
  };

  useEffect(() => {
    const movieId = match.params.movieId;
    loadSingleMovie(movieId);
  }, [match.params.movieId]);

  return (
    <div className='container my-5 mx-auto px-4 md:px-12'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className=' text-white font-semibold mb-4 '>
          <h1 className='text-5xl hover:text-red-500 '>{movieItem.title}</h1>
          <p className='mt-4'>Genre: {movieItem.genre}</p>
          <p className='mt-4'>Avec {movieItem.casting}</p>
          <h2 className='mt-4'>Durée: {movieItem.duration}min</h2>
          <h2 className='mt-4'>Synopsis:</h2>
          <p>{movieItem.synopsis}</p>
        </div>
        <div>
          <div className='overflow-hidden rounded-lg w-72 m-auto'>
            <img
              alt='Placeholder'
              className='block h-auto w-full'
              src={movieItem.image}
            />
          </div>
        </div>
      </div>
      <div className=' text-white text-center py-5'>
        <button className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'>
          <Link to={`/movie/${movieItem._id}/session`}>Séances</Link>
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
