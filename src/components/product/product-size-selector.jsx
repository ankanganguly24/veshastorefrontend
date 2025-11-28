"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ProductSizeSelector = memo(({ 
  availableSizes, 
  selectedSize, 
  sizeStockMap, 
  onSelectSize 
}) => {
  if (!availableSizes || availableSizes.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
      <div className="grid grid-cols-6 gap-2">
        {availableSizes.map((size) => {
          const stock = sizeStockMap[size];
          const isLowStock = stock > 0 && stock < 10;
          const isOutOfStock = stock === 0;
          
          return (
            <div key={size} className="relative">
              <Button
                variant={selectedSize === size ? "default" : "outline"}
                className={`py-2 px-3 text-sm w-full ${
                  selectedSize === size 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : isOutOfStock
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-primary/5 hover:border-primary/30'
                }`}
                onClick={() => !isOutOfStock && onSelectSize(size)}
                disabled={isOutOfStock}
              >
                {size}
              </Button>
              {isLowStock && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
      {selectedSize && sizeStockMap[selectedSize] < 10 && sizeStockMap[selectedSize] > 0 && (
        <p className="text-xs text-red-600 mt-2 flex items-center">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Only {sizeStockMap[selectedSize]} left in this size
        </p>
      )}
    </div>
  );
});

ProductSizeSelector.displayName = "ProductSizeSelector";

export default ProductSizeSelector;
