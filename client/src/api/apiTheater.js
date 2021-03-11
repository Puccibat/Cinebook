const API = require('./config');
const axios = require('axios');

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
