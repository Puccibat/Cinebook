const API = require('./config');
const axios = require('axios');

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
