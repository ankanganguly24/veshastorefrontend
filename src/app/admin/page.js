"use client";

import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import OrderService from "@/services/order-service";
import Link from "next/link";

/**
 * StatCard Component
 */
function StatCard({ title, value, change, icon: Icon, trend }) {
  const isPositive = trend === "up";
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <p className={`text-xs flex items-center mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * QuickAccessCard Component
 */
function QuickAccessCard({ title, description, icon: Icon, href }) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-gray-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * RecentOrder Component
 */
function RecentOrder({ order }) {
  const statusColors = {
    SUCCESS: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    FAILED: "bg-red-100 text-red-800",
  };

  const fulfillmentColors = {
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{order.order_number}</p>
        <p className="text-xs text-gray-600">
          {order.user.first_name} {order.user.last_name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded ${fulfillmentColors[order.fulfillment_status]}`}>
          {order.fulfillment_status}
        </span>
        <p className="text-sm font-semibold text-gray-900 min-w-[80px] text-right">
          ₹{(order.total / 100).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/**
 * Admin Dashboard Page
 */
export default function AdminDashboard() {
  // Fetch admin orders
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await OrderService.getAdminOrderHistory();
      return res?.data?.orders || [];
    },
    staleTime: 2 * 60 * 1000,
  });

  const orders = ordersData || [];

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total / 100), 0);
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(order => order.user_id)).size;
  const totalItems = orders.reduce((sum, order) => sum + order.items_count, 0);

  // Recent orders (last 5)
  const recentOrders = orders.slice(0, 5);

  const quickLinks = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: Package,
      href: "/admin/products"
    },
    {
      title: "Orders",
      description: "View and manage orders",
      icon: ShoppingCart,
      href: "/admin/orders"
    },
    {
      title: "Categories",
      description: "Organize product categories",
      icon: Package,
      href: "/admin/category"
    },
    {
      title: "Customers",
      description: "View customer information",
      icon: Users,
      href: "/admin/customers"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to Vesha Admin. Manage your e-commerce store from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="+12.5% from last month"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          change="+8.2% from last month"
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          change="+5.1% from last month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Items Sold"
          value={totalItems}
          change="+15.3% from last month"
          icon={Package}
          trend="up"
        />
      </div>

      {/* Recent Orders & Quick Access */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <span className="text-sm text-gray-600 hover:text-gray-900 flex items-center cursor-pointer">
                View all
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No orders yet</div>
            ) : (
              <div className="space-y-0">
                {recentOrders.map((order) => (
                  <RecentOrder key={order.id} order={order} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {quickLinks.map((link, index) => (
                <QuickAccessCard key={index} {...link} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">
                {orders.filter(o => o.fulfillment_status === "PROCESSING").length}
              </p>
              <p className="text-sm text-blue-700 mt-1">Processing</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-900">
                {orders.filter(o => o.fulfillment_status === "SHIPPED").length}
              </p>
              <p className="text-sm text-indigo-700 mt-1">Shipped</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">
                {orders.filter(o => o.fulfillment_status === "DELIVERED").length}
              </p>
              <p className="text-sm text-green-700 mt-1">Delivered</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-900">
                {orders.filter(o => o.fulfillment_status === "CANCELLED").length}
              </p>
              <p className="text-sm text-red-700 mt-1">Cancelled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">
                {orders.filter(o => o.payment_status === "SUCCESS").length}
              </p>
              <p className="text-sm text-green-700 mt-1">Successful</p>
              <p className="text-xs text-green-600 mt-1">
                ₹{orders.filter(o => o.payment_status === "SUCCESS").reduce((sum, o) => sum + (o.total / 100), 0).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-900">
                {orders.filter(o => o.payment_status === "PENDING").length}
              </p>
              <p className="text-sm text-yellow-700 mt-1">Pending</p>
              <p className="text-xs text-yellow-600 mt-1">
                ₹{orders.filter(o => o.payment_status === "PENDING").reduce((sum, o) => sum + (o.total / 100), 0).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-900">
                {orders.filter(o => o.payment_status === "FAILED").length}
              </p>
              <p className="text-sm text-red-700 mt-1">Failed</p>
              <p className="text-xs text-red-600 mt-1">
                ₹{orders.filter(o => o.payment_status === "FAILED").reduce((sum, o) => sum + (o.total / 100), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
