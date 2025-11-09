"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "Absolutely love my outfit! The detailing and craftsmanship are beyond expectations. The fabric feels luxurious, and the fit was spot on.",
    product: "Embroidered Kurta Set",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b442?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "2 weeks ago",
    verified: true
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi, India",
    rating: 5,
    review: "The festive collection is simply stunning. The outfit looked even better in person and made me stand out at the event. Excellent finish and comfort.",
    product: "Classic Festive Sherwani",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "1 month ago",
    verified: true
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Bangalore, Karnataka",
    rating: 5,
    review: "Quick delivery and flawless design. The outfit was elegant yet modern — received so many compliments. Highly recommend ordering from here!",
    product: "Designer Peplum Jacket",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "3 weeks ago",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur, Rajasthan",
    rating: 5,
    review: "The craftsmanship is exceptional — feels tailor-made. Perfect balance of traditional charm and modern styling. Worth every penny.",
    product: "Regal Sherwani Set",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "2 months ago",
    verified: true
  },
  {
    id: 5,
    name: "Sneha Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    review: "Loved the fabric quality and subtle elegance. The silhouette and color were exactly as shown. It made me feel effortlessly beautiful.",
    product: "Vintage Silk Saree",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "1 week ago",
    verified: true
  },
  {
    id: 6,
    name: "Arjun Kumar",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    review: "Ordered for my wife’s birthday — she loved it! The fit, finish, and packaging were all premium. Thank you for making the day special.",
    product: "Starlight Evening Gown",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "3 weeks ago",
    verified: true
  },
  {
    id: 7,
    name: "Riya Kapoor",
    location: "Pune, Maharashtra",
    rating: 5,
    review: "Elegant designs and amazing comfort! I wore this outfit to a family function, and everyone kept asking where I got it from.",
    product: "Pastel Lehenga Set",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "3 weeks ago",
    verified: true
  },
  {
    id: 8,
    name: "Manish Verma",
    location: "Lucknow, Uttar Pradesh",
    rating: 5,
    review: "I appreciate the attention to detail and quality finish. It arrived beautifully packed and looked even better in person.",
    product: "Handwoven Kurta Set",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "1 month ago",
    verified: true
  },
  {
    id: 9,
    name: "Aditi Nair",
    location: "Kochi, Kerala",
    rating: 5,
    review: "It’s rare to find something that feels luxurious yet so comfortable. Loved how timeless the piece feels — definitely shopping again.",
    product: "Velvet Heritage Gown",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    purchaseDate: "2 weeks ago",
    verified: true
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
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
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlay]);

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from people who chose timeless elegance
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">4.9 out of 5</span>
              <span className="text-gray-500">• 1,200+ happy customers</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div 
            className="overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(testimonials.length / itemsPerView) * 100}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="px-3"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <Card className="p-6 h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-blue-500 opacity-60" />
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed text-sm lg:text-base">
                      "{testimonial.review}"
                    </p>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Purchased:</p>
                      <p className="text-sm font-medium text-gray-900">{testimonial.product}</p>
                    </div>

                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < testimonial.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                          <p className="text-xs text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{testimonial.purchaseDate}</p>
                        {testimonial.verified && (
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {maxIndex > 0 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl z-10"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl z-10"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {maxIndex > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-blue-600 w-6" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
