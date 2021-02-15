import React from 'react';

const AdminDashoard = () => {
  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-6xl text-center font-semibold'>
        Bienvenu sur votre dashboard
      </h1>
      <p className='text-center pt-4'>
        Vous pouvez gérer votre planning de programmation mais aussi ajouter ou
        supprimer des films, salles, tarifs.
      </p>
    </div>
  );
};

export default AdminDashoard;
