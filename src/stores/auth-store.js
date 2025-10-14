import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      // Set user after login
      setUser: (userData) => {
        if (!userData) return;
        
        set({
          user: userData
        });
      },
      
      // Set authentication status
      setAuthenticated: (status) => {
        set({
          isAuthenticated: !!status
        });
      },
      
      // Check if user is authenticated (for components to use)
      checkAuth: () => {
        return get().isAuthenticated && !!get().user;
      },
      
      // Clear user data on logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },
      
      // Helper to get user's full name
      getFullName: () => {
        const user = get().user;
        if (!user) return '';
        return `${user.first_name || ''} ${user.last_name || ''}`.trim();
      },
      
      // Helper to get user's initials for avatar
      getUserInitials: () => {
        const user = get().user;
        if (!user) return '';
        
        const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
        const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
        
        return firstInitial + lastInitial;
      },
    }),
    {
      name: 'auth-storage',
      // Use localStorage only for the user data, not for auth tokens
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
