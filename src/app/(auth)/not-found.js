import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function AuthNotFound() {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
        <FileQuestion className="w-8 h-8 text-orange-600 dark:text-orange-400" />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Page Not Found
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The authentication page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
        <p className="text-orange-800 dark:text-orange-200 text-sm">
          <strong>Available Auth Pages:</strong>
          <br />
          Login • Register • Forgot Password
        </p>
      </div>

      <div className="space-y-3">
        <Button
          className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          asChild
        >
          <Link href="/login">
            <Home className="w-4 h-4 mr-2" />
            Go to Login
          </Link>
        </Button>

        <Button variant="outline" className="w-full h-12" asChild>
          <Link href="/register">
            Create Account
          </Link>
        </Button>
      </div>
    </div>
  );
}
