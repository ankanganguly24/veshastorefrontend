import { Loader2, BarChart3 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
        <div className="h-4 w-96 bg-muted rounded animate-pulse"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-20 bg-muted rounded animate-pulse mb-2"></div>
            <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Main Content Loading */}
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Loading Dashboard
            </h3>
            <p className="text-muted-foreground text-sm">
              Please wait while we fetch your store data...
            </p>
          </div>

          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
