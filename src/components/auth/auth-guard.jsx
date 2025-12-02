"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

/**
 * AuthGuard Component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
export default function AuthGuard({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're certain the user is not authenticated
    // Give a moment for the auth state to hydrate from localStorage
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push("/login");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  // Show loading state while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
          <span className="text-sm">Verifying authentication...</span>
        </div>
      </div>
    );
  }

  return children;
}
