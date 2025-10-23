"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/common/product-card";
import api from "@/utils/axios";

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-64 bg-gray-200 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  );
}

function ProductSection({ title, products, linkHref, bgColor = "bg-white", textColor = "text-gray-900" }) {
  return (
    <section className={`py-16 ${bgColor} text-center`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-2`}>
            {title}
          </h2>
          <Link href={linkHref}>
            <Button 
              variant="outline" 
              className="group hover:bg-gray-900 hover:text-white border-gray-300"
            >
              Show More
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-gray-500">
              Products coming soon for this category.
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
        const topCategories = allCategories.slice(0, 3);

        const categoryData = await Promise.all(
          topCategories.map(async (category) => {
            const productRes = await api.get(`/product?category_ids=${category.id}&limit=4`);
            const products = productRes?.data?.data?.products || [];
            
            // Transform products to include image and price at the root level
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
      <div className="text-center py-12">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="text-center">
      {memoizedCategories.map((category) => (
        <ProductSection
          key={category.id}
          title={category.name}
          products={category.products}
          linkHref={`/category/${category.id}`}
          bgColor="bg-white"
        />
      ))}
    </div>
  );
}