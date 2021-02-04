import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className=' bg-gray-900 mx-auto px-4 py-4'>
        <div className='container flex item-center justify-between mx-auto px-4'>
          <div>
            <Link to='/'>
              <h1 className='text-white text-xl font-semibold hover:text-red-500 md:text-4xl py-5'>
                Cinebook
              </h1>
            </Link>
          </div>
          <div className='hidden -mx-4 md:flex md:items-center'>
            <ul>
              <li>
                <button className='rounded-md py-2 px-4 text-gray-100 bg-red-500 hover:bg-gray-600 focus:outline-none'>
                  Se connecter
                </button>
              </li>
              <li>
                <Link className='underline text-xs ml-5 text-red-500 '>
                  créer un compte
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='bg-red-500 inset-x-0 text-xs'>
        <span className='text-red-500'>hello</span>
      </div>
    </header>
  );
};

export default Header;

/*
<nav className='bg-red-500 shadow'>
<div className='container mx-auto px-6 py-3 '>
  <div className='md:flex md:items-center md:justify-between'>
    <div className='grid-rows-2 justify-between items-center'>
      <div className='text-xl font-semibold text-gray-700'>
        <Link
          to='/'
          className='text-white text-xl font-bold hover:text-gray-900 md:text-2xl'
        >
          Cinebook
        </Link>
      </div>

      <div className='flex md:hidden'>
        <button
          type='button'
          className='text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600'
          aria-label='toggle menu'
        >
          <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
            <path
              fill-rule='evenodd'
              d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div className='hidden -mx-4 md:flex md:items-center'>
      <button className='rounded-md py-2 px-4 text-gray-100 bg-red-400 hover:bg-red-500 focus:outline-none'>
        Se connecter
      </button>
      <Link>Créer un compte</Link>
    </div>
  </div>
</div>
</nav> */
