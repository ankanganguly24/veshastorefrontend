"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Edit, Package, Settings, LogOut, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuthStore from "@/stores/auth-store";
import { useLogout } from "@/hooks/auth/use-auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, getFullName, getUserInitials } = useAuthStore();
  const logoutMutation = useLogout();
  const router = useRouter();

  // Handle authentication redirect in useEffect
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  // Show loading or return null while redirecting
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
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
                    {getUserInitials()}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{getFullName()}</h2>
                <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                <p className="text-gray-500 text-xs">Member since {formatJoinDate(user.created_at)}</p>
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
                
                <Button 
                  variant="outline" 
                  className="w-full border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
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
                  <h3 className="text-2xl font-bold text-gray-900">0</h3>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">₹</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">₹0</h3>
                  <p className="text-gray-600 text-sm">Total Spent</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {user.is_email_verified ? 'Verified' : 'New'}
                  </h3>
                  <p className="text-gray-600 text-sm">Account Status</p>
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
              
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet</p>
                <Link href="/products">
                  <Button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Account Information */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{getFullName()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg flex items-center">
                    {user.email}
                    {user.is_email_verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg flex items-center">
                    {user.phone}
                    {user.is_phone_verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{formatJoinDate(user.created_at)}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
