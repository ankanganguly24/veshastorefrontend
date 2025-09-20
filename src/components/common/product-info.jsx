"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw, ShoppingCart, Check } from "lucide-react";
import { CartService, WishlistService } from "@/lib/cart-service";
import ReviewModal from "./review-modal";

const ProductInfo = memo(({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Default");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  // Memoized product destructuring
  const {
    name,
    brand,
    price,
    originalPrice,
    discount,
    category,
    inStock,
    stockCount,
    rating,
    reviewCount,
    offers
  } = useMemo(() => product, [product]);

  const sizes = useMemo(() => ["XS", "S", "M", "L", "XL", "XXL"], []);
  const colors = useMemo(() => ["Default", "Black", "White", "Navy", "Maroon"], []);

  // Check cart and wishlist status on mount
  useEffect(() => {
    setIsInCart(CartService.isInCart(product.id, selectedSize, selectedColor));
    setIsWishlisted(WishlistService.isInWishlist(product.id));
  }, [product.id, selectedSize, selectedColor]);

  // Listen for cart and wishlist updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setIsInCart(CartService.isInCart(product.id, selectedSize, selectedColor));
    };

    const handleWishlistUpdate = () => {
      setIsWishlisted(WishlistService.isInWishlist(product.id));
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [product.id, selectedSize, selectedColor]);

  // Memoized Star Rating component
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

  const handleAddToCart = useCallback(async () => {
    if (!selectedSize) {
      // Could show a subtle error indicator instead of alert
      console.warn('Please select a size');
      return;
    }

    if (isAddingToCart) return;

    setIsAddingToCart(true);
    
    try {
      await CartService.addToCart(product, selectedSize, selectedColor, quantity);
      setIsInCart(true);
      
      // Silent success - no alert needed
      console.log(`${name} added to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Could show error toast instead of alert
    } finally {
      setIsAddingToCart(false);
    }
  }, [selectedSize, selectedColor, quantity, product, name, isAddingToCart]);

  const handleBuyNow = useCallback(async () => {
    if (!selectedSize) {
      // Could show a subtle error indicator instead of alert
      console.warn('Please select a size');
      return;
    }

    // Add to cart first, then redirect to checkout
    try {
      await CartService.addToCart(product, selectedSize, selectedColor, quantity);
      // Redirect to checkout/cart page
      window.location.href = '/cart';
    } catch (error) {
      console.error('Error during buy now:', error);
      // Could show error toast instead of alert
    }
  }, [selectedSize, selectedColor, quantity, product]);

  const toggleWishlist = useCallback(async () => {
    if (isAddingToWishlist) return;

    setIsAddingToWishlist(true);
    
    try {
      if (isWishlisted) {
        await WishlistService.removeFromWishlist(product.id);
        setIsWishlisted(false);
      } else {
        await WishlistService.addToWishlist(product);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsAddingToWishlist(false);
    }
  }, [isAddingToWishlist, isWishlisted, product]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this amazing ${category}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // Silent copy - no alert needed
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
            className={`hover:bg-purple-50 ${isWishlisted ? 'bg-red-50' : ''}`}
            disabled={isAddingToWishlist}
          >
            {isAddingToWishlist ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
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
        
        {/* Rating */}
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
          <span className={`text-sm font-medium ${inStock ? 'text-green-700' : 'text-red-700'}`}>
            {inStock ? `In Stock (${stockCount} items available)` : 'Out of Stock'}
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
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
        <div className="grid grid-cols-6 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              className={`py-2 px-3 text-sm ${
                selectedSize === size 
                  ? 'bg-purple-600 text-white' 
                  : 'hover:bg-purple-50 hover:border-purple-300'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Button
              key={color}
              variant={selectedColor === color ? "default" : "outline"}
              className={`py-2 px-4 text-sm ${
                selectedColor === color 
                  ? 'bg-purple-600 text-white' 
                  : 'hover:bg-purple-50 hover:border-purple-300'
              }`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </Button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Selected: {selectedColor}</p>
      </div>

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
          className={`w-full py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 ${
            isInCart 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
          }`}
          disabled={!inStock || !selectedSize || isAddingToCart}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Adding to Cart...
            </>
          ) : isInCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 py-3 px-6 rounded-lg font-semibold"
            disabled={!inStock || !selectedSize}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
          
          <ReviewModal productId={product.id} productName={product.name}>
            <Button 
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-semibold"
            >
              Write Review
            </Button>
          </ReviewModal>
        </div>
      </div>

      {/* Service Features */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-100">
        <div className="text-center">
          <Truck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Free Shipping</p>
        </div>
        <div className="text-center">
          <RotateCcw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Easy Returns</p>
        </div>
        <div className="text-center">
          <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-xs text-gray-600">Secure Payment</p>
        </div>
      </div>
    </div>
  );
});

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
