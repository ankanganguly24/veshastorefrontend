class ApiClient {
  constructor() {
    // Use the actual API URL from environment variables
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    console.log('API Base URL:', this.baseURL);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('Making request to:', url);
    
    // Remove credentials to avoid CORS issues with register endpoint
    const isRegisterEndpoint = endpoint.includes('/auth/register');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      // Don't include credentials for register endpoint to avoid CORS
      ...(isRegisterEndpoint ? {} : { credentials: 'include' }),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = 'Something went wrong';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}` || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle specific CORS errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // Check if it's a CORS error
        if (error.message.includes('CORS') || error.message.includes('blocked')) {
          throw new Error('Server connection blocked. Please try again or contact support.');
        }
        throw new Error('Network connection failed. Please check your internet connection.');
      }
      
      // Handle other errors
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('An unexpected error occurred');
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();