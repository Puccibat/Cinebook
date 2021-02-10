import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-full'>
      <div className='overflow-hidden rounded-lg'>
        <Link to={`/movie/${movie._id}`}>
          <img
            alt='Placeholder'
            className='w-full lg:m-auto'
            src={movie.image}
          />
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
