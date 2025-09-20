"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (token) {
      // Mock API call to verify email
      setTimeout(() => {
        // Simulate success or error based on token
        setVerificationStatus(token === "valid" ? "success" : "error");
      }, 2000);
    }
  }, [token]);

  const handleResendVerification = async () => {
    setIsResending(true);
    // Mock API call
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  if (verificationStatus === "verifying") {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Verifying Your Email
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Please wait while we verify your email address...
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Email Verified Successfully!
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your email has been verified. You can now access all features of your account.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <p className="text-green-800 dark:text-green-200 text-sm">
            <strong>Welcome to Vesha!</strong>
            <br />
            Your account is now fully activated.
          </p>
        </div>

        <Button
          className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          asChild
        >
          <Link href="/login">
            Continue to Login
          </Link>
        </Button>
      </div>
    );
  }

  // Error state
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Verification Failed
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We couldn&apos;t verify your email. The link may be expired or invalid.
        </p>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
        <p className="text-red-800 dark:text-red-200 text-sm">
          <strong>Verification Issues:</strong>
          <br />
          • Link may be expired (valid for 24 hours)
          <br />
          • Link may have been used already
          <br />
          • Email address may not match
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleResendVerification}
          disabled={isResending}
          className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
        >
          {isResending ? (
            <div className="flex items-center">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </div>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Resend Verification Email
            </>
          )}
        </Button>

        <Button variant="outline" className="w-full h-12" asChild>
          <Link href="/login">
            Back to Login
          </Link>
        </Button>
      </div>
    </div>
  );
}
