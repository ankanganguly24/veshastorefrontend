"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error("Admin Dashboard Error:", error);
  }, [error]);

  return (
    <div className="space-y-6">
      {/* Error Content */}
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Dashboard Error
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              We encountered an error while loading your admin dashboard. This could be due to a temporary issue with our servers.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              <strong>Error Details:</strong>
              <br />
              {error?.message || "An unexpected error occurred while loading the dashboard"}
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12" asChild>
                <Link href="/admin/products">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Products
                </Link>
              </Button>
              <Button variant="outline" className="h-12" asChild>
                <Link href="/admin/orders">
                  <Home className="w-4 h-4 mr-2" />
                  Orders
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            If this problem persists, please contact support
          </div>
        </div>
      </div>
    </div>
  );
}
