import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Loading...
        </h3>
        <p className="text-muted-foreground text-sm">
          Please wait while we prepare your authentication experience
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
