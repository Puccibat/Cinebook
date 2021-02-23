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

    await axios.delete(`${API}/movie/${movieId}`, config);
  } catch (error) {
    console.error(error);
    return null;
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

//***********************Theater requests***************************
exports.getTheaters = async () => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const { data } = await axios.get(`${API}/theaters`, config);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.getTheaterById = async (theaterId) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const { data } = await axios.get(`${API}/theater/${theaterId}`, config);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.createTheater = async (token, theater) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${API}/theater/create`,
      JSON.stringify(theater),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.removeTheater = async (theaterId, token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API}/theater/${theaterId}`, config);
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.updateTheater = async (token, theaterId, theater) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${API}/theater/${theaterId}`,
      JSON.stringify(theater),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//***************Upload file handler *******************************
exports.uploadFileHandler = async (token, file) => {
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

//*********************Ticket Type reaquests*****************************
exports.getTicketTypes = async () => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const { data } = await axios.get(`${API}/ticketTypes`, config);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.getTicketTypeById = async (ticketTypeId) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const { data } = await axios.get(
      `${API}/ticketType/${ticketTypeId}`,
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.createTicketType = async (token, ticketType) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${API}/ticketType/create`,
      JSON.stringify(ticketType),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.removeTicketType = async (ticketTypeId, token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API}/ticketType/${ticketTypeId}`, config);
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.updateTicketType = async (token, ticketTypeId, ticketType) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${API}/ticketType/${ticketTypeId}`,
      JSON.stringify(ticketType),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
