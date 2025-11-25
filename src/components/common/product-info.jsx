"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw, ShoppingCart, Check, AlertTriangle } from "lucide-react";
import CartService from "@/services/cart-service";
import ReviewModal from "./review-modal";

const ProductInfo = memo(({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const {
    id: productId,
    name,
    brand,
    category,
    rating,
    reviewCount,
    offers,
    variants = [],
    media = []
  } = useMemo(() => product, [product]);

  // Extract unique sizes and colors from variants
  const { availableSizes, availableColors } = useMemo(() => {
    const sizes = new Set();
    const colors = new Set();

    variants.forEach(variant => {
      variant.variantOptions?.forEach(option => {
        const optionName = option.optionValue?.optionDefinition?.name?.toLowerCase();
        if (optionName === 'size') {
          sizes.add(option.optionValue.value);
        } else if (optionName === 'color') {
          colors.add(option.optionValue.value);
        }
      });
    });

    return {
      availableSizes: Array.from(sizes),
      availableColors: Array.from(colors)
    };
  }, [variants]);

  // Set default selections on mount
  useEffect(() => {
    if (!selectedSize && availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    }
    if (!selectedColor && availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableSizes, availableColors, selectedSize, selectedColor]);

  // Find current variant based on selections
  const currentVariant = useMemo(() => {
    if (!selectedSize && !selectedColor) return variants[0];
    
    return variants.find(variant => {
      const options = variant.variantOptions || [];
      const sizeMatch = !selectedSize || options.some(opt => 
        opt.optionValue?.optionDefinition?.name?.toLowerCase() === 'size' && 
        opt.optionValue?.value === selectedSize
      );
      const colorMatch = !selectedColor || options.some(opt => 
        opt.optionValue?.optionDefinition?.name?.toLowerCase() === 'color' && 
        opt.optionValue?.value === selectedColor
      );
      return sizeMatch && colorMatch;
    }) || variants[0];
  }, [variants, selectedSize, selectedColor]);

  // Get stock info for each size with current color
  const sizeStockMap = useMemo(() => {
    const stockMap = {};
    availableSizes.forEach(size => {
      const variant = variants.find(v => {
        const options = v.variantOptions || [];
        const sizeMatch = options.some(opt => 
          opt.optionValue?.optionDefinition?.name?.toLowerCase() === 'size' && 
          opt.optionValue?.value === size
        );
        const colorMatch = !selectedColor || options.some(opt => 
          opt.optionValue?.optionDefinition?.name?.toLowerCase() === 'color' && 
          opt.optionValue?.value === selectedColor
        );
        return sizeMatch && colorMatch;
      });
      stockMap[size] = variant?.stock_quantity || 0;
    });
    return stockMap;
  }, [variants, availableSizes, selectedColor]);

  // Get stock info for each color with current size
  const colorStockMap = useMemo(() => {
    const stockMap = {};
    availableColors.forEach(color => {
      const variant = variants.find(v => {
        const options = v.variantOptions || [];
        const colorMatch = options.some(opt => 
          opt.optionValue?.optionDefinition?.name?.toLowerCase() === 'color' && 
          opt.optionValue?.value === color
        );
        const sizeMatch = !selectedSize || options.some(opt => 
          opt.optionValue?.optionDefinition?.name?.toLowerCase() === 'size' && 
          opt.optionValue?.value === selectedSize
        );
        return colorMatch && sizeMatch;
      });
      stockMap[color] = variant?.stock_quantity || 0;
    });
    return stockMap;
  }, [variants, availableColors, selectedSize]);

  const price = currentVariant?.price || 0;
  const originalPrice = currentVariant?.compare_at_price || null;
  const discount = (originalPrice && price) 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : null;
  const inStock = (currentVariant?.stock_quantity || 0) > 0;
  const stockCount = currentVariant?.stock_quantity || 0;

  const StarRating = useMemo(() => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating}) • {reviewCount} reviews</span>
    </div>
  ), [rating, reviewCount]);

  const increaseQuantity = useCallback(() => {
    if (quantity < stockCount) {
      setQuantity(prev => prev + 1);
    }
  }, [quantity, stockCount]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }, [quantity]);

  // Get responsive image URL from media variants
  const getResponsiveImageUrl = useCallback((isMobile = false) => {
    if (!media || media.length === 0) return null;
    
    const primaryMedia = media.find(m => m.is_primary) || media[0];
    if (!primaryMedia?.media?.variants) return primaryMedia?.media?.url;

    // For mobile: use 360p, for web: use 720p
    const targetResolution = isMobile ? '360p' : '720p';
    const imageVariant = primaryMedia.media.variants.find(
      v => v.variant_key === 'thumbnail' && v.metadata?.resolution === targetResolution
    );

    return imageVariant?.url || primaryMedia.media.url;
  }, [media]);

  const handleAddToCart = useCallback(async () => {
    if (!selectedSize || !selectedColor) {
      console.warn('Please select size and color');
      return;
    }

    if (!currentVariant?.id) {
      console.warn('Variant ID not found');
      return;
    }

    if (isAddingToCart) return;

    setIsAddingToCart(true);
    
    try {
      const cartPayload = {
        variant_id: currentVariant.id,
        product_id: productId,
        quantity: quantity
      };

      await CartService.addToCart(cartPayload);
      console.log(`${name} added to cart successfully!`);
      setIsAddingToCart(false);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  }, [selectedSize, selectedColor, quantity, productId, currentVariant, name]);

  const handleBuyNow = useCallback(async () => {
    if (!selectedSize || !selectedColor) {
      console.warn('Please select size and color');
      return;
    }

    if (!currentVariant?.id) {
      console.warn('Variant ID not found');
      return;
    }

    try {
      const cartPayload = {
        variant_id: currentVariant.id,
        product_id: productId,
        quantity: quantity
      };

      await CartService.addToCart(cartPayload);
      window.location.href = '/cart';
    } catch (error) {
      console.error('Error during buy now:', error);
    }
  }, [selectedSize, selectedColor, quantity, productId, currentVariant]);

  const toggleWishlist = useCallback(() => {
    setIsAddingToWishlist(true);
    
    try {
      // Wishlist logic would go here
      console.log('Wishlist toggled');
      setIsAddingToWishlist(false);
    } catch (error) {
      console.error('Error updating wishlist:', error);
      setIsAddingToWishlist(false);
    }
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this amazing ${category}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard!');
    }
  }, [name, category]);

  return (
    <div className="space-y-6">
      {/* Brand and Category */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wide">{brand}</p>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {category}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleWishlist}
            className="hover:bg-purple-50"
            disabled={isAddingToWishlist}
          >
            {isAddingToWishlist ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Heart className="w-5 h-5 text-gray-600" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-purple-50" onClick={handleShare}>
            <Share2 className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <div className="flex items-center space-x-2 mb-4">
          {StarRating}
        </div>
      </div>

      {/* Price Section */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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

      {/* Offers */}
      {offers && offers.length > 0 && (
        <Card className="p-4 bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Special Offers</h3>
          <ul className="space-y-1">
            {offers.map((offer, index) => (
              <li key={index} className="text-sm text-green-700 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                {offer}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Size Selection */}
      {availableSizes.length > 0 && (
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
                        ? 'bg-purple-600 text-white' 
                        : isOutOfStock
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-purple-50 hover:border-purple-300'
                    }`}
                    onClick={() => !isOutOfStock && setSelectedSize(size)}
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
      )}

      {/* Color Selection */}
      {availableColors.length > 0 && (
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
                        ? 'bg-purple-600 text-white' 
                        : isOutOfStock
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-purple-50 hover:border-purple-300'
                    }`}
                    onClick={() => !isOutOfStock && setSelectedColor(color)}
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
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-purple-200 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-purple-50"
              onClick={decreaseQuantity}
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
              className="h-10 w-10 hover:bg-purple-50"
              onClick={increaseQuantity}
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

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-900 text-white"
          disabled={!inStock || !selectedSize || !selectedColor || isAddingToCart}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Adding to Cart...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
        
      </div>
    </div>
  );
});

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;