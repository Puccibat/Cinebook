import React, { useEffect, useState } from 'react';
import { getMovieById } from '../apiFetching';

const MovieDetail = ({ movie }) => {
  const [movieItem, setMovieItem] = useState({});

  const loadSingleMovie = (movieId) => {
    getMovieById(movieId).then((data) => {
      setMovieItem(data);
    });
  };

  useEffect(() => {
    const movieId = movie.match.params.movieId;
    loadSingleMovie(movieId);
  });

  return (
    <div className='container my-5 mx-auto px-4 md:px-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className=' text-white font-semibold '>
          <h1 className='text-5xl hover:text-red-500 '>{movieItem.title}</h1>
          <p className='mt-4'>{movieItem.genre}</p>
          <p className='mt-4'>Avec {movieItem.casting}</p>
          <h2 className='mt-4'>Durée: {movieItem.duration}min</h2>
          <h2 className='mt-4'>Synopsis:</h2>
          <p>{movieItem.synopsis}</p>
        </div>
        <div>
          <div className='overflow-hidden rounded-lg w-72 lg:m-auto'>
            <img
              alt='Placeholder'
              className='block h-auto w-full'
              src={movieItem.image}
            />
          </div>
        </div>
        <div className='justify-self-center text-white mx-auto'>
          <button className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'>
            Séances
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
