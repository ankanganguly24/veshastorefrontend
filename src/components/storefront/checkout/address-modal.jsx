"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddressList } from "./address-list";
import { AddressForm } from "./address-form";
import AddressService from "@/services/address-service";
import PaymentService from "@/services/payment-service";
import { toast } from "sonner";

/**
 * AddressModal Component
 * Main modal for address selection and management during checkout
 */
export function AddressModal({ isOpen, onClose, onCheckoutSuccess, cartId }) {
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const queryClient = useQueryClient();

  // Fetch addresses
  const { data: addressData, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await AddressService.getAddresses();
      return res?.data?.addresses || [];
    },
    enabled: isOpen,
  });

  // Set default address as selected when addresses load
  useEffect(() => {
    if (addressData && addressData.length > 0 && !selectedAddressId) {
      const defaultAddress = addressData.find((addr) => addr.is_default);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.address_id);
      }
    }
  }, [addressData, selectedAddressId]);

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: (addressData) => AddressService.addAddress(addressData),
    onSuccess: (response) => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries(["addresses"]);
      setShowForm(false);
      
      // Select the newly added address
      const newAddressId = response?.data?.address?.id;
      if (newAddressId) {
        setSelectedAddressId(newAddressId);
      }
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
      setShowForm(false);
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
      // Clear selection if deleted address was selected
      if (selectedAddressId === deleteAddressMutation.variables) {
        setSelectedAddressId(null);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete address");
    },
  });

  // Checkout mutation - call /payment/checkout API
  const checkoutMutation = useMutation({
    mutationFn: (checkoutData) => PaymentService.checkout(checkoutData),
    onSuccess: (response, variables) => {
      // Store checkout data including razorpay order details in session storage
      const checkoutData = {
        cart_id: variables.cart_id,
        address_id: variables.address_id,
        razorpay_order_id: response?.data?.razorpayOrderDetails?.id,
        amount: response?.data?.razorpayOrderDetails?.amount,
        currency: response?.data?.razorpayOrderDetails?.currency || "INR",
      };
      
      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      
      toast.success("Proceeding to checkout");
      onClose();
      
      // Navigate to checkout page
      if (typeof window !== 'undefined') {
        window.location.href = '/checkout';
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to initiate checkout");
    },
  });

  // Handle continue to checkout - call API
  const handleContinueToCheckout = () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!cartId) {
      toast.error("Cart ID not found");
      return;
    }

    // Call /payment/checkout API
    checkoutMutation.mutate({
      cart_id: cartId,
      address_id: selectedAddressId,
    });
  };

  const handleAddAddress = (data) => {
    // Add latitude and longitude with default values
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
    setShowForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (confirm("Are you sure you want to delete this address?")) {
      deleteAddressMutation.mutate(addressId);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingAddress(null);
    onClose();
  };

  const isSubmitting =
    addAddressMutation.isPending ||
    updateAddressMutation.isPending ||
    deleteAddressMutation.isPending ||
    checkoutMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {showForm
              ? editingAddress
                ? "Edit Address"
                : "Add New Address"
              : "Select Delivery Address"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">Loading addresses...</span>
            </div>
          ) : showForm ? (
            <AddressForm
              onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
              onCancel={handleCancel}
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
              isSubmitting={isSubmitting}
            />
          ) : (
            <>
              <AddressList
                addresses={addressData}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
                onEditAddress={handleEditAddress}
                onDeleteAddress={handleDeleteAddress}
              />

              <div className="mt-6 space-y-3 border-t pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>

                <Button
                  className="w-full bg-black text-white hover:bg-gray-800"
                  onClick={handleContinueToCheckout}
                  disabled={!selectedAddressId || isSubmitting}
                >
                  {checkoutMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue to Checkout"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
