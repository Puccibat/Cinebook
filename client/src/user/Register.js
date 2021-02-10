import React from 'react';

const Register = () => {
  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-6xl text-center font-semibold'>Inscrivez-vous !</h1>
      <div className='grid grid-cols-1'>
        <label className='text-2xl font-semibold pt-6 mx-auto'>
          Votre adresse email:
        </label>
        <input
          type='text'
          placeholder='votre@email.com'
          className='w-64 p-2 rounded text-gray-900 mx-auto'
        />

        <label className='text-2xl font-semibold pt-6 mx-auto'>
          Votre mot de passe:
        </label>
        <input
          type='text'
          placeholder='******'
          className='w-64 p-2 rounded text-gray-900 mx-auto'
        />

        <label className='text-2xl font-semibold pt-6 mx-auto '>
          Confirmez votre mot de passe:
        </label>
        <input
          type='text'
          placeholder='******'
          className='w-64 p-2 rounded text-gray-900 mx-auto '
        />

        <button className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none mx-auto'>
          Valider
        </button>
      </div>
    </div>
  );
};

export default Register;
