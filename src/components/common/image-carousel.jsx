"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";

const ImageSkeleton = memo(() => (
  <div className="w-full h-full bg-gray-50 animate-pulse" />
));
ImageSkeleton.displayName = "ImageSkeleton";

const OptimizedCarouselImage = memo(({ src, alt, isActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoading(false), []);
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  if (!src) return <div className="w-full h-full bg-gray-50" />;
  if (hasError) return <div className="w-full h-full bg-gray-50 flex items-center justify-center text-xs text-gray-400">Unavailable</div>;

  return (
    <>
      {isLoading && <ImageSkeleton />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        priority={isActive}
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

  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % imageArray.length);
    setIsZoomed(false);
  }, [imageArray.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    setIsZoomed(false);
  }, [imageArray.length]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden group">
        <OptimizedCarouselImage
          src={imageArray[activeImageIndex]}
          alt={`${productName} - View ${activeImageIndex + 1}`}
          isActive={true}
        />
        
        {/* Zoom Hint */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        
        {/* Navigation */}
        {imageArray.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {imageArray.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {imageArray.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 aspect-[3/4] overflow-hidden transition-all ${
                activeImageIndex === index 
                  ? 'ring-1 ring-primary ring-offset-1' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

ImageCarousel.displayName = "ImageCarousel";

export default ImageCarousel;