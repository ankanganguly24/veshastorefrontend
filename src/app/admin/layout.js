import { Suspense } from "react";
import AdminLayoutClient from "./admin-layout-client";
import AdminGuard from "@/components/auth/admin-guard";

/**
 * Admin Layout (Server Component)
 * Provides the layout structure for admin pages
 * Delegates client-side interactivity to AdminLayoutClient
 * Protected by AdminGuard - requires authentication and admin email
 */
export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
        <AdminLayoutClient>
          {children}
        </AdminLayoutClient>
      </Suspense>
    </AdminGuard>
  );
}