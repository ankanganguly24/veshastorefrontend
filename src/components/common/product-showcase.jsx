"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
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
          {displayProducts.map((product) => {
            // Find primary image or first available image
            const primaryMedia = product.media.find(m => m.is_primary) || product.media[0];
            const imageUrl = primaryMedia?.media?.url;
            
            // Find price from first variant
            const firstVariant = product.variants[0];
            const price = firstVariant?.price;
            const comparePrice = firstVariant?.compare_at_price;
            const discount = comparePrice && price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

            return (
              <Link 
                key={product.id} 
                href={`/products/${product.id}`}
                className="group"
              >
                <Card className="border-none shadow-none bg-transparent h-full">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-4">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    
                    {discount > 0 && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500 hover:bg-red-600 text-white border-none rounded-sm px-2 py-1 text-xs">
                          -{discount}%
                        </Badge>
                      </div>
                    )}

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm font-medium text-center">
                        View Details
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-0">
                    <h3 className="text-base font-medium text-gray-900 mb-1 truncate group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{price?.toLocaleString()}
                      </span>
                      {comparePrice > price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{comparePrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
