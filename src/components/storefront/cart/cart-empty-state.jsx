"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * CartEmptyState Component
 * Displays when cart is empty
 */
export function CartEmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto p-12 text-center bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add items to get started</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              Start Shopping
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
