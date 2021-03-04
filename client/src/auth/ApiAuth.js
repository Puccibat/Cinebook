const API = require('../config');
const axios = require('axios');

exports.signup = async (user) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${API}/signup`,
      JSON.stringify(user),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.signin = async (user) => {
  //console.log(name, email, password);
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${API}/signin`,
      JSON.stringify(user),
      config
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

exports.signout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    // next();
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('signout', response);
      })
      .catch((err) => console.log(err));
  }
};

exports.isAuth = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
