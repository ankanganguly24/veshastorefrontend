"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "Absolutely love my outfit! The detailing and craftsmanship are beyond expectations. The fabric feels luxurious, and the fit was spot on.",
    product: "Embroidered Kurta Set",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b442?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    review: "The festive collection is simply stunning. The outfit looked even better in person and made me stand out at the event. Excellent finish.",
    product: "Classic Festive Sherwani",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Bangalore",
    rating: 5,
    review: "Quick delivery and flawless design. The outfit was elegant yet modern — received so many compliments. Highly recommend!",
    product: "Designer Peplum Jacket",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    review: "The craftsmanship is exceptional — feels tailor-made. Perfect balance of traditional charm and modern styling.",
    product: "Regal Sherwani Set",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: 5,
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 5,
    review: "Loved the fabric quality and subtle elegance. The silhouette and color were exactly as shown. It made me feel effortlessly beautiful.",
    product: "Vintage Silk Saree",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    verified: true
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(testimonials.length / itemsPerView) - 1);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlay]);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 tracking-tight mb-3">
            Customer Stories
          </h2>
          <div className="w-12 h-px bg-primary mx-auto mb-4"></div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span>4.9/5 Average Rating</span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(testimonials.length / itemsPerView) * 100}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="px-4"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="bg-white p-8 h-full border border-gray-100 hover:border-primary/20 transition-colors group">
                    <Quote className="w-8 h-8 text-primary/20 mb-6" />
                    
                    <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                      "{testimonial.review}"
                    </p>

                    <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-gray-200 hover:bg-white hover:border-primary/50"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-gray-200 hover:bg-white hover:border-primary/50"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
