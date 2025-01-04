import axios from 'axios';
import { backEndApi } from './api';

const axiosInstance = axios.create({
  baseURL: backEndApi || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (userId) {
    config.headers['X-User-ID'] = userId;
  }

  return config;
});

export default axiosInstance;
