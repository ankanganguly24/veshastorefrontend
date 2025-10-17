"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "@/components/common/image-carousel";
import ProductInfo from "@/components/common/product-info";
import TrustBadges from "@/components/common/trust-badges";
import ProductTabs from "@/components/common/product-tabs";
import RelatedProducts from "@/components/common/related-products";
import { ProductService } from "@/services/product-service";
import api from "@/utils/axios";

export default function ProductPage({ params }) {
  // Unwrap params (React.use for possible promise params is used elsewhere; here we can directly read)
  const resolvedParams = React.use(params);
  const { id } = resolvedParams || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try service first (returns res.data), fallback to direct axios if needed
        let res;
        try {
          res = await ProductService.getById(id); // ProductService returns res.data from axios wrapper
        } catch (err) {
          // fallback direct call
          const fallback = await api.get(`/product/${encodeURIComponent(id)}`);
          res = fallback.data;
        }

        // Normalize payload - backend may return different shapes
        const payload = res?.data ? res : res;
        // Try common variants:
        // - { success, message, data: { product: {...} } }
        // - { success, message, data: {...} }
        // - direct product object
        const p = payload?.data?.product ?? payload?.data ?? payload;

        // safe mapping to UI-friendly product object used by existing components
        const variant = (Array.isArray(p?.variants) && p.variants.length) ? p.variants[0] : {};
        const images =
          (Array.isArray(p?.media) && p.media.length)
            ? p.media.map((m) => m.url || m.path || m.src || m)
            : (p?.images || []);

        const price = variant?.price ?? p?.price ?? 0;
        const compareAt = variant?.compare_at_price ?? p?.originalPrice ?? p?.compare_at_price ?? null;
        const discount = (compareAt && price) ? Math.round((1 - price / compareAt) * 100) : (p?.discount ?? null);
        const stockQty = variant?.stock_quantity ?? p?.stock_quantity ?? p?.stockCount ?? 0;

        const mapped = {
          id: p?.id ?? id,
          slug: p?.slug ?? String(p?.id ?? id),
          title: p?.title ?? p?.name ?? "",
          name: p?.title ?? p?.name ?? p?.slug ?? String(p?.id ?? id),
          brand: (p?.brands && p.brands.length) ? p.brands[0].name : (p?.brand || ""),
          price,
          originalPrice: compareAt,
          discount,
          category: (Array.isArray(p?.categories) && p.categories.length) ? p.categories[0].name : (p?.category || ""),
          inStock: stockQty > 0,
          stockCount: stockQty,
          rating: p?.rating ?? 4.5,
          reviewCount: p?.reviewCount ?? 0,
          images,
          description: p?.description ?? "",
          washCare: p?.washCare ?? p?.wash_care ?? "",
          offers: p?.offers ?? [],
          features: p?.features ?? [],
        };

        if (mounted) setProduct(mapped);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        if (mounted) setError("Failed to load product.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image Carousel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ImageCarousel images={product.images} productName={product.name} />
          </div>

          {/* Right Column - Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-12">
          <TrustBadges />
        </div>

        {/* Product Details Tabs with Reviews */}
        <div className="mb-12">
          <ProductTabs
            description={product.description}
            washCare={product.washCare}
            features={product.features}
            productId={product.id}
            productName={product.name}
          />
        </div>

        {/* Related Products */}
        <div>
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
}
