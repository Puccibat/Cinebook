import { isAuth } from './ApiAuth';
import axios from 'axios';
import API from './config';

export const createOrderAsync = async (newOrder) => {
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
