import { API } from './config';
import axios from 'axios';

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

export const createMovie = (token, movie, file) => {
  return fetch(`${API}/movie/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
    file,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadFileHandler = async (token, file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${API}/upload`, formData, config);
    return data;
  } catch (error) {
    console.error(error);
  }
};
