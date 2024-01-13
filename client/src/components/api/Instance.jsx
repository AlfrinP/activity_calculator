import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
});

const api = {
  get: async (url, config = {}) => {
    try {
      const response = await apiInstance.get(url, config);
      return response.data;
    } catch (error) {
      console.error('Error with GET request:', error);
      throw error;
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await apiInstance.post(url, data, {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error with POST request:', error);
      throw error;
    }
  },
};

export default api;
