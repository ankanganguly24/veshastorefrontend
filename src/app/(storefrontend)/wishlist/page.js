"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import useWishlistStore from "@/stores/wishlist-store";
import ProductCard from "@/components/common/product-card";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-500">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {/* Content */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-md mb-8">
              Save items you love to your wishlist and review them anytime.
            </p>
            <Link href="/">
              <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-sm font-medium uppercase tracking-wide">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
