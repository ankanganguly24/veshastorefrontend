"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Edit, Package, LogOut, MapPin, Plus, Home, Briefcase, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/stores/auth-store";
import { useLogout } from "@/hooks/auth/use-auth";
import { useRouter } from "next/navigation";
import AddressService from "@/services/address-service";
import OrderService from "@/services/order-service";
import { AddressForm } from "@/components/storefront/checkout/address-form";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isAuthenticated, getFullName, getUserInitials } = useAuthStore();
  const logoutMutation = useLogout();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Handle authentication redirect
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  // Fetch addresses
  const { data: addressData } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await AddressService.getAddresses();
      return res?.data?.addresses || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch orders for stats
  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await OrderService.getOrderHistory();
      return res?.data?.orders || [];
    },
    enabled: isAuthenticated,
  });

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: (addressData) => AddressService.addAddress(addressData),
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries(["addresses"]);
      setShowAddressForm(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add address");
    },
  });

  // Update address mutation
  const updateAddressMutation = useMutation({
    mutationFn: ({ addressId, addressData }) =>
      AddressService.updateAddress(addressId, addressData),
    onSuccess: () => {
      toast.success("Address updated successfully");
      queryClient.invalidateQueries(["addresses"]);
      setShowAddressForm(false);
      setEditingAddress(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update address");
    },
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: (addressId) => AddressService.deleteAddress(addressId),
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries(["addresses"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete address");
    },
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const addresses = addressData || [];
  const orders = ordersData || [];
  const totalSpent = orders.reduce((sum, order) => sum + (order.total / 100), 0);

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

  const handleAddAddress = (data) => {
    const addressData = {
      ...data,
      latitude: 0,
      longitude: 0,
    };
    addAddressMutation.mutate(addressData);
  };

  const handleUpdateAddress = (data) => {
    if (!editingAddress) return;
    
    updateAddressMutation.mutate({
      addressId: editingAddress.address_id,
      addressData: data,
    });
  };

  const handleEditAddress = (userAddress) => {
    setEditingAddress(userAddress);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (confirm("Are you sure you want to delete this address?")) {
      deleteAddressMutation.mutate(addressId);
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "HOME":
        return <Home className="w-4 h-4" />;
      case "WORK":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getAddressLabel = (address) => {
    if (address.address_type === "OTHER" && address.custom_label) {
      return address.custom_label;
    }
    return address.address_type;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2 text-gray-900 tracking-tight">
            My Profile
          </h1>
          <div className="w-12 h-px bg-primary mb-3"></div>
          <p className="text-sm text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gray-50 border-gray-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {getUserInitials()}
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-1">{getFullName()}</h2>
                <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                <p className="text-gray-500 text-xs">Member since {formatJoinDate(user.created_at)}</p>
              </div>

              <div className="space-y-3">
                <Link href="/profile/edit">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                
                <Link href="/orders">
                  <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </Button>
                </Link>
                
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

            {/* Stats */}
            <Card className="p-6 bg-gray-50 border-gray-200 mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Account Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="text-sm font-semibold text-gray-900">{orders.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="text-sm font-semibold text-gray-900">₹{totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Saved Addresses</span>
                  <span className="text-sm font-semibold text-gray-900">{addresses.length}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <Card className="p-6 bg-gray-50 border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <p className="text-gray-900 bg-white p-3 rounded-sm border border-gray-200">{getFullName()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="text-gray-900 bg-white p-3 rounded-sm border border-gray-200 flex items-center justify-between">
                    <span className="text-sm">{user.email}</span>
                    {user.is_email_verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="text-gray-900 bg-white p-3 rounded-sm border border-gray-200 flex items-center justify-between">
                    <span className="text-sm">{user.phone || "Not provided"}</span>
                    {user.is_phone_verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <p className="text-gray-900 bg-white p-3 rounded-sm border border-gray-200">{formatJoinDate(user.created_at)}</p>
                </div>
              </div>
            </Card>

            {/* Saved Addresses */}
            <Card className="p-6 bg-gray-50 border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Saved Addresses</h3>
                <Button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddressForm(!showAddressForm);
                  }}
                  size="sm"
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </div>

              {showAddressForm ? (
                <div className="bg-white p-6 rounded-sm border border-gray-200 mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h4>
                  <AddressForm
                    onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
                    onCancel={() => {
                      setShowAddressForm(false);
                      setEditingAddress(null);
                    }}
                    initialData={
                      editingAddress
                        ? {
                            address_type: editingAddress.address.address_type,
                            custom_label: editingAddress.address.custom_label,
                            country: editingAddress.address.country,
                            state: editingAddress.address.state,
                            city: editingAddress.address.city,
                            pincode: editingAddress.address.pincode,
                            address_line1: editingAddress.address.address_line1,
                            address_line2: editingAddress.address.address_line2,
                            landmark: editingAddress.address.landmark,
                            name: editingAddress.name,
                            phone: editingAddress.phone,
                            is_default: editingAddress.is_default,
                          }
                        : null
                    }
                    isSubmitting={addAddressMutation.isPending || updateAddressMutation.isPending}
                  />
                </div>
              ) : null}

              {addresses.length === 0 && !showAddressForm ? (
                <div className="text-center py-8 bg-white rounded-sm border border-gray-200">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No saved addresses</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((userAddress) => {
                    const address = userAddress.address;
                    return (
                      <div
                        key={userAddress.id}
                        className="bg-white p-4 rounded-sm border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getAddressIcon(address.address_type)}
                              <span className="font-medium text-sm">
                                {getAddressLabel(address)}
                              </span>
                              {userAddress.is_default && (
                                <span className="text-xs bg-black text-white px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="font-medium text-gray-900 text-sm mb-1">
                              {userAddress.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.address_line1}
                              {address.address_line2 && `, ${address.address_line2}`}
                            </p>
                            {address.landmark && (
                              <p className="text-sm text-gray-600">
                                Landmark: {address.landmark}
                              </p>
                            )}
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-gray-600">{address.country}</p>
                            <p className="text-sm text-gray-900 mt-1">
                              Phone: {userAddress.phone}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-600 hover:text-gray-900"
                              onClick={() => handleEditAddress(userAddress)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteAddress(userAddress.address_id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
