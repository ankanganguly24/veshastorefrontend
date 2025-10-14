import axios from 'axios';
import { toast } from 'sonner';

// Get the base URL from environment variables or use a default
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with custom config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
  withCredentials: true, // Enable sending cookies with cross-origin requests
});

// Request interceptor for sending cookies with every request
apiClient.interceptors.request.use(
  (config) => {
    // Ensure credentials are included with every request
    config.withCredentials = true;
    
    // Log request details in development
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`API ${config.method?.toUpperCase() || 'REQUEST'} to: ${config.url}`);
      
      // Log if cookies exist
      if (typeof document !== 'undefined') {
        const cookies = document.cookie;
        if (cookies) {
          console.debug('Cookies available for request:', true);
        }
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    // For successful responses, check for auth info
    if (response.config.url?.includes('/auth/login') && response.status === 200) {
      console.debug('Login successful with auth cookie set');
    }
    
    return response;
  },
  (error) => {
    const { response } = error;

    // Handle different error scenarios
    if (response) {
      // If unauthorized, might need to reauthenticate
      if (response.status === 401) {
        console.error('401 Unauthorized - Cookie might not be sent properly');
        
        toast.error('Authentication failed. Please log in again.');
        
        // Only redirect if not already on login-related pages
        if (typeof window !== 'undefined' && 
            !window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      } else {
        // Handle other error cases
        switch (response.status) {
          case 400:
            // Bad request
            if (response.data && response.data.message) {
              toast.error(response.data.message);
            } else {
              toast.error('Bad request. Please check your input.');
            }
            break;
          case 403:
            toast.error('You do not have permission to perform this action.');
            break;
          case 404:
            // Don't show toast for 404 on auth test
            if (!response.config.url?.includes('/auth/test')) {
              toast.error('The requested resource was not found.');
            }
            break;
          case 500:
            toast.error('An internal server occurred. Please try again later.');
            break;
          default:
            toast.error(response.data?.message || 'An unexpected error occurred.');
        }
      }
    } else if (error.request) {
      toast.error('Network error. Please check your internet connection.');
    } else {
      toast.error('An error occurred while setting up the request.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;