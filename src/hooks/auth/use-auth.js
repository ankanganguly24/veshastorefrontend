import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import useAuthStore from '@/stores/auth-store';
import { useToast } from '@/components/common/toast';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { success, error } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      console.log('Login attempt with:', { email: credentials.email });
      const response = await apiClient.post('/auth/login', credentials);
      return response;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      setUser(data.data.user);
      success('Login successful! Welcome back!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/profile');
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
      console.log('Register attempt with:', { 
        email: userData.email, 
        phone: userData.phone 
      });
      const response = await apiClient.post('/auth/register', userData);
      return response;
    },
    onSuccess: (data) => {
      console.log('Registration successful:', data);
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
  const logout = useAuthStore((state) => state.logout);
  const { success } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      success('Logged out successfully');
      router.push('/login');
    },
    onError: (err) => {
      console.error('Logout error:', err);
      logout();
      router.push('/login');
    },
  });
};
