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

    const { data } = await axios.delete(`${API}/theater/${theaterId}`, config);
    return data?.theaterId;
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

    const { data } = await axios.delete(
      `${API}/ticketType/${ticketTypeId}`,
      config
    );
    return data?.ticketTypeId;
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

//***************************Sessions requests******************************

exports.getSessions = async (sessionFilters) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    let url = `${API}/sessions?beginDate=${sessionFilters.beginDate}&endDate=${sessionFilters.endDate}`;

    if (sessionFilters.movieId) {
      url += `&movieId=${sessionFilters.movieId}`;
    }
    const { data } = await axios.get(url, config);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.getSessionById = async (sessionId) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const { data } = await axios.get(`${API}/session/${sessionId}`, config);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.createSession = async (token, session) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${API}/session/create`,
      JSON.stringify(session),
      config
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.removeSession = async (sessionId, token) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`${API}/session/${sessionId}`, config);
    return data?.sessionDeletedId;
  } catch (error) {
    console.error(error);
    return error.response?.data?.message;
  }
};

exports.updateSession = async (token, sessionId, session) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${API}/session/${sessionId}`,
      JSON.stringify(session),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
