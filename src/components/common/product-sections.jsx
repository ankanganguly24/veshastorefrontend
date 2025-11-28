"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/common/product-card";
import api from "@/utils/axios";

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-100 w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductSection({ title, products, linkHref }) {
  return (
    <section className="py-24 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-light text-gray-900 tracking-tight mb-3">
              {title}
            </h2>
            <div className="w-12 h-px bg-primary mb-4"></div>
          </div>
          
          <Link href={linkHref}>
            <Button 
              variant="ghost" 
              className="group text-gray-900 hover:text-primary hover:bg-transparent p-0 font-medium"
            >
              View Collection
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              New arrivals coming soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Helper function to transform product data
function transformProduct(product) {
  const primaryMedia = product.media?.find(m => m.is_primary) || product.media?.[0];
  const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];
  
  return {
    ...product,
    name: product.title || product.name || product.slug,
    // Get image URL - prefer thumbnail 720p variant
    image: primaryMedia?.media?.variants?.find(v => v.variant_key === 'thumbnail' && v.metadata?.resolution === '720p')?.url 
           || primaryMedia?.media?.url 
           || '/placeholder-image.jpg',
    // Get price from default variant
    price: defaultVariant?.price || 0,
    compareAtPrice: defaultVariant?.compare_at_price || null,
    // Additional useful fields
    inStock: defaultVariant?.stock_quantity > 0,
    stockQuantity: defaultVariant?.stock_quantity || 0,
  };
}

export default function ProductSections() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const memoizedCategories = useMemo(() => categories, [categories]);

  useEffect(() => {
    if (categories.length > 0) return;

    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryRes = await api.get("/product/category");
        const allCategories = categoryRes?.data?.data?.categories || [];
        // Get top 2 categories for homepage to keep it clean
        const topCategories = allCategories.slice(0, 2);

        const categoryData = await Promise.all(
          topCategories.map(async (category) => {
            const productRes = await api.get(`/product?category_ids=${category.id}&limit=4`);
            const products = productRes?.data?.data?.products || [];
            const transformedProducts = products.map(transformProduct);
            return { ...category, products: transformedProducts };
          })
        );

        setCategories(categoryData);
      } catch (error) {
        console.error("Failed to fetch categories or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [categories]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div>
      {memoizedCategories.map((category) => (
        <ProductSection
          key={category.id}
          title={category.name}
          products={category.products}
          linkHref={`/category/${category.id}`}
        />
      ))}
    </div>
  );
}