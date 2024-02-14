import axios from "axios";

export const getToken = () =>
  localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    common: {
      Authorization: getAuthorizationHeader(),
    },
  },
});

const api = {
  get: async (url) => {
    try {
      const response = await apiInstance.get(url, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("Error with GET request:", error);
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await apiInstance.post(url, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error with POST request:", error);
      throw error;
    }
  },
};

export default api;
