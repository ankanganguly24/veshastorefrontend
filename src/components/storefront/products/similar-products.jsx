"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

export default function SimilarProducts({ currentProductId, categoryId }) {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["similar-products", categoryId],
    queryFn: async () => {
      // In a real app, we might pass category_id to filter
      // For now, we'll fetch all products and filter client-side or randomise
      const response = await api.get("/product");
      return response.data.data.products;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!categoryId || true, // Always fetch for now if no category logic
  });

  if (isLoading) return null;

  const allProducts = productsData || [];
  
  // Filter out current product and randomise
  const similarProducts = allProducts
    .filter(p => p.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-100">
      <h2 className="text-2xl font-light text-gray-900 mb-8">You May Also Like</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => {
          const primaryMedia = product.media.find(m => m.is_primary) || product.media[0];
          const imageUrl = primaryMedia?.media?.url;
          const firstVariant = product.variants[0];
          const price = firstVariant?.price;
          const comparePrice = firstVariant?.compare_at_price;
          const discount = comparePrice && price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

          return (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <Card className="border-none shadow-none bg-transparent h-full">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-4">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  
                  {discount > 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white border-none rounded-sm px-2 py-1 text-xs">
                        -{discount}%
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 truncate group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-semibold text-gray-900">
                      ₹{price?.toLocaleString()}
                    </span>
                    {comparePrice > price && (
                      <span className="text-xs text-gray-500 line-through">
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
    </section>
  );
}
