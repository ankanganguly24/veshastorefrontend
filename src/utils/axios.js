'use client'; // ensure this runs on client-side only (important in Next.js)

import axios from 'axios';
import useAuthStore from '../stores/auth-store';

// ✅ Create axios instance with credentials enabled
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // <-- crucial for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor — add Authorization header if token exists in Zustand store
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    console.log('Axios Request:', {
      url: config.url,
      method: config.method,
      token,
      headersBefore: { ...config.headers },
    });

    if (token) {
      config.headers['Authorization'] = token;
      console.log('Authorization header set:', config.headers['Authorization']);
    } else {
      console.warn(
        '⚠️ No auth token found in store! Make sure to call useAuthStore.getState().setToken(auth_token) after login.'
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor — optional, helps catch auth errors or log responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ Axios Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Axios Error Response:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('❌ Axios Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
