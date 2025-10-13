import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => {
        console.log('Setting user:', user); // Debug log
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => {
        console.log('Logging out user'); // Debug log
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),

      // Helper methods
      getFullName: () => {
        const { user } = get();
        if (!user) return '';
        return `${user.first_name} ${user.last_name}`.trim();
      },

      getUserInitials: () => {
        const { user } = get();
        if (!user) return 'U';
        const firstInitial = user.first_name?.[0] || '';
        const lastInitial = user.last_name?.[0] || '';
        return `${firstInitial}${lastInitial}`.toUpperCase() || 'U';
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
