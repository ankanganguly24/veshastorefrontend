"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useWishlistStore from "@/stores/wishlist-store";
import { useEffect, useState } from "react";

export function NavbarWishlistIcon() {
  const { items } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
        <Heart className="h-5 w-5" />
      </Button>
    );
  }

  const count = items.length;

  return (
    <Link href="/wishlist">
      <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
        <Heart className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
            {count > 99 ? '99+' : count}
          </span>
        )}
        <span className="sr-only">Wishlist ({count} items)</span>
      </Button>
    </Link>
  );
}
