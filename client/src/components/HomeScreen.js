import React, { useState, useEffect } from 'react';
import { getMovies } from '../apiFetching';
import MovieCard from './MovieCard';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = () => {
    getMovies().then((data) => {
      setMovies(data);
    });
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <main>
        <h1 className='text-white px-5 md:px-12 mt-6'>A l'affiche</h1>
        <div className='container my-5 mx-auto px-4 md:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeScreen;
