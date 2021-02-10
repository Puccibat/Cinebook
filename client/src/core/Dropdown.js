import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ isOpen, toggle }) => {
  return (
    <div
      className={
        isOpen
          ? 'grid grid-rows-4 text-center items-center bg-red-500'
          : 'hidden'
      }
      onClick={toggle}
    >
      <Link
        className='p-4 border-b-2 border-transparent hover:border-white'
        to='/newMovies'
      >
        Nouveautés
      </Link>

      <Link
        className='p-4 border-b-2 border-transparent hover:border-white'
        to='/'
      >
        Mes Résa
      </Link>

      <Link
        className=':p-4 border-b-2 border-transparent hover:border-white'
        to='/infos'
      >
        Infos pratiques
      </Link>

      <Link
        className='p-4 border-b-2 border-transparent hover:border-white'
        to='/about'
      >
        A propos
      </Link>
    </div>
  );
};

export default Dropdown;
