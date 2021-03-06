import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMovies } from '../api/apiMovie';
import AdminMovieCard from './AdminMovieCard';

const AdminMovieList = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = () => {
    getMovies().then((data) => {
      setMovies(data);
    });
  };

  const deletedMovies = (deletedMoviesId) => {
    setMovies(movies.filter((movie) => movie._id !== deletedMoviesId));
    toast('Film supprimé', {
      draggable: true,
      style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className='text-center'>
      <ToastContainer />
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
              deletedMovies={deletedMovies}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMovieList;
