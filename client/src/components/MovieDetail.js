import React from 'react';

const MovieDetail = () => {
  const imageSrc = '../../../uploads/image-1612516894573.jpeg';

  return (
    <div class='container my-5 mx-auto px-4 md:px-12'>
      <div class='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div class=' text-white font-semibold '>
          <h1 className='text-5xl hover:text-red-500 '>Drive</h1>
          <p className='mt-4'>Romance, thriller</p>
          <p className='mt-4'>
            Avec Ryan Gosling, Carey Mulligan, Bryan Cranston
          </p>
          <h2 className='mt-4'>Durée: 120min</h2>
          <h2 className='mt-4'>Synopsis:</h2>
          <p>
            Un jeune homme solitaire, The Driver, conduit le jour à Hollywood
            pour le cinéma en tant que cascadeur et la nuit pour des truands.
            Ultra professionnel et peu bavard, il a son propre code de conduite.
            Jamais il n'a pris part aux crimes de ses employeurs autrement qu'en
            conduisant - et au volant, il est le meilleur !
          </p>
        </div>
        <div class=''>
          <div class='overflow-hidden rounded-lg w-72 lg:m-auto'>
            <img alt='Placeholder' class='block h-auto w-full' src={imageSrc} />
          </div>
        </div>
        <div class='justify-self-center text-white mx-auto'>
          <button className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'>
            Séances
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
