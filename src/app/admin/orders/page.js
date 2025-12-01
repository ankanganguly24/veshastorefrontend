"use client";

import { useState } from "react";
import Image from "next/image";
import { Package, Search, Filter, Loader2, User, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import OrderService from "@/services/order-service";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch admin orders
  const { data: ordersData, isLoading, error } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await OrderService.getAdminOrderHistory();
      return res?.data?.orders || [];
    },
    staleTime: 2 * 60 * 1000,
  });

  const orders = ordersData || [];

  const statusColors = {
    SUCCESS: "bg-green-100 text-green-800 border-green-200",
    PENDING: "bg-orange-100 text-orange-800 border-orange-200",
    FAILED: "bg-red-100 text-red-800 border-red-200",
  };

  const fulfillmentStatusColors = {
    PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
    SHIPPED: "bg-indigo-100 text-indigo-800 border-indigo-200",
    DELIVERED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.user.first_name} ${order.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.fulfillment_status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
          <span className="text-sm">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Error Loading Orders
          </h3>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">
          Manage and track all customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{orders.reduce((sum, o) => sum + (o.total / 100), 0).toLocaleString()}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Processing</p>
          <p className="text-2xl font-bold text-blue-900">
            {orders.filter(o => o.fulfillment_status === "PROCESSING").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Delivered</p>
          <p className="text-2xl font-bold text-green-900">
            {orders.filter(o => o.fulfillment_status === "DELIVERED").length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-gray-50 border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by order number, customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-black focus:ring-black"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="p-12 text-center bg-gray-50 border-gray-200">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters or search terms"
                : "No orders have been placed yet"}
            </p>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      {order.order_number}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()} at{" "}
                      {new Date(order.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        fulfillmentStatusColors[order.fulfillment_status]
                      }`}
                    >
                      {order.fulfillment_status}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[order.payment_status]
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(order.total / 100).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items_count} item{order.items_count > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-600">Customer</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.user.first_name} {order.user.last_name}
                    </p>
                    <p className="text-xs text-gray-600">{order.user.email}</p>
                    <p className="text-xs text-gray-600">{order.user.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-600">Delivery Address</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.address.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {order.address.address_line1}
                      {order.address.address_line2 && `, ${order.address.address_line2}`}
                    </p>
                    <p className="text-xs text-gray-600">
                      {order.address.city}, {order.address.state} - {order.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-600">Payment</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.payment.provider}
                    </p>
                    <p className="text-xs text-gray-600">
                      ID: {order.payment.provider_payment_id}
                    </p>
                    <p className="text-xs text-gray-600">
                      ₹{(order.payment.provider_amount / 100).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">Order Items</p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-sm"
                    >
                      <div className="w-16 h-20 bg-gray-200 relative flex-shrink-0 rounded-sm overflow-hidden">
                        {item.thumbnail?.url ? (
                          <Image
                            src={item.thumbnail.url}
                            alt={item.title_snapshot}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {item.title_snapshot}
                        </p>
                        <p className="text-xs text-gray-600">SKU: {item.sku_snapshot}</p>
                        <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">
                          ₹{(item.total_price_snapshot / 100).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          ₹{(item.price_snapshot / 100).toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}