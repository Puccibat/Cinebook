import React from 'react';
import { Link } from 'react-router-dom';

const AdminDropdown = ({ isOpen, toggle }) => {
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
        className='p-3 border-b-2 border-transparent hover:border-white'
        to='/adminDashboard'
      >
        Dashboard
      </Link>
      <Link
        className='p-4 border-b-2 border-transparent hover:border-white'
        to='/movieList'
      >
        Films
      </Link>

      <Link
        className=':p-4 border-b-2 border-transparent hover:border-white'
        to='/theaterList'
      >
        Salles
      </Link>

      <Link
        className='p-4 border-b-2 border-transparent hover:border-white'
        to='/ticketTypeList'
      >
        Tarifs
      </Link>

      <Link
        className='p-4 border-b-2 border-transparent hover:border-white'
        to='/sessionList'
      >
        Planning
      </Link>
    </div>
  );
};

export default AdminDropdown;
