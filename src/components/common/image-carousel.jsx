"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

// Skeleton loader for images
const ImageSkeleton = memo(() => (
  <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
    <div className="w-full h-full bg-gray-300 rounded"></div>
  </div>
));
ImageSkeleton.displayName = "ImageSkeleton";

// Optimized Image component
const OptimizedCarouselImage = memo(({ src, alt, isActive, isZoomed, zoomPosition, onLoad, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
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
        className={`object-cover transition-transform duration-300 ${
          isZoomed ? 'scale-200' : 'scale-100'
        } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={
          isZoomed
            ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }
            : {}
        }
        onLoad={handleLoad}
        onError={handleError}
        priority={isActive}
        loading={isActive ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
      />
    </>
  );
});
OptimizedCarouselImage.displayName = "OptimizedCarouselImage";

const ImageCarousel = memo(({ images, productName }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Memoized image array
  const imageArray = useMemo(() => images || [], [images]);
  
  // Preload images
  useEffect(() => {
    imageArray.forEach((src, index) => {
      if (index !== activeImageIndex) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [imageArray, activeImageIndex]);

  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % imageArray.length);
    setIsZoomed(false);
  }, [imageArray.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    setIsZoomed(false);
  }, [imageArray.length]);

  const handleMouseMove = useCallback((e) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  }, [isZoomed]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
  }, []);

  const selectImage = useCallback((index) => {
    setActiveImageIndex(index);
    setIsZoomed(false);
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg border border-purple-100">
        <div 
          className="relative aspect-square cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <OptimizedCarouselImage
            src={imageArray[activeImageIndex]}
            alt={`${productName} - View ${activeImageIndex + 1}`}
            isActive={true}
            isZoomed={isZoomed}
            zoomPosition={zoomPosition}
          />
          
          {/* Zoom Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md z-10"
            onClick={toggleZoom}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </Button>
          
          {/* Navigation Arrows */}
          {imageArray.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Zoom Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
            onClick={toggleZoom}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      </Card>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {imageArray.map((image, index) => (
            <Card
              key={index}
              className={`flex-shrink-0 w-20 h-20 cursor-pointer overflow-hidden border-2 transition-all ${
                activeImageIndex === index 
                  ? 'border-purple-500 shadow-lg' 
                  : 'border-purple-200 hover:border-purple-300'
              }`}
              onClick={() => selectImage(index)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  quality={60}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Zoom Instructions */}
      {!isZoomed && (
        <p className="text-sm text-gray-500 text-center">
          Click on image to zoom • Hover to explore
        </p>
      )}
    </div>
  );
});

ImageCarousel.displayName = "ImageCarousel";

export default ImageCarousel;
