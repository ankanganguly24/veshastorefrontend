"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/common/product-card";

// Mock product data for different sections
const sectionProducts = {
  "nawabi-exclusive": [
    {
      id: 1,
      slug: "nawabi-royal-kurta-set",
      name: "Nawabi Royal Kurta Set",
      brand: "Vesha Fashion",
      price: 2299,
      originalPrice: 2799,
      discount: 18,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
      category: "NAWABI EXCLUSIVE",
      inStock: true,
      rating: 4.8,
      reviewCount: 156
    },
    {
      id: 2,
      slug: "royal-sherwani-set",
      name: "Royal Sherwani Set",
      brand: "Vesha Fashion",
      price: 3499,
      originalPrice: 4199,
      discount: 17,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=500&h=600&fit=crop",
      category: "NAWABI EXCLUSIVE",
      inStock: true,
      rating: 4.9,
      reviewCount: 89
    },
    {
      id: 3,
      slug: "embroidered-nehru-jacket",
      name: "Embroidered Nehru Jacket",
      brand: "Vesha Fashion",
      price: 1899,
      originalPrice: 2299,
      discount: 17,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
      category: "NAWABI EXCLUSIVE",
      inStock: true,
      rating: 4.7,
      reviewCount: 124
    },
    {
      id: 4,
      slug: "traditional-bandhgala",
      name: "Traditional Bandhgala",
      brand: "Vesha Fashion",
      price: 2799,
      originalPrice: 3299,
      discount: 15,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
      category: "NAWABI EXCLUSIVE",
      inStock: true,
      rating: 4.6,
      reviewCount: 67
    }
  ],
  "new-arrivals": [
    {
      id: 5,
      slug: "modern-blazer-dress",
      name: "Modern Blazer Dress",
      brand: "Vesha Fashion",
      price: 1999,
      originalPrice: 2499,
      discount: 20,
      image: "https://images.unsplash.com/photo-1544966503-7bb6d3967ff6?w=500&h=600&fit=crop",
      category: "NEW ARRIVALS",
      inStock: true,
      rating: 4.5,
      reviewCount: 43,
      isNew: true
    },
    {
      id: 6,
      slug: "contemporary-co-ord-set",
      name: "Contemporary Co-ord Set",
      brand: "Vesha Fashion",
      price: 1699,
      originalPrice: 2099,
      discount: 19,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop",
      category: "NEW ARRIVALS",
      inStock: true,
      rating: 4.4,
      reviewCount: 32,
      isNew: true
    },
    {
      id: 7,
      slug: "trendy-wrap-dress",
      name: "Trendy Wrap Dress",
      brand: "Vesha Fashion",
      price: 1399,
      originalPrice: 1799,
      discount: 22,
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=600&fit=crop",
      category: "NEW ARRIVALS",
      inStock: true,
      rating: 4.6,
      reviewCount: 28,
      isNew: true
    },
    {
      id: 8,
      slug: "chic-midi-skirt",
      name: "Chic Midi Skirt",
      brand: "Vesha Fashion",
      price: 999,
      originalPrice: 1299,
      discount: 23,
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop",
      category: "NEW ARRIVALS",
      inStock: true,
      rating: 4.3,
      reviewCount: 19,
      isNew: true
    }
  ],
  "festive-wear": [
    {
      id: 9,
      slug: "festive-lehenga-set",
      name: "Festive Lehenga Set",
      brand: "Vesha Fashion",
      price: 4999,
      originalPrice: 5999,
      discount: 17,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
      category: "FESTIVE WEAR",
      inStock: true,
      rating: 4.9,
      reviewCount: 87
    },
    {
      id: 10,
      slug: "embellished-anarkali",
      name: "Embellished Anarkali",
      brand: "Vesha Fashion",
      price: 3299,
      originalPrice: 3999,
      discount: 18,
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&h=600&fit=crop",
      category: "FESTIVE WEAR",
      inStock: true,
      rating: 4.8,
      reviewCount: 112
    },
    {
      id: 11,
      slug: "designer-saree",
      name: "Designer Saree",
      brand: "Vesha Fashion",
      price: 2799,
      originalPrice: 3499,
      discount: 20,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop",
      category: "FESTIVE WEAR",
      inStock: true,
      rating: 4.7,
      reviewCount: 95
    },
    {
      id: 12,
      slug: "party-wear-gown",
      name: "Party Wear Gown",
      brand: "Vesha Fashion",
      price: 3799,
      originalPrice: 4599,
      discount: 17,
      image: "https://images.unsplash.com/photo-1566479179817-0a0ca2e18c72?w=500&h=600&fit=crop",
      category: "FESTIVE WEAR",
      inStock: true,
      rating: 4.6,
      reviewCount: 76
    }
  ],
  "spark-style": [
    {
      id: 13,
      slug: "sparkle-sequin-top",
      name: "Sparkle Sequin Top",
      brand: "Vesha Fashion",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
      category: "SPARK & STYLE",
      inStock: true,
      rating: 4.5,
      reviewCount: 54
    },
    {
      id: 14,
      slug: "metallic-pleated-skirt",
      name: "Metallic Pleated Skirt",
      brand: "Vesha Fashion",
      price: 1599,
      originalPrice: 1999,
      discount: 20,
      image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&h=600&fit=crop",
      category: "SPARK & STYLE",
      inStock: true,
      rating: 4.4,
      reviewCount: 38
    },
    {
      id: 15,
      slug: "glitter-bodycon-dress",
      name: "Glitter Bodycon Dress",
      brand: "Vesha Fashion",
      price: 2199,
      originalPrice: 2799,
      discount: 21,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop",
      category: "SPARK & STYLE",
      inStock: true,
      rating: 4.6,
      reviewCount: 42
    },
    {
      id: 16,
      slug: "shimmer-crop-jacket",
      name: "Shimmer Crop Jacket",
      brand: "Vesha Fashion",
      price: 1799,
      originalPrice: 2299,
      discount: 22,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop",
      category: "SPARK & STYLE",
      inStock: true,
      rating: 4.3,
      reviewCount: 29
    }
  ]
};

function ProductSection({ title, subtitle, sectionKey, bgColor = "bg-white", textColor = "text-gray-900" }) {
  const products = sectionProducts[sectionKey] || [];
  const linkHref = `/category/${sectionKey}`;

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-2`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-lg ${textColor === 'text-white' ? 'text-gray-200' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            )}
          </div>
          <Link href={linkHref}>
            <Button 
              variant="outline" 
              className="group hover:bg-gray-900 hover:text-white border-gray-300"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductSections() {
  return (
    <div>
      <ProductSection
        title="Nawabi Exclusive"
        subtitle="Royal heritage meets contemporary elegance"
        sectionKey="nawabi-exclusive"
        bgColor="bg-gradient-to-br from-amber-50 to-orange-50"
      />
      
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh trends and latest fashion statements"
        sectionKey="new-arrivals"
        bgColor="bg-white"
      />
      
      <ProductSection
        title="Festive Wear"
        subtitle="Celebrate every occasion in style"
        sectionKey="festive-wear"
        bgColor="bg-gradient-to-br from-purple-50 to-pink-50"
      />
      
      <ProductSection
        title="Spark & Style"
        subtitle="Shine bright with our glamorous collection"
        sectionKey="spark-style"
        bgColor="bg-gradient-to-br from-slate-900 to-gray-800"
        textColor="text-white"
      />
    </div>
  );
}
