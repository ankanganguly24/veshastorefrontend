"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Check, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "Absolutely love my outfit! The detailing and craftsmanship are beyond expectations. The fabric feels luxurious, and the fit was spot on.",
    product: "Embroidered Kurta Set",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b442?w=400&h=400&fit=crop&crop=face",
    verified: true
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    review: "The festive collection is simply stunning. The outfit looked even better in person and made me stand out at the event. Excellent finish.",
    product: "Classic Festive Sherwani",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    verified: true
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Bangalore",
    rating: 5,
    review: "Quick delivery and flawless design. The outfit was elegant yet modern — received so many compliments. Highly recommend!",
    product: "Designer Peplum Jacket",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    review: "The craftsmanship is exceptional — feels tailor-made. Perfect balance of traditional charm and modern styling.",
    product: "Regal Sherwani Set",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    verified: true
  },
  {
    id: 5,
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 5,
    review: "Loved the fabric quality and subtle elegance. The silhouette and color were exactly as shown. It made me feel effortlessly beautiful.",
    product: "Vintage Silk Saree",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    verified: true
  },
  {
    id: 6,
    name: "Meera Reddy",
    location: "Hyderabad",
    rating: 5,
    review: "The attention to detail is amazing. The embroidery is intricate and the fit is perfect. Will definitely shop here again!",
    product: "Royal Anarkali Suit",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    verified: true
  },
  {
    id: 7,
    name: "Arjun Kapoor",
    location: "Pune",
    rating: 5,
    review: "Bought a kurta for my brother's wedding. The quality is top-notch and the delivery was super fast. Highly recommended!",
    product: "Festive Kurta Pajama",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    verified: true
  },
  {
    id: 8,
    name: "Sanya Malhotra",
    location: "Chandigarh",
    rating: 5,
    review: "Beautiful collection! The colors are vibrant and the fabric is so comfortable. I received so many compliments.",
    product: "Georgette Saree",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    verified: true
  }
];

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(null); // 'left' or 'right'

  const handleSwipe = (dir) => {
    setDirection(dir);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setDirection(null);
    }, 300); // Match transition duration
  };

  // Get current, next, and next-next cards
  const currentCard = testimonials[activeIndex];
  const nextIndex = (activeIndex + 1) % testimonials.length;
  const nextCard = testimonials[nextIndex];
  const nextNextIndex = (activeIndex + 2) % testimonials.length;
  const nextNextCard = testimonials[nextNextIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 tracking-tight mb-3">
            Customer Love
          </h2>
          <div className="w-12 h-px bg-primary mx-auto mb-4"></div>
          <p className="text-gray-500">See what our community is saying about Vesha.</p>
        </div>

        <div className="relative max-w-md mx-auto h-[460px] flex items-center justify-center">
          {/* Background Card (Next Next) */}
          <div className="absolute top-0 w-full transform scale-90 translate-y-8 opacity-40 z-0">
            <TestimonialCard testimonial={nextNextCard} />
          </div>

          {/* Middle Card (Next) */}
          <div className="absolute top-0 w-full transform scale-95 translate-y-4 opacity-70 z-10 transition-all duration-500">
            <TestimonialCard testimonial={nextCard} />
          </div>

          {/* Front Card (Current) */}
          <div 
            className={`absolute top-0 w-full z-20 transition-all duration-500 ease-in-out transform ${
              direction === 'right' ? 'translate-x-[20%] translate-y-[10%] rotate-6 opacity-0 scale-90' : 
              direction === 'left' ? '-translate-x-[20%] translate-y-[10%] -rotate-6 opacity-0 scale-90' : 
              'translate-x-0 translate-y-0 rotate-0 opacity-100 scale-100'
            }`}
          >
            <TestimonialCard testimonial={currentCard} isFront />
            
            {/* Swipe Controls Overlay */}
            <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-6">
              <Button
                size="icon"
                variant="outline"
                className="h-14 w-14 rounded-full border-2 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 shadow-sm transition-all hover:scale-110"
                onClick={() => handleSwipe('left')}
              >
                <X className="w-6 h-6" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-14 w-14 rounded-full border-2 border-green-100 text-green-500 hover:bg-green-50 hover:border-green-200 hover:text-green-600 shadow-sm transition-all hover:scale-110"
                onClick={() => handleSwipe('right')}
              >
                <Heart className="w-6 h-6 fill-current" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, isFront }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-[380px] flex flex-col relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/40 to-primary"></div>
      
      <div className="p-8 flex-1 flex flex-col items-center text-center justify-center">
        <div className="mb-6 text-primary/20">
          <Quote className="w-12 h-12" />
        </div>

        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className="text-gray-700 text-xl leading-relaxed mb-8 italic font-light">
          "{testimonial.review}"
        </p>

        <div className="mt-auto">
          <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
