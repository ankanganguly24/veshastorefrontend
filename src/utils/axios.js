import axios from 'axios';
import useAuthStore from '../stores/auth-store';

// Set baseURL from environment variable
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // ...existing config (baseURL, etc.)...
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    console.log("Axios Request:", {
      url: config.url,
      method: config.method,
      token,
      headersBefore: { ...config.headers }
    });
    if (token) {
      config.headers['Authorization'] = token; // <-- Send raw token, no 'Bearer'
      console.log("Authorization header set:", config.headers['Authorization']);
    } else {
      console.warn("No auth token found in store! Make sure to call useAuthStore.getState().setToken(auth_token) after login.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
