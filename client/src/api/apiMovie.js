const API = require('./config');
const axios = require('axios');

//******************Movies requests********************
exports.getMovies = async () => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const { data } = await axios.get(`${API}/movies`, config);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.getMovieById = async (movieId) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const { data } = await axios.get(`${API}/movie/${movieId}`, config);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.createMovie = async (token, movie) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${API}/movie/create`,
      JSON.stringify(movie),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.removeMovie = async (movieId, token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`${API}/movie/${movieId}`, config);
    return data?.moviedeletedId;
  } catch (error) {
    console.error(error);
    return error.response?.data?.message;
  }
};

exports.updateMovie = async (token, movieId, movie) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${API}/movie/${movieId}`,
      JSON.stringify(movie),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};