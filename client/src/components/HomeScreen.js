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
        <div>
          <h1 className='text-white text-3xl font-semibold lg:pl-16 px-5 mt-6'>
            A l'affiche
          </h1>
          <div className='container my-5 mx-auto px-4 md:px-12'>
            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-white text-3xl font-semibold lg:pl-16 px-5 mt-6'>
            Nouveautés
          </h1>
          <div className='container my-5 mx-auto px-4 md:px-12'>
            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeScreen;
