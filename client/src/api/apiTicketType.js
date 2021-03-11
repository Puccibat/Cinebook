const API = require('./config');
const axios = require('axios');

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
