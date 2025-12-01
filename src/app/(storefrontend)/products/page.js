"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function ProductsPage() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/product");
      return response.data.data.products;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const products = productsData || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-500">Explore our complete collection of timeless ethnic wear.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Check back later for new arrivals.</p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const primaryMedia = product.media.find(m => m.is_primary) || product.media[0];
              const imageUrl = primaryMedia?.media?.url;
              const firstVariant = product.variants[0];
              const price = firstVariant?.price;
              const comparePrice = firstVariant?.compare_at_price;
              const discount = comparePrice && price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

              return (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
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
        )}
      </div>
    </div>
  );
}
