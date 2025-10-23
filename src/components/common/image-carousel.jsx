"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

const ImageSkeleton = memo(() => (
  <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded">
  </div>
));
ImageSkeleton.displayName = "ImageSkeleton";

const OptimizedCarouselImage = memo(({ src, alt, isActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  if (!src || typeof src !== "string" || src.trim() === "") {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center rounded">
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
        className={`object-cover transition-opacity duration-500 rounded ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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

const ImageCarousel = memo(({ images = [], productName = "Product" }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageArray = useMemo(() => {
    const validImages = images.filter(img => img && typeof img === 'string' && img.trim() !== '');
    return validImages.length > 0 ? validImages : ['/placeholder-image.jpg'];
  }, [images]);

  // Preload images
  useEffect(() => {
    imageArray.forEach((src, index) => {
      if (index !== activeImageIndex && index < 3) {
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

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  const selectImage = useCallback((index) => {
    setActiveImageIndex(index);
    setIsZoomed(false);
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <Card className="relative overflow-hidden bg-white rounded-xl shadow-lg border border-primary/10">
        <div className={`relative aspect-square ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <OptimizedCarouselImage
            src={imageArray[activeImageIndex]}
            alt={`${productName} - View ${activeImageIndex + 1}`}
            isActive={true}
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

              {/* Image Counter */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                {activeImageIndex + 1} / {imageArray.length}
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Thumbnail Navigation */}
      {imageArray.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {imageArray.map((image, index) => (
            <Card
              key={index}
              className={`flex-shrink-0 w-20 h-20 cursor-pointer overflow-hidden border-2 transition-all ${
                activeImageIndex === index 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-primary/20 hover:border-primary/40 hover:scale-105'
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
      <p className="text-sm text-gray-500 text-center">
        {imageArray.length > 1 ? 'Click thumbnails to view • ' : ''}Click image to zoom
      </p>
    </div>
  );
});

ImageCarousel.displayName = "ImageCarousel";

export default ImageCarousel;