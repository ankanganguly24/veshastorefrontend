"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ProductColorSelector = memo(({ 
  availableColors, 
  selectedColor, 
  colorStockMap, 
  onSelectColor 
}) => {
  if (!availableColors || availableColors.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
      <div className="flex flex-wrap gap-2">
        {availableColors.map((color) => {
          const stock = colorStockMap[color];
          const isLowStock = stock > 0 && stock < 10;
          const isOutOfStock = stock === 0;
          
          return (
            <div key={color} className="relative">
              <Button
                variant={selectedColor === color ? "default" : "outline"}
                className={`py-2 px-4 text-sm ${
                  selectedColor === color 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : isOutOfStock
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-primary/5 hover:border-primary/30'
                }`}
                onClick={() => !isOutOfStock && onSelectColor(color)}
                disabled={isOutOfStock}
              >
                {color}
              </Button>
              {isLowStock && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
      {selectedColor && (
        <p className="text-xs text-gray-500 mt-2">
          Selected: {selectedColor}
          {colorStockMap[selectedColor] < 10 && colorStockMap[selectedColor] > 0 && (
            <span className="text-red-600 ml-2 inline-flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Only {colorStockMap[selectedColor]} left
            </span>
          )}
        </p>
      )}
    </div>
  );
});

ProductColorSelector.displayName = "ProductColorSelector";

export default ProductColorSelector;
