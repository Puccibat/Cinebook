import React from 'react';

const MovieList = () => {
  const imageSrc = '../../../uploads/image-1612516894573.jpeg';

  return (
    <div class='container my-5 mx-auto px-4 md:px-12'>
      <div class='flex flex-wrap -mx-1 lg:-mx-4'>
        <div class='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4'>
          <div class='overflow-hidden rounded-lg'>
            <a href='#'>
              <img
                alt='Placeholder'
                class='block h-auto w-full'
                src={imageSrc}
              />
            </a>
          </div>
        </div>
        <div class='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4'>
          <div class='overflow-hidden rounded-lg shadow-lg'>
            <a href='#'>
              <img
                alt='Placeholder'
                class='block h-auto w-full'
                src={imageSrc}
              />
            </a>
          </div>
        </div>
        <div class='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4'>
          <div class='overflow-hidden rounded-lg shadow-lg'>
            <a href='#'>
              <img
                alt='Placeholder'
                class='block h-auto w-full'
                src={imageSrc}
              />
            </a>
          </div>
        </div>
        <div class='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4'>
          <div class='overflow-hidden rounded-lg shadow-lg'>
            <a href='#'>
              <img
                alt='Placeholder'
                class='block h-auto w-full'
                src={imageSrc}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
