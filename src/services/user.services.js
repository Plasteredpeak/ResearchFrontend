import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const login = async (data) => {
  try {
    const response = await axios.post(`${BackendURL}/users/login`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(`${BackendURL}/users/signup`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
