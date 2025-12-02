"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartService from "@/services/cart-service";
import { Button } from "@/components/ui/button";
import { Star, Heart, Share2, Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/auth-store";

const ProductInfo = memo(({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  const {
    id: productId,
    name,
    brand,
    category,
    rating,
    reviewCount,
    offers,
    variants = [],
  } = useMemo(() => product, [product]);

  // Extract unique sizes and colors
  const { availableSizes, availableColors } = useMemo(() => {
    const sizes = new Set();
    const colors = new Set();

    variants.forEach(variant => {
      variant.variantOptions?.forEach(option => {
        const optionName = option.optionValue?.optionDefinition?.name?.toLowerCase();
        if (optionName === 'size') sizes.add(option.optionValue.value);
        else if (optionName === 'color') colors.add(option.optionValue.value);
      });
    });

    return {
      availableSizes: Array.from(sizes),
      availableColors: Array.from(colors)
    };
  }, [variants]);

  // Set defaults
  useEffect(() => {
    if (!selectedSize && availableSizes.length > 0) setSelectedSize(availableSizes[0]);
    if (!selectedColor && availableColors.length > 0) setSelectedColor(availableColors[0]);
  }, [availableSizes, availableColors, selectedSize, selectedColor]);

  // Find current variant
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

  const price = currentVariant?.price || 0;
  const originalPrice = currentVariant?.compare_at_price || null;
  const discount = (originalPrice && price) 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : null;
  const inStock = (currentVariant?.stock_quantity || 0) > 0;
  const stockCount = currentVariant?.stock_quantity || 0;

  const handleAddToCart = useCallback(async () => {
    // Check authentication first
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    if (!currentVariant?.id) return;
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    
    try {
      await CartService.addToCart({
        variant_id: currentVariant.id,
        product_id: productId,
        quantity: quantity
      });
      toast.success(`${name} has been added to your cart.`);
      setIsAddingToCart(false);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add to cart");
      setIsAddingToCart(false);
    }
  }, [selectedSize, selectedColor, quantity, productId, currentVariant, name, isAddingToCart, toast, isAuthenticated, user]);

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    router.push("/login");
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{brand}</span>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-light text-gray-900 tracking-tight">{name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium text-gray-900">₹{price.toLocaleString()}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-lg text-gray-400 line-through font-light">₹{originalPrice.toLocaleString()}</span>
              )}
            </div>
            {discount && (
              <span className="bg-red-50 text-red-600 text-xs font-medium px-2 py-1 rounded-sm uppercase tracking-wider">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Selectors */}
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <span className="text-sm font-medium text-gray-900 mb-3 block">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></span>
            <div className="flex flex-wrap gap-3">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === color 
                      ? "border-primary ring-1 ring-primary ring-offset-2" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                >
                  {selectedColor === color && (
                    <Check className={`w-4 h-4 ${['white', '#ffffff', '#fff'].includes(color.toLowerCase()) ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <span className="text-sm font-medium text-gray-900 mb-3 block">Size: <span className="text-gray-500 font-normal">{selectedSize}</span></span>
            <div className="flex flex-wrap gap-3">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-10 min-w-[40px] px-3 rounded-sm border text-sm font-medium transition-all ${
                    selectedSize === size 
                      ? "border-primary bg-primary text-white" 
                      : "border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <span className="text-sm font-medium text-gray-900 mb-3 block">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-sm w-fit">
              <button 
                onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <button 
                onClick={() => quantity < stockCount && setQuantity(q => q + 1)}
                className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={quantity >= stockCount}
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button 
            onClick={handleAddToCart}
            disabled={!inStock || isAddingToCart}
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-sm font-medium text-sm uppercase tracking-wide"
          >
            {isAddingToCart ? (
              "Adding..."
            ) : !inStock ? (
              "Out of Stock"
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </span>
            )}
          </Button>
        </div>

        {/* Offers */}
        <div className="bg-gray-50 p-4 rounded-sm space-y-3">
          {offers?.map((offer, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>{offer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Login Required
              </h3>
              <p className="text-gray-600 text-sm">
                You need to login first to add items to your cart. Please login or create an account to continue shopping.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowLoginModal(false)}
                className="flex-1 h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLoginRedirect}
                className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white"
              >
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;