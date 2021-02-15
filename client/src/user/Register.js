import React, { useState } from 'react';
import { signup } from '../auth/ApiAuth';

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleChange = (email) => (event) => {
    setValues({ ...values, [email]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    signup({ email, password }).then((data) => {
      setValues({
        ...values,
        email: '',
        password: '',
      });
    });
  };

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-6xl text-center font-semibold'>Inscrivez-vous !</h1>
      <form className='grid grid-cols-1'>
        <label className='text-2xl font-semibold pt-6 mx-auto'>
          Votre adresse email:
        </label>
        <input
          type='email'
          placeholder='votre@email.com'
          onChange={handleChange('email')}
          value={email}
          className='w-64 p-2 rounded text-gray-900 mx-auto'
        />

        <label className='text-2xl font-semibold pt-6 mx-auto'>
          Votre mot de passe:
        </label>
        <input
          type='password'
          placeholder='******'
          onChange={handleChange('password')}
          value={password}
          className='w-64 p-2 rounded text-gray-900 mx-auto'
        />

        <button
          onClick={onSubmit}
          className='rounded-md mt-6 py-2 px-4 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none mx-auto'
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default Register;
