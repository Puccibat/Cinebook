import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovieById } from '../apiFetching';

const SessionMovie = ({ match }) => {
  const [movieItem, setMovieItem] = useState({});

  const loadSingleMovie = (movieId) => {
    getMovieById(movieId).then((data) => {
      setMovieItem(data);
    });
  };

  useEffect(() => {
    const movieId = match.params.movieId;
    loadSingleMovie(movieId);
  });

  let date = new Date();

  return (
    <div className='container my-5 mx-auto px-4 md:px-12'>
      <div className=' text-white text-center font-semibold mb-4 '>
        <h1 className='text-5xl'>Séances pour {movieItem.title}</h1>
      </div>
      <div className='text-center py-8'>
        {}
        <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
          {date.getDate() + '/' + (date.getMonth() + 1)}
        </button>
        <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
          {date.getDate() + 1 + '/' + (date.getMonth() + 1)}
        </button>
        <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
          {date.getDate() + 2 + '/' + (date.getMonth() + 1)}
        </button>
        <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
          {date.getDate() + 3 + '/' + (date.getMonth() + 1)}
        </button>
        <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
          {date.getDate() + 4 + '/' + (date.getMonth() + 1)}
        </button>
        <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
          {date.getDate() + 5 + '/' + (date.getMonth() + 1)}
        </button>
        <button className='rounded-md py-2 px-4 mx-5 bg-gray-300 focus:outline-none'>
          {date.getDate() + 6 + '/' + (date.getMonth() + 1)}
        </button>
      </div>
      <div className='text-center text-white py-8'>
        <label>Combien de place ?</label>
        <input type='number' className='ml-3 w-10' />
      </div>

      <div className=' text-white text-center py-5'>
        <button className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'>
          Valider
        </button>
      </div>
    </div>
  );
};

export default SessionMovie;
