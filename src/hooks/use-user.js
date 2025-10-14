import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/stores/auth-store';

// Replace any API call to /auth/me with local state from the auth store
export const useUser = () => {
  const { user, isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: ['user'],
    queryFn: () => {
      // Instead of making an API call, just return the user from the store
      return user;
    },
    // Set enabled to false to prevent automatic refetching
    enabled: false,
    initialData: user,
  });
};
