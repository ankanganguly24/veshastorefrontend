import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, LayoutDashboard, Package } from "lucide-react";
import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-orange-600 dark:text-orange-400" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Page Not Found
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              The admin page you're looking for doesn't exist or may have been moved. Let's get you back on track.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <p className="text-orange-800 dark:text-orange-200 text-sm">
              <strong>Available Admin Pages:</strong>
              <br />
              Dashboard • Products • Orders • Customers • Shipping • Settings
            </p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              asChild
            >
              <Link href="/admin">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12" asChild>
                <Link href="/admin/products">
                  <Package className="w-4 w-4 mr-2" />
                  Products
                </Link>
              </Button>
              <Button variant="outline" className="h-12" asChild>
                <Link href="/admin/orders">
                  Orders
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
