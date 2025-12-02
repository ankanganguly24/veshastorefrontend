"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/common/product-card";
import api from "@/lib/api";

export default function ProductShowcase() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const response = await api.get("/product");
      return response.data.data.products;
    },
    staleTime: Infinity, // Cache indefinitely during session
    gcTime: Infinity, // Keep in cache indefinitely
  });

  const products = productsData || [];
  // Show only first 8 products
  const displayProducts = products.slice(0, 8);

  // Transform API data to match ProductCard format
  const transformedProducts = displayProducts.map((product) => {
    // Find primary image or first available image
    const primaryMedia = product.media.find(m => m.is_primary) || product.media[0];
    const imageUrl = primaryMedia?.media?.url;
    
    // Get all images for the carousel
    const allImages = product.media
      .map(m => m.media?.url)
      .filter(Boolean);
    
    // Find price from first variant
    const firstVariant = product.variants[0];
    const price = firstVariant?.price;
    const comparePrice = firstVariant?.compare_at_price;
    const discount = comparePrice && price 
      ? Math.round(((comparePrice - price) / comparePrice) * 100) 
      : 0;

    return {
      id: product.id,
      name: product.title,
      price: price,
      originalPrice: comparePrice,
      discount: discount > 0 ? discount : null,
      category: product.categories?.[0]?.category?.name || null,
      image: imageUrl,
      images: allImages,
    };
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-widest mb-2 block">
              New Arrivals
            </span>
            <h2 className="text-4xl font-light text-gray-900 tracking-tight">
              Latest from Vesha
            </h2>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {transformedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
