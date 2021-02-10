import React from 'react';

const Register = () => {
  return (
    <div className='container grid grid-cols-1 text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-6xl text-center font-semibold'>Inscrivez-vous !</h1>

      <label className='text-2xl font-semibold pt-6'>
        Votre adresse email:
      </label>
      <input
        type='text'
        placeholder='votre@email.com'
        className='w-64 p-2 rounded text-gray-900'
      />

      <label className='text-2xl font-semibold pt-6'>Votre mot de passe:</label>
      <input
        type='text'
        placeholder='******'
        className='w-64 p-2 rounded text-gray-900'
      />

      <label className='text-2xl font-semibold pt-6'>
        Confirmez votre mot de passe:
      </label>
      <input
        type='text'
        placeholder='******'
        className='w-64 p-2 rounded text-gray-900'
      />
    </div>
  );
};

export default Register;
