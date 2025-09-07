import { Loader2, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 w-24 bg-muted rounded animate-pulse mb-2"></div>
        <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
      </div>

      {/* Filters Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="h-10 flex-1 bg-muted rounded animate-pulse"></div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-10 w-20 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border border-border">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                <div className="h-6 w-12 bg-muted rounded-full animate-pulse"></div>
                <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    </div>
  );
}
