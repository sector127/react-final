import axios from 'axios';

import { REST_BASE_URL } from './config';

const axiosCountries = axios.create({
  baseURL: REST_BASE_URL,
});

// axios.defaults.baseURL = REST_BASE_URL;

export const getCountriesByRegionName = async (region) => {
  try {
    const response = await axiosCountries.get(`/region/${region}`);
    return response.data;
  } catch (e) {
    console.log('getCountriesByRegionName', e);
    return null;
  }
};

export const getCountries = async () => {
  try {
    const response = await axiosCountries.get(`/all`);
    return response.data;
  } catch (e) {
    console.log('countries', e);
    return null;
  }
};
