"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Star } from "lucide-react";

const ProductHeader = memo(({ 
  brand, 
  category, 
  name, 
  rating, 
  reviewCount,
  isAddingToWishlist,
  onToggleWishlist,
  onShare 
}) => {
  const StarRating = (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating}) • {reviewCount} reviews</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Brand and Category */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-primary font-semibold text-sm uppercase tracking-wide">{brand}</p>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {category}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleWishlist}
            className="hover:bg-primary/5"
            disabled={isAddingToWishlist}
          >
            {isAddingToWishlist ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Heart className="w-5 h-5 text-gray-600" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/5" onClick={onShare}>
            <Share2 className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <div className="flex items-center space-x-2">
          {StarRating}
        </div>
      </div>
    </div>
  );
});

ProductHeader.displayName = "ProductHeader";

export default ProductHeader;
