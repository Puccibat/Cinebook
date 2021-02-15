import React, { useRef, useState } from 'react';
import { signin, authenticate } from '../auth/ApiAuth';
import { Link } from 'react-router-dom';

const SignInModal = ({ showModal, setShowModal, setIsLogged }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleChange = (email) => (event) => {
    setValues({ ...values, [email]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        authenticate(data, () => {
          setIsLogged(true);
          setValues({
            ...values,
          });
        });
        setShowModal(false);
        setValues({
          email: '',
          password: '',
        });
      }
    });
  };

  return (
    <>
      {showModal ? (
        <form>
          <div
            className='w-full z-10 h-full fixed justify-center items-center bg-black opacity-80'
            onClick={closeModal}
            ref={modalRef}
          ></div>
          <div
            showModal={showModal}
            className='fixed grid z-20 rounded-lg w-96 h-72 m-auto inset-x-0 inset-y-0 bg-gray-900 text-white'
          >
            <h1 className='text-center pt-6 text-2xl font-semibold'>
              Connectez-vous
            </h1>
            <div className='mb-4 pl-5 pt-4'>
              <label className='font-semibold block mb-2'>Email</label>
              <input
                type='email'
                onChange={handleChange('email')}
                value={email}
                className='block bg-white rounded shadow pl-2 text-gray-900'
                placeholder='votre@email.com'
              />
            </div>
            <div className='mb-4 pl-5 pt-2'>
              <label className='font-semibold block mb-2'>Mot de Passe</label>
              <input
                type='password'
                onChange={handleChange('password')}
                value={password}
                className='block bg-white rounded shadow pl-2 text-gray-900 '
                placeholder='******'
              />
            </div>
            <button
              onClick={clickSubmit}
              className='rounded-md py-2 px-4 w-28 mx-auto mb-3 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'
            >
              <Link to='/profil'>Connexion</Link>
            </button>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default SignInModal;
