"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Skeleton loader component
const ImageSkeleton = memo(() => (
  <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
    <div className="w-full h-full bg-gray-300 rounded"></div>
  </div>
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
      <div className={`w-full h-full bg-gradient-to-br from-primary/40 to-primary/70 flex items-center justify-center ${className}`}>
        <span className="text-white text-sm">Image unavailable</span>
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
        className={`object-cover transition-all duration-1000 ease-in-out ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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
    reviewCount = 0,
    image,
    images = [],
  } = useMemo(() => product, [product]);

  // Memoize processed images
  const productImages = useMemo(() => {
    return images.length > 0 ? images : (image ? [image] : []);
  }, [images, image]);

  const hasMultipleImages = useMemo(() => productImages.length > 1, [productImages.length]);

  // Memoize star rating component
  const StarRating = useMemo(() => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating})</span>
      </div>
    );
  }, [rating]);

  // Auto-rotate images when hovered
  useEffect(() => {
    if (!hasMultipleImages || !isHovered) return;

    let interval;
    
    // Add a small delay before starting auto-rotation
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const nextIndex = (prev + 1) % productImages.length;
          return nextIndex;
        });
      }, 2500); // Slower rotation: Change image every 2.5 seconds
    }, 800); // Longer delay before starting rotation

    return () => {
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
    };
  }, [hasMultipleImages, isHovered, productImages.length]);

  // Preload images when component mounts
  useEffect(() => {
    if (productImages.length > 1) {
      productImages.forEach((src, index) => {
        if (index > 0) { // Skip first image as it's already loaded
          const img = new window.Image();
          img.src = src;
        }
      });
    }
  }, [productImages]);

  // Memoized event handlers
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
    if (hasMultipleImages) {
      setCurrentImageIndex(0);
    }
  }, [hasMultipleImages]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  }, []);

  // Navigate to product page
  const handleCardClick = useCallback(() => {
    router.push(`/product/${id}`);
  }, [id, router]);

  return (
    <Card 
      className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-primary/10 cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="relative h-64 overflow-hidden">
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
              
              {/* Navigation Arrows - Only show if multiple images and hovered */}
              {hasMultipleImages && isHovered && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 z-10"
                    onClick={prevImage}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                  >
                    <ChevronLeft className="w-4 h-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 z-10"
                    onClick={nextImage}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                  >
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </Button>
                </>
              )}

              {/* Image Dots - Only show if multiple images */}
              {hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? `bg-white w-6 shadow-md ${isHovered ? 'animate-pulse' : ''}` 
                          : 'bg-white/60 hover:bg-white/80 w-2'
                      }`}
                      onClick={(e) => goToImage(index, e)}
                      onMouseDown={(e) => e.stopPropagation()}
                      onMouseUp={(e) => e.stopPropagation()}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  {isHovered && (
                    <Play className="w-3 h-3 fill-current animate-pulse" />
                  )}
                  <span>{currentImageIndex + 1} / {productImages.length}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-primary/60" />
          )}
          
          {/* Overlay - less opaque to not interfere with buttons */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
        </div>
        
        {/* Discount Badge */}
        {discount && (
          <Badge variant="destructive" className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
            {discount}% OFF
          </Badge>
        )}
        
        {/* Category Badge */}
        {category && (
          <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 z-10">
            {category}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5 text-left">
        <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">
          {name}
        </h4>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              ₹{price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <Button 
          className="w-full py-2.5 px-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 bg-primary hover:bg-primary/90 text-white"
          onClick={handleCardClick}
        >
          View Product
        </Button>

        {/* Display image URL */}
        <div className="mt-4 text-sm text-gray-700">
          {images?.[0] && (
            <div className="mt-2">
              <span className="font-medium">Image URL:</span>
              <a
                href={images[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline block truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {images[0]}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
