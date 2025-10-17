"use client";

import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/common/product-card";
import api from "@/utils/axios";
import PriceFilter, { PRICE_RANGES } from "@/components/common/filters/PriceFilter";
import ColorFilter from "@/components/common/filters/ColorFilter";
import CategoryFilter from "@/components/common/filters/CategoryFilter";

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

  // Display name: try to show readable names from ids (fallback to id)
  const categoryName = useMemo(() => {
    if (!categoryIdsArray.length) return 'All Products';
    // Join ids but replace dashes with spaces for a bit more readable header
    return categoryIdsArray.map((c) => c.replace(/-/g, ' ')).join(' / ');
  }, [categoryIdsArray]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(Boolean(categoryIdsArray.length));
  const [error, setError] = useState(null);

  // Parent categories state for sidebar
  const [parentCategories, setParentCategories] = useState([]);
  const [parentsLoading, setParentsLoading] = useState(false);

  // Filters state
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]); // array of range ids
  const [selectedColors, setSelectedColors] = useState([]); // array of color ids/values
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]); // array of parent category ids

  // Fetch parent categories (top-level) for sidebar
  useEffect(() => {
    let mounted = true;
    const fetchParentCategories = async () => {
      setParentsLoading(true);
      try {
        const res = await api.get("/product/category");
        const all = res?.data?.data?.categories || [];
        // top-level parents have null parent_id
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
        // Expecting res.data.data.products
        const fetched = res?.data?.data?.products || [];

        // Map backend product shape to ProductCard expected props
        const mapped = fetched.map((p) => {
          const variant = p.variants && p.variants.length ? p.variants[0] : {};
          // derive images from media (common field) or fallback to empty array
          const images = (p.media && Array.isArray(p.media) && p.media.length)
            ? p.media.map((m) => m.url || m.path || m.src || m)
            : (p.images || []);

          // derive color values from variants -> variantOptions
          const colors = [];
          if (Array.isArray(p.variants)) {
            p.variants.forEach((v) => {
              if (Array.isArray(v.variantOptions)) {
                v.variantOptions.forEach((vo) => {
                  const opt = vo.optionValue;
                  const def = opt?.optionDefinition;
                  // check a few ways to identify color option
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
            id: p.id,
            slug: p.slug,
            name: p.title || p.name || p.slug,
            price: price,
            originalPrice: compareAt,
            discount: discount,
            category: categoryNameFromProduct,
            categoryIds: categoryIdsFromProduct,
            images: images,
            gradient: undefined,
            rating: 4.5,
            reviewCount: p.reviewCount || 0,
            colors // array of color identifiers (hex or value)
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
      // Category filter (parent categories selected)
      if (selectedCategoryFilters.length > 0) {
        // If product's category ids don't intersect selectedCategoryFilters, exclude
        const intersects = p.categoryIds && p.categoryIds.some((cid) => selectedCategoryFilters.includes(cid));
        if (!intersects) return false;
      }

      // Price filter
      if (selectedPriceRanges.length > 0) {
        // if none of selected ranges match product price -> exclude
        const matchesPrice = selectedPriceRanges.some((rid) => {
          const range = PRICE_RANGES.find((r) => r.id === rid);
          if (!range) return false;
          return p.price >= range.min && p.price <= range.max;
        });
        if (!matchesPrice) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const matchesColor = (p.colors || []).some((c) => {
          // compare by hex/value/label: normalize to lowercase strings
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
              {/* Filters: Category, Price, Color - use separate components */}
              <CategoryFilter
                categories={parentCategories}
                selected={selectedCategoryFilters}
                onChange={setSelectedCategoryFilters}
              />

              <div className="mt-6">
                <PriceFilter selected={selectedPriceRanges} onChange={setSelectedPriceRanges} />
              </div>

              <div className="mt-6">
                <ColorFilter selected={selectedColors} onChange={setSelectedColors} />
              </div>

              {/* ...existing Size / other filters can remain below if desired ... */}
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary/10">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing <span className="font-semibold">{filteredProducts.length > 0 ? `1-${filteredProducts.length}` : 0}</span> of <span className="font-semibold">{products.length}</span> products
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 text-sm border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">Loading products...</div>
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

            {/* Pagination (keeps original static UI; can be wired to backend later) */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-primary/10">
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-primary transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      page === 1 
                        ? 'bg-primary text-white' 
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-primary transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
