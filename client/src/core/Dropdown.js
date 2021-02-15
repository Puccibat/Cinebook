import React from 'react';
import { Link } from 'react-router-dom';
import { isAuth } from '../auth/ApiAuth';

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

      {isAuth() && isAuth().user.role === 0 ? (
        <Link
          className='p-3 border-b-2 border-transparent hover:border-white'
          to='/profil'
        >
          Mon profil
        </Link>
      ) : null}

      {isAuth() && isAuth().user.role === 1 ? (
        <Link
          className='p-3 border-b-2 border-transparent hover:border-white'
          to='/adminDashboard'
        >
          Dashboard
        </Link>
      ) : null}

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
