"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/common/product-card";
import api from "@/utils/axios";
import PriceFilter, { PRICE_RANGES } from "@/components/common/filters/PriceFilter";
import CategoryFilter from "@/components/common/filters/CategoryFilter";
import { getProductCardImages } from "@/lib/image-utils";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function ProductSkeletonLoader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="aspect-[3/4] bg-gray-50 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-50 w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-50 w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function transformProduct(product) {
  const variant = product.variants?.[0] || {};
  const images = getProductCardImages(product.media || []);
  
  const colors = [];
  if (Array.isArray(product.variants)) {
    product.variants.forEach((v) => {
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

  const categoryName = product.categories?.[0]?.category?.name || '';
  const categoryIds = product.categories?.map(c => c.category?.id || c.category_id) || [];

  const price = variant?.price ?? 0;
  const compareAt = variant?.compare_at_price ?? null;
  const discount = (compareAt && price && compareAt > price) 
    ? Math.round((1 - price / compareAt) * 100) 
    : null;

  return {
    ...product,
    name: product.title || product.name || product.slug,
    price,
    originalPrice: compareAt,
    discount,
    category: categoryName,
    categoryIds,
    images,
    image: images[0] || null,
    rating: 4.5,
    reviewCount: product.reviewCount || 0,
    colors,
  };
}

export default function CategoryPage({ params }) {
  const resolvedParams = React.use(params);
  const { category } = resolvedParams || {};

  const categoryIdsArray = useMemo(() => {
    if (!category) return [];
    return Array.isArray(category) ? category : [category];
  }, [category]);

  const categoryPath = categoryIdsArray.join(',');

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);

  const { data: parentCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/product/category");
      const all = res?.data?.data?.categories || [];
      return Array.isArray(all) ? all.filter((c) => !c.parent_id) : [];
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: categoryNames = [] } = useQuery({
    queryKey: ["category-names", categoryIdsArray],
    queryFn: async () => {
      if (categoryIdsArray.length === 0) return [];
      const res = await api.get("/product/category");
      const allCategories = res?.data?.data?.categories || [];
      const categoryMap = {};
      const buildMap = (cats) => {
        cats.forEach((cat) => {
          categoryMap[cat.id] = cat.name;
          if (cat.children?.length > 0) buildMap(cat.children);
        });
      };
      buildMap(allCategories);
      return categoryIdsArray.map((id) => categoryMap[id] || id);
    },
    enabled: categoryIdsArray.length > 0,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: products = [], isLoading: productsLoading, error } = useQuery({
    queryKey: ["products", "category", categoryPath],
    queryFn: async () => {
      const res = await api.get(`/product?category_ids=${encodeURIComponent(categoryPath)}`);
      const fetched = res?.data?.data?.products || [];
      return fetched.map(transformProduct);
    },
    enabled: categoryIdsArray.length > 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const categoryName = categoryNames.length === 0 ? 'All Products' : categoryNames.join(' / ');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategoryFilters.length > 0) {
        const intersects = p.categoryIds && p.categoryIds.some((cid) => 
          selectedCategoryFilters.includes(cid)
        );
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

  const isLoading = productsLoading || categoriesLoading;

  const FiltersContent = () => (
    <div className="space-y-8">
      <CategoryFilter
        categories={parentCategories}
        selected={selectedCategoryFilters}
        onChange={setSelectedCategoryFilters}
      />
      <div className="pt-8 border-t border-gray-100">
        <PriceFilter 
          selected={selectedPriceRanges} 
          onChange={setSelectedPriceRanges} 
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-2 capitalize">
              {categoryName}
            </h1>
            <p className="text-sm text-gray-500">
              {filteredProducts.length} Products Found
            </p>
          </div>

          {/* Mobile Filter Trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FiltersContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <FiltersContent />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <ProductSkeletonLoader />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-gray-900 font-medium mb-2">Failed to load products</p>
                <p className="text-sm text-gray-500 mb-4">Please try again later</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium mb-2">No products found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or check back later
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
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