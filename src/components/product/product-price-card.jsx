"use client";

import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const ProductPriceCard = memo(({ price, originalPrice, discount, inStock, stockCount }) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-3xl font-bold text-primary">
          ₹{price}
        </span>
        {originalPrice && originalPrice > price && (
          <>
            <span className="text-xl text-gray-500 line-through">₹{originalPrice}</span>
            <Badge variant="destructive" className="bg-red-500 text-white">
              {discount}% OFF
            </Badge>
          </>
        )}
      </div>
      
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${stockCount < 10 && inStock ? 'text-red-700' : inStock ? 'text-green-700' : 'text-red-700'}`}>
          {inStock ? (
            stockCount < 10 ? (
              <span className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Only {stockCount} items left!
              </span>
            ) : (
              `In Stock (${stockCount} items available)`
            )
          ) : (
            'Out of Stock'
          )}
        </span>
      </div>
    </Card>
  );
});

ProductPriceCard.displayName = "ProductPriceCard";

export default ProductPriceCard;
