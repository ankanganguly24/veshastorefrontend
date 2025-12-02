"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/common/product-card";
import api from "@/lib/api";

function SkeletonLoader() {
  return (
    <section className="py-16 border-t border-gray-100">
      <div className="h-8 w-48 bg-gray-100 animate-pulse mb-8 rounded-md" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-[3/4] bg-gray-100 animate-pulse rounded-sm" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 w-3/4 animate-pulse rounded-md" />
              <div className="h-4 bg-gray-100 w-1/4 animate-pulse rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SimilarProducts({ currentProductId, categoryId }) {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["similar-products", categoryId],
    queryFn: async () => {
      // In a real app, we might pass category_id to filter
      // For now, we'll fetch all products and filter client-side or randomise
      const response = await api.get("/product");
      return response.data.data.products;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!categoryId || true, // Always fetch for now if no category logic
  });

  if (isLoading) return <SkeletonLoader />;

  const allProducts = productsData || [];
  
  // Filter out current product
  let filtered = allProducts.filter(p => String(p.id) !== String(currentProductId));
  
  // If we have a categoryId, try to filter by it first
  if (categoryId) {
    const categoryFiltered = filtered.filter(p => 
      p.categories?.some(c => String(c.category?.id) === String(categoryId))
    );
    // If we have enough products in the category, use them
    if (categoryFiltered.length >= 4) {
      filtered = categoryFiltered;
    }
  }

  // Randomize and slice
  const similarProducts = filtered
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  // Transform API data to match ProductCard format
  const transformedProducts = similarProducts.map((product) => {
    const primaryMedia = product.media.find(m => m.is_primary) || product.media[0];
    const imageUrl = primaryMedia?.media?.url;
    
    // Get all images for the carousel
    const allImages = product.media
      .map(m => m.media?.url)
      .filter(Boolean);
    
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

  return (
    <section className="py-16 border-t border-gray-100">
      <h2 className="text-2xl font-light text-gray-900 mb-8">You May Also Like</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {transformedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
