import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../apiFetching';
import AdminMovieCard from './AdminMovieCard';

const AdminMovieList = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = () => {
    getMovies().then((data) => {
      setMovies(data);
    });
  };

  const deleteMovie = (movieDeleted) => {
    setMovies(movies.filter((movie) => movie._id !== movieDeleted._id));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className='text-center'>
      <h1 className='text-2xl text-white py-4'>Vos films à l'affiche</h1>
      <button className='bg-green-600 hover:bg-green-400 text-white px-4 py-2  mt-4 rounded'>
        <Link to='/addMovie'>
          Ajouter un film <i className='fas fa-plus-circle'></i>
        </Link>
      </button>
      <div className='container my-5 mx-auto px-4 md:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
          {movies.map((movie) => (
            <AdminMovieCard
              movie={movie}
              key={movie._id}
              deleteMovie={deleteMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMovieList;
