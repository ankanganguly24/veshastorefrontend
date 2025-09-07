"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function AuthError({ error, reset }) {
  useEffect(() => {
    console.error("Auth Error:", error);
  }, [error]);

  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Something went wrong!
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We encountered an error while processing your request. Please try again.
        </p>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
        <p className="text-red-800 dark:text-red-200 text-sm">
          <strong>Error Details:</strong>
          <br />
          {error?.message || "An unexpected error occurred"}
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

        <Button variant="outline" className="w-full h-12" asChild>
          <Link href="/login">
            <Home className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </Button>
      </div>
    </div>
  );
}
