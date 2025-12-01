"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const ProductQuantitySelector = memo(({ 
  quantity, 
  stockCount, 
  onIncrease, 
  onDecrease 
}) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-primary/20 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-primary/5"
            onClick={onDecrease}
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-4 py-2 font-medium text-gray-900 min-w-[50px] text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-primary/5"
            onClick={onIncrease}
            disabled={quantity >= stockCount}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <span className="text-sm text-gray-500">
          {stockCount > 10 ? "10+" : stockCount} available
        </span>
      </div>
    </div>
  );
});

ProductQuantitySelector.displayName = "ProductQuantitySelector";

export default ProductQuantitySelector;
