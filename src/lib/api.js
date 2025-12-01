'use client';

import axios from 'axios';
import { toast } from 'sonner';

/**
 * Unified API Client for the application
 * Consolidates functionality from both axios.js and api-client.js
 * Handles authentication, error handling, and request/response interceptors
 */

// Get the base URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
  withCredentials: true, // Enable sending cookies with cross-origin requests
});

/**
 * Request interceptor
 * - Adds Authorization header if token exists
 * - Ensures credentials are included
 * - Logs requests in development
 */
api.interceptors.request.use(
  (config) => {
    // Ensure credentials are included with every request
    config.withCredentials = true;
    
    // Try to get token from Zustand store (lazy import to avoid circular dependencies)
    if (typeof window !== 'undefined') {
      try {
        // Dynamic import to avoid issues during SSR
        const useAuthStore = require('@/stores/auth-store').default;
        const token = useAuthStore.getState().getToken();
        
        if (token) {
          config.headers['Authorization'] = token;
        }
      } catch (error) {
        // Store might not be initialized yet, continue without token
        console.debug('Auth store not available during request');
      }
    }
    
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
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Handles common errors
 * - Shows user-friendly error messages
 * - Manages authentication redirects
 */
api.interceptors.response.use(
  (response) => {
    // For successful responses, check for auth info
    if (response.config.url?.includes('/auth/login') && response.status === 200) {
      console.debug('Login successful with auth cookie set');
    }
    
    // Log successful responses in development
    if (process.env.NODE_ENV !== 'production') {
      console.debug('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    const { response } = error;

    // Handle different error scenarios
    if (response) {
      // Server responded with error status
      const status = response.status;
      const message = response.data?.message;

      // Log error in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('API Error Response:', {
          url: error.config?.url,
          status: status,
          data: response.data,
        });
      }

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - authentication failed
          console.error('401 Unauthorized - Cookie might not be sent properly');
          toast.error('Authentication failed. Please log in again.');
          
          // Only redirect if not already on login-related pages
          if (typeof window !== 'undefined' && 
              !window.location.pathname.includes('/login') && 
              !window.location.pathname.includes('/register')) {
            // Clear auth state
            try {
              const useAuthStore = require('@/stores/auth-store').default;
              useAuthStore.getState().clearAuth();
            } catch (e) {
              console.debug('Could not clear auth store');
            }
            
            // Redirect to login
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          }
          break;

        case 400:
          // Bad request
          toast.error(message || 'Bad request. Please check your input.');
          break;

        case 403:
          // Forbidden
          toast.error('You do not have permission to perform this action.');
          break;

        case 404:
          // Not found - don't show toast for auth test endpoints
          if (!response.config.url?.includes('/auth/test')) {
            toast.error(message || 'The requested resource was not found.');
          }
          break;

        case 409:
          // Conflict
          toast.error(message || 'A conflict occurred. The resource may already exist.');
          break;

        case 422:
          // Validation error
          toast.error(message || 'Validation failed. Please check your input.');
          break;

        case 500:
          // Internal server error
          toast.error('An internal server error occurred. Please try again later.');
          break;

        case 503:
          // Service unavailable
          toast.error('Service temporarily unavailable. Please try again later.');
          break;

        default:
          // Generic error
          toast.error(message || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.message);
      toast.error('Network error. Please check your internet connection.');
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      toast.error('An error occurred while setting up the request.');
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to handle API errors consistently
 * @param {Error} error - The error object
 * @param {string} defaultMessage - Default message if none provided
 * @returns {string} - Error message
 */
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return defaultMessage;
};

/**
 * Helper function to extract data from API response
 * @param {Object} response - Axios response object
 * @returns {any} - Response data
 */
export const extractData = (response) => {
  return response.data;
};

export default api;
