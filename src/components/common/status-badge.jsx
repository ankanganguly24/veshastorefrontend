import { cn } from "@/lib/utils";

const statusVariants = {
  active: "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
  inactive: "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800",
  pending: "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800",
  processing: "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
  completed: "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
  delivered: "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
  shipped: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
  cancelled: "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
  out_of_stock: "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
  low_stock: "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
  paid: "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
  refunded: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
  vip: "text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800",
  new: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
};

const statusLabels = {
  active: "Active",
  inactive: "Inactive", 
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  delivered: "Delivered",
  shipped: "Shipped",
  cancelled: "Cancelled",
  out_of_stock: "Out of Stock",
  low_stock: "Low Stock",
  paid: "Paid",
  refunded: "Refunded",
  vip: "VIP",
  new: "New",
};

export function StatusBadge({ status, className = "" }) {
  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-medium border capitalize",
      statusVariants[status] || statusVariants.inactive,
      className
    )}>
      {statusLabels[status] || status}
    </span>
  );
}
