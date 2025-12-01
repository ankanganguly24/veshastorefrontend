"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressModal } from "@/components/storefront/checkout/address-modal";

/**
 * CartSummary Component
 * Displays order summary and link to checkout
 */
export function CartSummary({ items, subtotal, cartId }) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const router = useRouter();

  const handleCheckoutSuccess = (response) => {
    // Handle successful checkout response
    console.log("Checkout response:", response);
    // Navigate to checkout page or payment page based on response
    router.push("/checkout");
  };

  return (
    <>
      <div className="bg-gray-50 p-8 rounded-sm sticky top-8">
        <h3 className="text-lg font-medium mb-6 text-gray-900">Order Summary</h3>

        <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({items.length} items)</span>
            <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">Calculated at checkout</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-base">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">
              ₹{subtotal.toLocaleString()}
            </span>
          </div>
        </div>

        <Button 
          onClick={() => setIsAddressModalOpen(true)}
          className="w-full bg-black text-white py-6 text-sm font-medium hover:bg-gray-800 transition-colors mb-4"
        >
          Proceed to Checkout
        </Button>

        <a href="/" className="inline-flex items-center justify-center w-full text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Continue Shopping
        </a>

        <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-200">
          <ShieldCheck className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          <p className="text-xs text-gray-500">
            Secure checkout
          </p>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onCheckoutSuccess={handleCheckoutSuccess}
        cartId={cartId}
      />
    </>
  );
}
