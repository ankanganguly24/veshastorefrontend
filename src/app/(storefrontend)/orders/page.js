"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import OrderService from "@/services/order-service";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch orders from API
  const { data: ordersData, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await OrderService.getOrderHistory();
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
      order.items.some((item) =>
        item.title_snapshot.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2 text-gray-900 tracking-tight">
            My Orders
          </h1>
          <div className="w-12 h-px bg-primary mb-3"></div>
          <p className="text-sm text-gray-600">
            Track and manage your orders
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 bg-gray-50 border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders or products..."
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
                  <option value="all">All Orders</option>
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
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <Card className="p-12 text-center bg-gray-50 border-gray-200">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters or search terms"
                  : "You haven't placed any orders yet"}
              </p>
              <Link href="/">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Start Shopping
                </Button>
              </Link>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow"
              >
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
                        Placed on{" "}
                        {new Date(order.created_at).toLocaleDateString()}
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
                        {order.items.length} item
                        {order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-sm"
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
                        <h4 className="font-medium text-gray-900 text-sm">
                          {item.title_snapshot}
                        </h4>
                        <p className="text-xs text-gray-600">
                          SKU: {item.sku_snapshot}
                        </p>
                        <p className="text-xs text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">
                        ₹{(item.total_price_snapshot / 100).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                {order.address && (
                  <div className="border-t pt-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Delivery Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      {order.address.address_line1}
                      {order.address.address_line2 &&
                        `, ${order.address.address_line2}`}
                    </p>
                    {order.address.landmark && (
                      <p className="text-sm text-gray-600">
                        Landmark: {order.address.landmark}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.pincode}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.address.country}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    View Details
                  </Button>

                  {order.fulfillment_status === "DELIVERED" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Reorder
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
