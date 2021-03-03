import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies, getTheaters, getTicketTypes } from '../apiFetching';

const AdminDashoard = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);

  const loadTicketTypes = () => {
    getTicketTypes().then((data) => {
      setTicketTypes(data);
    });
  };

  const loadMovies = () => {
    getMovies().then((data) => {
      setMovies(data);
    });
  };

  const loadTheaters = () => {
    getTheaters().then((data) => {
      setTheaters(data);
    });
  };

  useEffect(() => {
    loadTicketTypes();
  }, []);

  useEffect(() => {
    loadTheaters();
  }, []);

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-6xl text-center font-semibold'>
        Bienvenu sur votre dashboard
      </h1>
      <p className='text-center pt-4'>
        Vous pouvez gérer votre planning de programmation mais aussi ajouter ou
        supprimer des films, salles, tarifs.
      </p>
      <div className='grid lg:grid-cols-9 grid-cols-1 gap-4 my-6'>
        <div className=' bg-white text-red-500 hover:bg-red-500 hover:text-white mx-auto rounded-3xl py-7 lg:col-start-4'>
          <Link to='/movieList'>
            <h1 className='w-32 text-2xl font-semibold text-center'>
              {movies.length}
            </h1>
            <h1 className=' w-32 text-2xl font-semibold text-center'>
              Films sont à l'affiche
            </h1>
          </Link>
        </div>

        <div className=' bg-red-500 hover:bg-white hover:text-red-500 mx-auto rounded-3xl py-7 '>
          <Link to='/theaterList'>
            <h1 className=' w-32 text-2xl font-semibold text-center'>
              {theaters.length}
            </h1>
            <h1 className=' w-32 text-2xl font-semibold text-center'>
              Salles sont disponibles
            </h1>
          </Link>
        </div>

        <div className=' bg-white text-red-500 hover:bg-red-500 hover:text-white mx-auto rounded-3xl py-7'>
          <Link to='/ticketTypeList'>
            <h1 className=' w-32 text-2xl font-semibold text-center'>
              {ticketTypes.length}
            </h1>
            <h1 className=' w-32 text-2xl font-semibold text-center'>
              Tarifs sont en vigueur
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashoard;
