"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StyleEditSection() {
  const editorials = [
    {
      id: 1,
      title: "The Minimalist Edit",
      subtitle: "Effortless elegance for the modern wardrobe",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
      link: "/category/minimalist",
      size: "large" // Takes up 2/3 width
    },
    {
      id: 2,
      title: "Evening Glamour",
      subtitle: "Statement pieces for special nights",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
      link: "/category/evening",
      size: "small" // Takes up 1/3 width
    },
    {
      id: 3,
      title: "Weekend Comfort",
      subtitle: "Relaxed fits without compromising style",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
      link: "/category/casual",
      size: "small"
    },
    {
      id: 4,
      title: "Workwear Essentials",
      subtitle: "Professional looks that command attention",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2000&auto=format&fit=crop",
      link: "/category/workwear",
      size: "large"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest mb-2 block">Curated Collections</span>
          <h2 className="text-4xl font-light text-gray-900 tracking-tight">The Vesha Editorial</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[500px]">
          {editorials.map((item, index) => (
            <div 
              key={item.id}
              className={`relative group overflow-hidden rounded-sm ${
                item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={item.size === 'large' ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 mb-6 font-light max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.subtitle}
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Link href={item.link} className="flex items-center gap-2">
                    Explore Edit <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Philosophy Banner */}
        <div className="mt-24 relative rounded-sm overflow-hidden bg-gray-900 py-20 px-6 text-center">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
              "Fashion is not just about what you wear, but how you feel."
            </h2>
            <p className="text-gray-300 text-lg font-light mb-8">
              At Vesha, we believe in sustainable luxury that empowers your individuality.
            </p>
            <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              <Link href="/our-story">Discover Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
