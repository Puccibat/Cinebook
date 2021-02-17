import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-red-500 text-gray-900 inset-x-0 p-2 bottom-0 text-sm'>
      <div className='flex flex-col'>
        <div className=' flex justify-center'>
          <h1 className='text-2xl font-semibold '>Cinebook</h1>
        </div>
        <div className='flex pb-1 justify-center space-x-5 '>
          <div className='text-xl hover:text-white'>
            <i className='fab fa-instagram'></i>
          </div>
          <div className='text-xl hover:text-white'>
            <i className='fab fa-facebook'></i>
          </div>
          <div className='text-xl hover:text-white'>
            <i className='fab fa-twitter'></i>
          </div>
        </div>
      </div>

      <hr />
      <div className='pt-1'>
        Copyright &copy; 2021 - Tous droits réservés &reg; Cinebook by PucciBat
      </div>
    </footer>
  );
};

export default Footer;
