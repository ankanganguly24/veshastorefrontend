"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import CartService from "@/services/cart-service";
import ProductHeader from "@/components/product/product-header";
import ProductPriceCard from "@/components/product/product-price-card";
import ProductOffers from "@/components/product/product-offers";
import ProductSizeSelector from "@/components/product/product-size-selector";
import ProductColorSelector from "@/components/product/product-color-selector";
import ProductQuantitySelector from "@/components/product/product-quantity-selector";
import ProductActions from "@/components/product/product-actions";

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
      <ProductHeader
        brand={brand}
        category={category}
        name={name}
        rating={rating}
        reviewCount={reviewCount}
        isAddingToWishlist={isAddingToWishlist}
        onToggleWishlist={toggleWishlist}
        onShare={handleShare}
      />

      <ProductPriceCard
        price={price}
        originalPrice={originalPrice}
        discount={discount}
        inStock={inStock}
        stockCount={stockCount}
      />

      <ProductOffers offers={offers} />

      <ProductSizeSelector
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        sizeStockMap={sizeStockMap}
        onSelectSize={setSelectedSize}
      />

      <ProductColorSelector
        availableColors={availableColors}
        selectedColor={selectedColor}
        colorStockMap={colorStockMap}
        onSelectColor={setSelectedColor}
      />

      <ProductQuantitySelector
        quantity={quantity}
        stockCount={stockCount}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
      />

      <ProductActions
        inStock={inStock}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        isAddingToCart={isAddingToCart}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
});

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;