const { isAuth } = require('./ApiAuth');
const API = require('./config');
const axios = require('axios');

exports.createOrderAsync = async (newOrder) => {
  const { token } = isAuth();
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${API}/order`,
      JSON.stringify(newOrder),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
