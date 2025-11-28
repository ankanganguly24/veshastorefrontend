"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import CartService from "@/services/cart-service";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast: showToast } = useToast();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await CartService.getCart();
      return res?.data?.cart || res?.data?.data?.cart || { items: [] };
    },
    staleTime: 2 * 60 * 1000,
  });

  const items = cart?.items || [];
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price_snapshot ?? 0) * item.quantity,
    0
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
          amount: subtotal * 100,
          currency: 'INR',
          name: 'Vesha',
          description: `Order for ${items.length} item(s)`,
          image: '/logo.png',
          handler: function (response) {
            showToast.success(`Payment Successful! ID: ${response.razorpay_payment_id}`);
            // Here you would redirect to success page or call API
          },
          prefill: {
            name: '',
            email: '',
            contact: ''
          },
          theme: {
            color: '#000000'
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
        showToast.error("Failed to load payment gateway");
        setIsProcessing(false);
      };
    } catch (error) {
      console.error('Checkout error:', error);
      showToast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-light mb-4">Your cart is empty</h1>
        <Button asChild variant="outline">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-light mt-4 text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Shipping Address */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Truck className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-medium">Shipping Address</h2>
              </div>
              
              <form id="checkout-form" onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" placeholder="PIN Code" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Phone number" required />
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-medium">Payment Method</h2>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-sm bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-black bg-white" />
                  <span className="font-medium">Razorpay Secure Payment</span>
                </div>
                <div className="flex gap-2">
                  {/* Icons for cards/UPI could go here */}
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                You will be redirected to Razorpay's secure gateway to complete your payment.
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-8 rounded-sm sticky top-8">
              <h3 className="text-lg font-medium mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-200 relative flex-shrink-0">
                      {item.thumbnail_media?.url && (
                        <Image src={item.thumbnail_media.url} alt={item.title_snapshot} fill className="object-cover" />
                      )}
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title_snapshot}</p>
                      <p className="text-xs text-gray-500">{item.variant_snapshot?.options?.map(o => o.value).join(' / ')}</p>
                    </div>
                    <p className="text-sm font-medium">₹{(item.price_snapshot * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-base pt-4 border-t border-gray-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full mt-8 h-12 bg-black hover:bg-gray-800 text-white"
              >
                {isProcessing ? 'Processing...' : `Pay ₹${subtotal.toLocaleString()}`}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-3 h-3" />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
