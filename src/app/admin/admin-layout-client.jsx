"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/layout/admin-sidebar";
import AdminHeader from "@/components/admin/layout/admin-header";

/**
 * AdminLayoutClient Component
 * Client component that handles sidebar state and layout interactivity
 * Separated from the server layout to optimize server/client boundaries
 */
export default function AdminLayoutClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background grid grid-cols-1 lg:grid-cols-[256px_1fr]">
      {/* Sidebar */}
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main content area */}
      <div className="flex flex-col min-h-screen">
        {/* Top navigation */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
