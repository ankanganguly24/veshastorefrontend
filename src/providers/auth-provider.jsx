"use client";

// No need to import useUser since we won't be making API calls
import useAuthStore from '@/stores/auth-store';

export function AuthProvider({ children }) {
  // We'll simply use the auth store state directly
  const { isAuthenticated } = useAuthStore();
  
  // No API calls here, just render children
  return children;
}
