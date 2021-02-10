import { API } from './config';

export const getMovies = async () => {
  return fetch(`${API}/movies`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getMoviesByAvailability = async (availability) => {
  return fetch(`${API}/movies/moviesByAvailability/${availability}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getMovieById = async (movieId) => {
  return fetch(`${API}/movie/${movieId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
