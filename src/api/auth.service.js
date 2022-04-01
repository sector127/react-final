import axios from 'axios';

import { API_BASE_URL } from './config';

axios.defaults.baseURL = API_BASE_URL;

export const loginAsync = async (data) => {
  try {
    const response = await axios.post(`/login`, data);
    return response.data;
  } catch (e) {
    console.log('__loginAsync_Error', e);
    return null;
  }
};

export const registerAsync = async (data) => {
  try {
    const response = await axios.post(`/register`, data);
    return response.data;
  } catch (e) {
    console.log('__registerAsync_Error', e);
    return null;
  }
};
