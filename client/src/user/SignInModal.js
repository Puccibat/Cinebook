import React, { useRef } from 'react';

const SignInModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <div className=''>
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
              <label className='font-semibold text-grey-900 block mb-2'>
                Email
              </label>
              <input
                type='text'
                className='block bg-white rounded shadow pl-2'
                placeholder='votre@email.com'
              />
            </div>
            <div className='mb-4 pl-5 pt-2'>
              <label className='font-semibold text-grey-900 block mb-2'>
                Mot de Passe
              </label>
              <input
                type='text'
                className='block bg-white rounded shadow pl-2'
                placeholder='******'
              />
            </div>
            <button className='rounded-md py-2 px-4 w-28 mx-auto mb-3 text-gray-100 bg-red-500 hover:bg-white hover:text-red-500 focus:outline-none'>
              Connexion
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SignInModal;
