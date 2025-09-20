"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./product-card";

const RelatedProducts = memo(({ currentProductId, category = "ETHNIC WEAR" }) => {
  // Memoized related products data
  const relatedProducts = useMemo(() => [
    {
      id: 2,
      slug: "designer-peplum-jacket",
      name: "Designer Peplum Jacket",
      price: 1899,
      originalPrice: 2299,
      discount: 17,
      category: "OUTERWEAR",
      gradient: "from-blue-400 to-indigo-500",
      rating: 4.6,
      reviewCount: 89,
      images: [
        "https://images.unsplash.com/photo-1544966503-7bb6d3967ff6?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      slug: "elegant-kaftan-dress",
      name: "Elegant Kaftan Dress",
      price: 1599,
      originalPrice: 1999,
      discount: 20,
      category: "ETHNIC WEAR",
      gradient: "from-emerald-400 to-teal-500",
      rating: 4.7,
      reviewCount: 124,
      images: [
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop"
      ]
    },
    {
      id: 4,
      slug: "embroidered-shrug",
      name: "Embroidered Shrug",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      category: "OUTERWEAR",
      gradient: "from-pink-400 to-rose-500",
      rating: 4.5,
      reviewCount: 67,
      images: [
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&h=600&fit=crop"
      ]
    },
    {
      id: 5,
      slug: "festive-wear-set",
      name: "Festive Wear Set",
      price: 2499,
      originalPrice: 2999,
      discount: 17,
      category: "ETHNIC WEAR",
      gradient: "from-purple-400 to-indigo-500",
      rating: 4.8,
      reviewCount: 156,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop"
      ]
    },
    {
      id: 6,
      slug: "stylish-coord-set",
      name: "Stylish Co-ord Set",
      price: 1799,
      originalPrice: 2199,
      discount: 18,
      category: "WESTERN WEAR",
      gradient: "from-violet-400 to-purple-500",
      rating: 4.4,
      reviewCount: 78,
      images: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop"
      ]
    },
    {
      id: 7,
      slug: "traditional-koti",
      name: "Traditional Koti",
      price: 1399,
      originalPrice: 1699,
      discount: 18,
      category: "OUTERWEAR",
      gradient: "from-teal-400 to-cyan-500",
      rating: 4.6,
      reviewCount: 92,
      images: [
        "https://images.unsplash.com/photo-1506629905773-53c8329d2ea8?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=500&h=600&fit=crop"
      ]
    }
  ], []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return relatedProducts
      .filter(product => product.id !== parseInt(currentProductId))
      .slice(0, 6);
  }, [relatedProducts, currentProductId]);

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-purple-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center sm:text-left">
          You Might Also Like
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Responsive Grid Layout - Simpler Alternative */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <Button 
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8"
          >
            View All Products in {category}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

RelatedProducts.displayName = "RelatedProducts";

export default RelatedProducts;
