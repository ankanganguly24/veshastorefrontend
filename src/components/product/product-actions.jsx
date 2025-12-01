"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const ProductActions = memo(({ 
  inStock, 
  selectedSize, 
  selectedColor, 
  isAddingToCart, 
  onAddToCart 
}) => {
  return (
    <div className="space-y-3">
      <Button 
        className="w-full py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 bg-primary hover:bg-primary/90 text-white"
        disabled={!inStock || !selectedSize || !selectedColor || isAddingToCart}
        onClick={onAddToCart}
      >
        {isAddingToCart ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Adding to Cart...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </div>
        )}
      </Button>
    </div>
  );
});

ProductActions.displayName = "ProductActions";

export default ProductActions;
