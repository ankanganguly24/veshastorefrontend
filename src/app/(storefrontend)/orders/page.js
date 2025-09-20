"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Search, Filter, Eye, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD001",
      date: "2024-09-15",
      status: "Delivered",
      amount: 2299,
      items: [
        { name: "Nawabi Royal Kurta Set", image: "/placeholder.jpg", quantity: 1, price: 2299 }
      ],
      deliveryDate: "2024-09-18",
      trackingNumber: "VES123456789"
    },
    {
      id: "ORD002", 
      date: "2024-09-10",
      status: "In Transit",
      amount: 1599,
      items: [
        { name: "Designer Peplum Jacket", image: "/placeholder.jpg", quantity: 1, price: 1599 }
      ],
      estimatedDelivery: "2024-09-20",
      trackingNumber: "VES987654321"
    },
    {
      id: "ORD003",
      date: "2024-09-05", 
      status: "Processing",
      amount: 3499,
      items: [
        { name: "Elegant Kaftan Dress", image: "/placeholder.jpg", quantity: 1, price: 1599 },
        { name: "Stylish Co-ord Set", image: "/placeholder.jpg", quantity: 1, price: 1900 }
      ],
      estimatedDelivery: "2024-09-22"
    },
    {
      id: "ORD004",
      date: "2024-08-28",
      status: "Delivered", 
      amount: 1299,
      items: [
        { name: "Embroidered Shrug", image: "/placeholder.jpg", quantity: 1, price: 1299 }
      ],
      deliveryDate: "2024-09-02",
      trackingNumber: "VES555666777"
    },
    {
      id: "ORD005",
      date: "2024-08-20",
      status: "Cancelled",
      amount: 2499,
      items: [
        { name: "Festive Wear Set", image: "/placeholder.jpg", quantity: 1, price: 2499 }
      ],
      cancelDate: "2024-08-21"
    }
  ];

  const statusColors = {
    "Delivered": "bg-green-100 text-green-800 border-green-200",
    "In Transit": "bg-blue-100 text-blue-800 border-blue-200",
    "Processing": "bg-orange-100 text-orange-800 border-orange-200",
    "Cancelled": "bg-red-100 text-red-800 border-red-200"
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="in transit">In Transit</option>
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
            <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your filters or search terms"
                  : "You haven't placed any orders yet"
                }
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Start Shopping
                </Button>
              </Link>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Order {order.id}</h3>
                      <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Order Status Info */}
                <div className="border-t pt-4">
                  {order.status === "Delivered" && (
                    <p className="text-sm text-green-600 mb-2">
                      ✓ Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                    </p>
                  )}
                  {order.status === "In Transit" && (
                    <p className="text-sm text-blue-600 mb-2">
                      📦 Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  )}
                  {order.status === "Processing" && (
                    <p className="text-sm text-orange-600 mb-2">
                      ⏳ Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  )}
                  {order.status === "Cancelled" && (
                    <p className="text-sm text-red-600 mb-2">
                      ❌ Cancelled on {new Date(order.cancelDate).toLocaleDateString()}
                    </p>
                  )}
                  
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600 mb-4">
                      Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  {order.status === "Delivered" && (
                    <>
                      <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                        <Download className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </>
                  )}
                  
                  {order.status === "In Transit" && (
                    <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                      📍 Track Order
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-purple-100">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
