import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import useAuthStore from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { setUser, setAuthenticated } = useAuthStore();
  const { success, error } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      console.log('Attempting login with credentials...');
      // Set explicit credentials option
      const response = await apiClient.post('/auth/login', credentials, {
        withCredentials: true
      });
      
      // Verify the response has the expected structure
      if (!response.data || !response.data.success) {
        throw new Error('Invalid server response');
      }
      
      return response;
    },
    onSuccess: (response) => {
      console.log('Login API call successful');
      
      // Verify cookie was set (can only check for existence, not content due to HTTP-only)
      if (typeof document !== 'undefined') {
        const hasCookies = document.cookie.length > 0;
        console.log('Cookies present after login:', hasCookies);
      }
      
      // Store user data
      if (response.data && response.data.data && response.data.data.user) {
        const userData = response.data.data.user;
        setUser(userData);
        setAuthenticated(true);
        
        success('Login successful! Welcome back!');
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/profile');
      } else {
        console.error('Unexpected login response structure:', response.data);
        error('Login response format error');
      }
    },
    onError: (err) => {
      console.error('Login error:', err);
      
      // Handle specific error types
      if (err.message.includes('connection') || err.message.includes('blocked')) {
        error('Unable to connect to server. Please try again later.');
      } else if (err.message.includes('credentials') || err.message.includes('Invalid')) {
        error('Invalid email or password. Please check your credentials.');
      } else {
        error(err.message || 'Login failed. Please try again.');
      }
    },
  });
};

export const useRegister = () => {
  const { success, error } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await apiClient.post('/auth/register', userData);
      return response;
    },
    onSuccess: (data) => {
      success('Account created successfully! Please login to continue.');
      router.push('/login');
    },
    onError: (err) => {
      console.error('Register error:', err);
      
      // Handle specific error types
      if (err.message.includes('connection') || err.message.includes('blocked')) {
        error('Unable to connect to server. Please try again later.');
      } else if (err.message.includes('email') && err.message.includes('exists')) {
        error('An account with this email already exists. Please use a different email or try logging in.');
      } else if (err.message.includes('phone') && err.message.includes('exists')) {
        error('An account with this phone number already exists. Please use a different number.');
      } else {
        error(err.message || 'Registration failed. Please try again.');
      }
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const { success } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        // Send logout request with credentials to properly clear the cookie
        await apiClient.post('/auth/logout', {}, {
          withCredentials: true,
          credentials: 'include'
        });
      } catch (error) {
        console.log('Logout API call failed, proceeding with client-side logout');
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear local auth state
      logout();
      
      // Clear React Query cache to prevent stale data
      queryClient.clear();
      
      success('Logged out successfully');
      router.push('/login');
    },
    onError: (err) => {
      console.error('Logout error:', err);
      // Even if the API call fails, we still want to logout locally
      logout();
      router.push('/login');
    },
  });
};
