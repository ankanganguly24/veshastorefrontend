"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * CartSummary Component
 * Displays order summary and checkout button
 */
export function CartSummary({ items, subtotal }) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg sticky top-8">
      <h3 className="text-xl font-bold mb-6">Order Summary</h3>

      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">₹0</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 text-lg font-semibold hover:shadow-lg transition-all mb-4">
        Proceed to Checkout
      </Button>

      <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Continue Shopping
      </Link>

      <p className="text-xs text-gray-500 text-center mt-4">
        Secure checkout powered by our payment gateway
      </p>
    </Card>
  );
}
