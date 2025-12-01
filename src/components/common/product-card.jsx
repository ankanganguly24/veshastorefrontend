"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Skeleton loader component
const ImageSkeleton = memo(() => (
  <div className="w-full h-full bg-gray-100 animate-pulse" />
));
ImageSkeleton.displayName = "ImageSkeleton";

// Optimized Image component with lazy loading and caching
const OptimizedImage = memo(({ src, alt, className, currentIndex, isActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  if (hasError) {
    return (
      <div className={`w-full h-full bg-gray-50 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-xs">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && <ImageSkeleton />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-700 ease-in-out ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        priority={currentIndex === 0} // Prioritize first image
        loading={currentIndex === 0 ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />
    </>
  );
});
OptimizedImage.displayName = "OptimizedImage";

const ProductCard = memo(({ product, className = "" }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Memoize product destructuring
  const {
    id,
    name,
    price,
    originalPrice,
    discount,
    category,
    rating = 4.8,
    image,
    images = [],
  } = useMemo(() => product, [product]);

  // Memoize processed images
  const productImages = useMemo(() => {
    return images.length > 0 ? images : (image ? [image] : []);
  }, [images, image]);

  const hasMultipleImages = useMemo(() => productImages.length > 1, [productImages.length]);

  // Auto-rotate images when hovered
  useEffect(() => {
    if (!hasMultipleImages || !isHovered) return;

    let interval;
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 2000);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
    };
  }, [hasMultipleImages, isHovered, productImages.length]);

  // Preload images
  useEffect(() => {
    if (productImages.length > 1) {
      productImages.forEach((src, index) => {
        if (index > 0) {
          const img = new window.Image();
          img.src = src;
        }
      });
    }
  }, [productImages]);

  const nextImage = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  }, [productImages.length]);

  const prevImage = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  }, [productImages.length]);

  const goToImage = useCallback((index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (hasMultipleImages) setCurrentImageIndex(0);
  }, [hasMultipleImages]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  }, []);

  const handleCardClick = useCallback(() => {
    router.push(`/product/${id}`);
  }, [id, router]);

  return (
    <div 
      className={`group relative bg-white cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        {/* Image Container */}
        <div className="relative w-full h-full">
          {productImages.length > 0 ? (
            <div className="relative w-full h-full">
              <OptimizedImage
                src={productImages[currentImageIndex]}
                alt={name}
                currentIndex={currentImageIndex}
                isActive={true}
              />
              
              {/* Navigation Arrows */}
              {hasMultipleImages && isHovered && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full transition-all z-10"
                    onClick={prevImage}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-900" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full transition-all z-10"
                    onClick={nextImage}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-900" />
                  </button>
                </>
              )}

              {/* Image Dots */}
              {hasMultipleImages && isHovered && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white w-4' 
                          : 'bg-white/50 w-1.5 hover:bg-white/80'
                      }`}
                      onClick={(e) => goToImage(index, e)}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <ShoppingBag className="w-8 h-8" />
            </div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-medium px-2 py-1 uppercase tracking-wider">
              -{discount}%
            </span>
          )}
          {category && (
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-medium px-2 py-1 uppercase tracking-wider">
              {category}
            </span>
          )}
        </div>

        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            className="w-full bg-white text-gray-900 hover:bg-gray-900 hover:text-white border border-gray-200 shadow-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            Quick View
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            ₹{price?.toLocaleString()}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-gray-500 line-through">
              ₹{originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
