import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from '../auth/ApiAuth';

const Register = () => {
  const initialUserState = {
    email: '',
    userName: '',
    password: '',
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: user.email,
      userName: user.userName,
      password: user.password,
    };

    const userSaved = await signup(data);
    if (userSaved) {
      toast(
        'Vous êtes bien enregistré, vous pouvez maintenant vous connecter',
        {
          draggable: true,
          style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
          position: toast.POSITION.TOP_CENTER,
        }
      );
      setUser(initialUserState);
    } else {
      toast('Une erreur est survenue, veuillez recommencer', {
        draggable: true,
        style: { backgroundColor: 'rgba(239, 68, 68)' },
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <ToastContainer />
      <h1 className='text-6xl text-center font-semibold'>Inscrivez-vous !</h1>
      <form className='grid grid-cols-1'>
        <label className='text-2xl font-semibold pt-6 mx-auto'>
          Votre adresse email:
        </label>
        <input
          type='email'
          placeholder='votre@email.com'
          onChange={handleInputChange}
          value={user.email}
          name='email'
          className='w-64 p-2 rounded text-gray-900 mx-auto'
        />

        <label className='text-2xl font-semibold pt-6 mx-auto'>
          Votre Nom:
        </label>
        <input
          type='text'
          placeholder='Jon Wick'
          onChange={handleInputChange}
          value={user.userName}
          name='userName'
          className='w-64 p-2 rounded text-gray-900 mx-auto'
        />

        <label className='text-2xl font-semibold pt-6 mx-auto'>
          Votre mot de passe:
        </label>
        <input
          type='password'
          placeholder='******'
          onChange={handleInputChange}
          value={user.password}
          name='password'
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
