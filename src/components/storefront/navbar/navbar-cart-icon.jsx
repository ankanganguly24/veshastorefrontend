"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartService from "@/services/cart-service";
import { useEffect } from "react";

/**
 * NavbarCartIcon Component
 * Displays cart icon with item count badge
 * Handles cart updates via React Query
 */
export function NavbarCartIcon() {
  const queryClient = useQueryClient();

  // Fetch cart count with React Query
  const { data: cartData, refetch } = useQuery({
    queryKey: ['cart-summary'],
    queryFn: async () => {
      try {
        const summary = await CartService.getCartSummary();
        console.log('Cart summary:', summary);
        return summary;
      } catch (error) {
        console.error('Error fetching cart:', error);
        return { itemCount: 0 };
      }
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const cartItemCount = cartData?.itemCount || 0;

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      console.log('Cart updated - refetching');
      queryClient.invalidateQueries(['cart-summary']);
      queryClient.invalidateQueries(['cart']);
      refetch();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [queryClient, refetch]);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
        <ShoppingCart className="h-5 w-5" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
        <span className="sr-only">Shopping cart ({cartItemCount} items)</span>
      </Button>
    </Link>
  );
}
