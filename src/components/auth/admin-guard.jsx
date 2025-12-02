"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

/**
 * AdminGuard Component
 * Protects admin routes - requires authentication AND admin email
 * Redirects to login if not authenticated or to home if not admin
 */
export default function AdminGuard({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Give a moment for the auth state to hydrate from localStorage
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        // Not authenticated - redirect to login
        router.push("/login");
      } else if (user.email !== "Admin@example.com") {
        // Authenticated but not admin - redirect to home
        router.push("/");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  // Show loading state while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
          <span className="text-sm">Verifying authentication...</span>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (user.email !== "Admin@example.com") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
          <span className="text-sm">Redirecting...</span>
        </div>
      </div>
    );
  }

  return children;
}
