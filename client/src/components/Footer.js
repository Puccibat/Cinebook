import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-red-500 text-gray-900 fixed inset-x-0 p-2 bottom-0 text-sm'>
      <div className='flex flex-col'>
        <div className=' flex justify-center'>
          <h1 className='text-2xl font-semibold '>Cinebook</h1>
        </div>
        <div className='flex pb-1 justify-center space-x-5 '>
          <div className='fa fa-instagram text-xl hover:text-white'></div>
          <div className='fa fa-facebook text-xl hover:text-white'></div>
          <div className='fa fa-twitter text-xl hover:text-white'></div>
        </div>
      </div>

      <hr />
      <div className='pt-1'>
        Cinebook &copy; 2021 - Tous droits réservés &reg;
      </div>
    </footer>
  );
};

export default Footer;
