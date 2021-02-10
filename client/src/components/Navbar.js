import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggle }) => {
  return (
    <nav
      className='flex justify-between items-center py-2 bg-red-500 text-gray-900 relative shadow-sm font-semibold'
      role='navigation'
    >
      <Link to='/' className='pl-8'>
        <i className='fa fa-home fa-2x'></i>
      </Link>
      <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
        <svg
          className='fill-current'
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
        >
          <title>menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
        </svg>
      </div>
      <div className='pr-8 md:block hidden'>
        <Link
          className='p-3 border-b-2 border-transparent hover:border-white'
          to='/'
        >
          Films
        </Link>

        <Link
          className='p-3 border-b-2 border-transparent hover:border-white'
          to='/'
        >
          Nouveautés
        </Link>

        <Link
          className='p-3 border-b-2 border-transparent hover:border-white'
          to='/'
        >
          Mes Résa
        </Link>

        <Link
          className='p-3 border-b-2 border-transparent hover:border-white'
          to='/infos'
        >
          Infos pratiques
        </Link>

        <Link
          className='p-3 border-b-2 border-transparent hover:border-white'
          to='/'
        >
          A propos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
