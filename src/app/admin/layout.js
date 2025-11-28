import { Suspense } from "react";
import AdminLayoutClient from "./admin-layout-client";

/**
 * Admin Layout (Server Component)
 * Provides the layout structure for admin pages
 * Delegates client-side interactivity to AdminLayoutClient
 */
export default function AdminLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <AdminLayoutClient>
        {children}
      </AdminLayoutClient>
    </Suspense>
  );
}