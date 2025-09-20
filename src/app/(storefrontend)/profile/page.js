"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Edit, Package, Settings, LogOut, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    avatar: null,
    joinDate: "March 2024",
    totalOrders: 12,
    totalSpent: 45680
  });

  const recentOrders = [
    { id: "ORD001", date: "2024-09-15", status: "Delivered", amount: 2299, items: 2 },
    { id: "ORD002", date: "2024-09-10", status: "In Transit", amount: 1599, items: 1 },
    { id: "ORD003", date: "2024-09-05", status: "Processing", amount: 3499, items: 3 },
  ];

  const statusColors = {
    "Delivered": "bg-green-100 text-green-800",
    "In Transit": "bg-blue-100 text-blue-800", 
    "Processing": "bg-orange-100 text-orange-800",
    "Cancelled": "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account and track your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                <p className="text-gray-500 text-xs">Member since {user.joinDate}</p>
              </div>

              <div className="space-y-3 ">
                <Link href="/profile/edit">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                
                <Link href="/orders">
                  <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50 my-4">
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                
                <Button variant="outline" className="w-full border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{user.totalOrders}</h3>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">₹</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">₹{user.totalSpent.toLocaleString()}</h3>
                  <p className="text-gray-600 text-sm">Total Spent</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">VIP</h3>
                  <p className="text-gray-600 text-sm">Member Status</p>
                </div>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                <Link href="/orders">
                  <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                    View All
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Order {order.id}</p>
                        <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Account Information */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{user.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{user.joinDate}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
