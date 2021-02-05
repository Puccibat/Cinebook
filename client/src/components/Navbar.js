import React from 'react';

const Navbar = () => {
  return (
    <div className='bg-red-500'>
      <div className='lg:px-16 px-6 flex flex-wrap items-center lg:py-0 py-2'>
        <div className='flex-1 flex justify-between items-center'>
          <a href='#'>
            <i className='fa fa-home fa-2x'></i>
          </a>
        </div>
        <label for='menu-toggle' className='cursor-pointer lg:hidden block'>
          <svg
            className='fill-current text-gray-900'
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
          >
            <title>menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
          </svg>
        </label>
        <input type='checkbox' className='hidden' id='menu-toggle' />
        <div
          className='hidden lg:flex lg:items-center lg:w-auto w-full'
          id='menu'
          style={{ display: 'block' }}
        >
          <nav>
            <ul className='lg:flex items-center justify-between text-base font-semibold text-gray-900 pt-4 lg:pt-0'>
              <li>
                <a
                  className='lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white'
                  href='#'
                >
                  Films
                </a>
              </li>
              <li>
                <a
                  className='lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white'
                  href='#'
                >
                  Nouveautés
                </a>
              </li>
              <li>
                <a
                  className='lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white'
                  href='#'
                >
                  Mes Résa
                </a>
              </li>
              <li>
                <a
                  className='lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white'
                  href='#'
                >
                  Infos pratiques
                </a>
              </li>
              <li>
                <a
                  className='lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white'
                  href='#'
                >
                  A propos
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
