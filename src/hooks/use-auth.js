'use client'; // ensure runs only on browser in Next.js

import axios from 'axios';
import useAuthStore from '../stores/auth-store';

// ✅ Create axios instance configured for cookies
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 👈 crucial for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor (for logging/debugging only)
api.interceptors.request.use(
  (config) => {
    console.log('Axios Request:', {
      url: config.url,
      method: config.method,
      headersBefore: { ...config.headers },
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Axios Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Axios Error:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('❌ Axios Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
