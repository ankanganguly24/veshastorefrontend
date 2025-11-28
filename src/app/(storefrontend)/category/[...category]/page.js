"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/common/product-card";
import api from "@/utils/axios";
import PriceFilter, { PRICE_RANGES } from "@/components/common/filters/PriceFilter";
import CategoryFilter from "@/components/common/filters/CategoryFilter";
import { useState } from "react";

/**
 * Product Skeleton Loader
 */
function ProductSkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}

/**
 * Category Page Component
 * Displays products filtered by category with proper loading states
 * Uses React Query for caching
 */
export default function CategoryPage({ params }) {
  const resolvedParams = React.use(params);
  const { category } = resolvedParams || {};

  // Determine category ids from route params
  const categoryIdsArray = useMemo(() => {
    if (!category) return [];
    return Array.isArray(category) ? category : [category];
  }, [category]);

  const categoryPath = categoryIdsArray.join(',');

  // Filters state
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);

  // Fetch parent categories for sidebar with caching
  const { data: parentCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/product/category");
      const all = res?.data?.data?.categories || [];
      return Array.isArray(all) ? all.filter((c) => !c.parent_id) : [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });

  // Fetch category names with caching
  const { data: categoryNames = [] } = useQuery({
    queryKey: ["category-names", categoryIdsArray],
    queryFn: async () => {
      if (categoryIdsArray.length === 0) return [];
      
      const res = await api.get("/product/category");
      const allCategories = res?.data?.data?.categories || [];

      // Create a map of id to category
      const categoryMap = {};
      const buildMap = (cats) => {
        cats.forEach((cat) => {
          categoryMap[cat.id] = cat.name;
          if (cat.children && cat.children.length > 0) {
            buildMap(cat.children);
          }
        });
      };
      buildMap(allCategories);

      return categoryIdsArray.map((id) => categoryMap[id] || id);
    },
    enabled: categoryIdsArray.length > 0,
    staleTime: 10 * 60 * 1000,
  });

  // Fetch products with caching - ONLY when we have category IDs
  const { data: products = [], isLoading: productsLoading, error } = useQuery({
    queryKey: ["products", "category", categoryPath],
    queryFn: async () => {
      const res = await api.get(`/product?category_ids=${encodeURIComponent(categoryPath)}`);
      const fetched = res?.data?.data?.products || [];

      return fetched.map((p) => {
        const variant = p.variants && p.variants.length ? p.variants[0] : {};
        const images = (p.media && Array.isArray(p.media) && p.media.length)
          ? p.media.map((m) => m.media?.url || m.url || m.path || null)
          : (p.images || []);

        const colors = [];
        if (Array.isArray(p.variants)) {
          p.variants.forEach((v) => {
            if (Array.isArray(v.variantOptions)) {
              v.variantOptions.forEach((vo) => {
                const opt = vo.optionValue;
                const def = opt?.optionDefinition;
                const key = (def?.name || def?.display_name || "").toLowerCase();
                if (key.includes("color") || key.includes("colour")) {
                  const val = opt?.metadata?.hex || opt?.value || opt?.label;
                  if (val && !colors.includes(val)) colors.push(val);
                }
              });
            }
          });
        }

        const categoryNameFromProduct = (p.categories && p.categories.length) ? p.categories[0].name : '';
        const categoryIdsFromProduct = (p.categories && p.categories.length) ? p.categories.map(c => c.id) : [];

        const price = variant?.price ?? 0;
        const compareAt = variant?.compare_at_price ?? null;
        const discount = (compareAt && price) ? Math.round((1 - price / compareAt) * 100) : null;

        return {
          ...p,
          name: p.title || p.name || p.slug,
          price,
          originalPrice: compareAt,
          discount,
          category: categoryNameFromProduct,
          categoryIds: categoryIdsFromProduct,
          image: images[0] || null,
          rating: 4.5,
          reviewCount: p.reviewCount || 0,
          colors,
        };
      });
    },
    enabled: categoryIdsArray.length > 0, // Only fetch when we have categories
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Display name
  const categoryName = categoryNames.length === 0 ? 'All Products' : categoryNames.join(' / ');

  // Apply client-side filters
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategoryFilters.length > 0) {
        const intersects = p.categoryIds && p.categoryIds.some((cid) => selectedCategoryFilters.includes(cid));
        if (!intersects) return false;
      }

      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some((rid) => {
          const range = PRICE_RANGES.find((r) => r.id === rid);
          if (!range) return false;
          return p.price >= range.min && p.price <= range.max;
        });
        if (!matchesPrice) return false;
      }

      return true;
    });
  }, [products, selectedCategoryFilters, selectedPriceRanges]);

  // Show loading state while fetching
  const isLoading = productsLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize text-primary">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium fashion items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10 sticky top-24">
              <CategoryFilter
                categories={parentCategories}
                selected={selectedCategoryFilters}
                onChange={setSelectedCategoryFilters}
              />

              <div className="mt-6">
                <PriceFilter selected={selectedPriceRanges} onChange={setSelectedPriceRanges} />
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <ProductSkeletonLoader />
            ) : error ? (
              <div className="text-center py-12 text-red-600">
                Failed to load products. Please try again.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No products found for the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}