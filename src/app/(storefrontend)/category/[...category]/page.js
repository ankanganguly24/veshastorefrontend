"use client";

import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/common/product-card";
import api from "@/utils/axios";
import PriceFilter, { PRICE_RANGES } from "@/components/common/filters/PriceFilter";
import ColorFilter from "@/components/common/filters/ColorFilter";
import CategoryFilter from "@/components/common/filters/CategoryFilter";

// Skeleton loader for product grid
function ProductSkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"
          style={{ minWidth: "200px", maxWidth: "300px" }} // Added min-width and max-width
        ></div>
      ))}
    </div>
  );
}

export default function CategoryPage({ params }) {
  // Unwrap params which may be a Promise in newer Next.js versions
  // React.use will resolve the promise so we can safely access properties.
  const resolvedParams = React.use(params);
  const { category } = resolvedParams || {};

  // Determine category ids from route params (could be array or string)
  const categoryIdsArray = useMemo(() => {
    if (!category) return [];
    return Array.isArray(category) ? category : [category];
  }, [category]);

  const categoryPath = useMemo(() => (categoryIdsArray.length ? categoryIdsArray.join('/') : ''), [categoryIdsArray]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(Boolean(categoryIdsArray.length));
  const [error, setError] = useState(null);

  // Parent categories state for sidebar
  const [parentCategories, setParentCategories] = useState([]);
  const [parentsLoading, setParentsLoading] = useState(false);

  // State to store category names
  const [categoryNames, setCategoryNames] = useState([]);

  // Filters state
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);

  // Fetch parent categories (top-level) for sidebar
  useEffect(() => {
    let mounted = true;
    const fetchParentCategories = async () => {
      setParentsLoading(true);
      try {
        const res = await api.get("/product/category");
        const all = res?.data?.data?.categories || [];
        const parents = Array.isArray(all) ? all.filter((c) => !c.parent_id) : [];
        if (mounted) setParentCategories(parents);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        if (mounted) setParentsLoading(false);
      }
    };
    fetchParentCategories();
    return () => { mounted = false; };
  }, []);

  // Fetch category names from IDs
  useEffect(() => {
    if (categoryIdsArray.length === 0) {
      setCategoryNames([]);
      return;
    }

    let mounted = true;

    const fetchCategoryNames = async () => {
      try {
        const res = await api.get("/product/category");
        const allCategories = res?.data?.data?.categories || [];

        // Create a map of id to category for quick lookup
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

        // Get names for the requested category IDs
        const names = categoryIdsArray.map((id) => categoryMap[id] || id);
        if (mounted) setCategoryNames(names);
      } catch (err) {
        console.error("Failed to fetch category names:", err);
      }
    };

    fetchCategoryNames();
    return () => { mounted = false; };
  }, [categoryIdsArray]);

  // Display name using fetched category names
  const categoryName = useMemo(() => {
    if (categoryNames.length === 0) return 'All Products';
    return categoryNames.join(' / ');
  }, [categoryNames]);

  useEffect(() => {
    if (categoryIdsArray.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const idsParam = categoryIdsArray.join(',');
        const res = await api.get(`/product?category_ids=${encodeURIComponent(idsParam)}`);
        const fetched = res?.data?.data?.products || [];

        const mapped = fetched.map((p) => {
          const variant = p.variants && p.variants.length ? p.variants[0] : {};
          const images = (p.media && Array.isArray(p.media) && p.media.length)
            ? p.media.map((m) => m.media?.url || m.url || m.path || m.src || null)
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
            price: price,
            originalPrice: compareAt,
            discount: discount,
            category: categoryNameFromProduct,
            categoryIds: categoryIdsFromProduct,
            image: images[0] || null, // Use the first image or null
            gradient: undefined,
            rating: 4.5,
            reviewCount: p.reviewCount || 0,
            colors,
          };
        });

        setProducts(mapped);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryIdsArray]);

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

      if (selectedColors.length > 0) {
        const matchesColor = (p.colors || []).some((c) => {
          const norm = String(c || "").toLowerCase();
          return selectedColors.some((sel) => String(sel || "").toLowerCase() === norm);
        });
        if (!matchesColor) return false;
      }

      return true;
    });
  }, [products, selectedCategoryFilters, selectedPriceRanges, selectedColors]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <ProductSkeletonLoader />
              ) : error ? (
                <div className="col-span-full text-center py-12 text-red-600">{error}</div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">No products found for the selected filters.</div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
}