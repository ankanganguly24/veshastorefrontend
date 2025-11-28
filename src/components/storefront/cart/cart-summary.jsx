"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

/**
 * CartSummary Component
 * Displays order summary and Razorpay checkout button
 */
export function CartSummary({ items, subtotal }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID', // Replace with your Razorpay key
          amount: subtotal * 100, // Amount in paise
          currency: 'INR',
          name: 'Vesha',
          description: `Order for ${items.length} item(s)`,
          image: '/logo.png', // Your logo
          handler: function (response) {
            toast.success(`Payment Successful! ID: ${response.razorpay_payment_id}`);
            // Handle successful payment - call your backend API
            console.log('Payment successful:', response);
          },
          prefill: {
            name: '',
            email: '',
            contact: ''
          },
          theme: {
            color: '#8B5CF6' // Your primary color
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        setIsProcessing(false);
      };

      script.onerror = () => {
        toast.error("Failed to load payment gateway");
        setIsProcessing(false);
      };
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-8 bg-white border border-gray-200 sticky top-8">
      <h3 className="text-lg font-medium mb-6 text-gray-900">Order Summary</h3>

      <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
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
          <span className="font-medium text-gray-900">₹0</span>
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
        onClick={handleCheckout}
        disabled={isProcessing}
        className="w-full bg-primary text-white py-6 text-sm font-medium hover:bg-primary/90 transition-colors mb-4"
      >
        {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
      </Button>

      <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
        Continue Shopping
      </Link>

      <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-100">
        <ShieldCheck className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
        <p className="text-xs text-gray-500">
          Secure checkout powered by Razorpay
        </p>
      </div>
    </Card>
  );
}
