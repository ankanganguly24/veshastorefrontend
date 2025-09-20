"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const banners = [
  {
    id: 1,
    title: "Winter Collection 2025",
    subtitle: "Embrace the Warmth",
    description: "Discover our premium winter essentials crafted for comfort and style",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    buttonText: "Shop Winter",
    buttonLink: "/category/winter",
    bgGradient: "from-slate-900 to-slate-700"
  },
  {
    id: 2,
    title: "Festive Specials",
    subtitle: "Celebrate in Style",
    description: "Exclusive festive wear with up to 40% off on selected items",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
    buttonText: "Explore Collection",
    buttonLink: "/category/festive",
    bgGradient: "from-purple-900 to-pink-700"
  },
  {
    id: 3,
    title: "Nawabi Exclusive",
    subtitle: "Royal Heritage",
    description: "Traditional elegance meets contemporary fashion",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=600&fit=crop",
    buttonText: "Shop Now",
    buttonLink: "/category/nawabi",
    bgGradient: "from-amber-900 to-orange-700"
  },
  {
    id: 4,
    title: "New Arrivals",
    subtitle: "Fresh & Trendy",
    description: "Be the first to explore our latest fashion statements",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop",
    buttonText: "Discover New",
    buttonLink: "/category/new-arrivals",
    bgGradient: "from-teal-900 to-cyan-700"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlay]);

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <div className="absolute inset-0">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} opacity-60`} />
            </div>
            
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <div className="space-y-4 text-white">
                    <p className="text-sm sm:text-base font-medium tracking-wide uppercase opacity-90">
                      {banner.subtitle}
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {banner.title}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed max-w-lg">
                      {banner.description}
                    </p>
                    <div className="pt-4">
                      <Button 
                        size="lg"
                      >
                        {banner.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-gray-900 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-gray-900 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-white scale-110" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
