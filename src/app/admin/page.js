"use client";

import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Revenue",
    value: "₹3,45,231.89",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,345",
    change: "+180.1%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "1,234",
    change: "+19%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Products",
    value: "573",
    change: "+4.75%",
    changeType: "positive",
    icon: Package,
  },
];

const recentOrders = [
  {
    id: "#3456",
    customer: "John Doe",
    email: "john@example.com",
    amount: "₹18,500.00",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "#3457",
    customer: "Jane Smith",
    email: "jane@example.com", 
    amount: "₹11,100.00",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "#3458",
    customer: "Bob Johnson",
    email: "bob@example.com",
    amount: "₹25,900.00",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "#3459",
    customer: "Alice Brown",
    email: "alice@example.com",
    amount: "₹7,330.00",
    status: "cancelled",
    date: "2024-01-14",
  },
  {
    id: "#3460",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    amount: "₹14,740.00",
    status: "completed",
    date: "2024-01-13",
  },
];

const topProducts = [
  {
    name: "Wireless Headphones",
    sales: 1234,
    revenue: "₹7,31,040",
    trend: "up",
  },
  {
    name: "Smart Watch",
    sales: 987,
    revenue: "₹5,84,520",
    trend: "up",
  },
  {
    name: "Laptop Stand",
    sales: 654,
    revenue: "₹2,42,220",
    trend: "down",
  },
  {
    name: "USB-C Cable",
    sales: 543,
    revenue: "₹1,20,540",
    trend: "up",
  },
];

function StatCard({ title, value, change, changeType, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs flex items-center",
          changeType === "positive" ? "text-green-600" : "text-red-600"
        )}>
          {changeType === "positive" ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    case "pending":
      return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
    case "cancelled":
      return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your clothing store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium border",
                      getStatusColor(order.status)
                    )}>
                      {order.status}
                    </span>
                    <span className="font-medium">{order.amount}</span>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{product.revenue}</span>
                    {product.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
