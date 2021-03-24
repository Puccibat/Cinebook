import axios from 'axios';
import API from './config';

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
