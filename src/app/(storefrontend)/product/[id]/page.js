"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "@/components/common/image-carousel";
import ProductInfo from "@/components/common/product-info";
import TrustBadges from "@/components/common/trust-badges";
import ProductTabs from "@/components/common/product-tabs";
import { ProductService } from "@/services/product-service";
import api from "@/utils/axios";
import Link from "next/link";

export default function ProductPage({ params }) {
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
        let res;
        try {
          res = await ProductService.getById(id);
        } catch (err) {
          const fallback = await api.get(`/product/${encodeURIComponent(id)}`);
          res = fallback.data;
        }

        // Extract product from response
        const productData = res?.data?.product || res?.product || res?.data || res;

        // Get default variant
        const defaultVariant = productData.variants?.find(v => v.is_default) || productData.variants?.[0];

        // Extract all images with proper preference for quality
        const images = productData.media?.map(mediaItem => {
          // Prefer medium 720p, then thumbnail 720p, then original
          const medium720p = mediaItem.media?.variants?.find(
            v => v.variant_key === 'medium' && v.metadata?.resolution === '720p'
          );
          const thumbnail720p = mediaItem.media?.variants?.find(
            v => v.variant_key === 'thumbnail' && v.metadata?.resolution === '720p'
          );
          
          return medium720p?.url || thumbnail720p?.url || mediaItem.media?.url;
        }).filter(Boolean) || [];

        // Extract sizes and colors from all variants
        const sizes = [...new Set(
          productData.variants?.flatMap(v =>
            v.variantOptions
              ?.filter(opt => opt.optionValue?.optionDefinition?.name === "size")
              .map(opt => opt.optionValue?.value)
          ).filter(Boolean)
        )] || ["XS", "S", "M", "L", "XL", "XXL"];

        const colors = [...new Set(
          productData.variants?.flatMap(v =>
            v.variantOptions
              ?.filter(opt => opt.optionValue?.optionDefinition?.name === "color")
              .map(opt => opt.optionValue?.value)
          ).filter(Boolean)
        )] || ["Default"];

        // Calculate price details
        const price = defaultVariant?.price || 0;
        const compareAt = defaultVariant?.compare_at_price || null;
        const discount = (compareAt && price) 
          ? Math.round(((compareAt - price) / compareAt) * 100) 
          : null;

        // Map to UI-friendly format
        const mapped = {
          id: productData.id,
          slug: productData.slug || String(productData.id),
          title: productData.title,
          name: productData.title,
          brand: productData.brands?.[0]?.name || "Premium Brand",
          price,
          originalPrice: compareAt,
          discount,
          category: productData.categories?.[0]?.category?.name || "Fashion",
          inStock: (defaultVariant?.stock_quantity || 0) > 0,
          stockCount: defaultVariant?.stock_quantity || 0,
          rating: 4.5,
          reviewCount: 0,
          images: images.length > 0 ? images : ['/placeholder-image.jpg'],
          description: productData.description || "Premium quality product with excellent craftsmanship.",
          washCare: "Dry clean recommended. Machine wash cold on gentle cycle. Do not bleach. Tumble dry low. Iron on low heat if needed.",
          offers: [
            "Get 10% instant discount on all bank cards",
            "Free shipping on orders above ₹499",
            "Easy 7-day return and exchange",
            "Cash on Delivery available"
          ],
          features: [
            "Premium quality fabric with superior finish",
            "Comfortable and breathable material",
            "Perfect fit with modern design",
            "Durable construction for long-lasting wear",
            "Easy care and maintenance",
            "Available in multiple sizes and colors"
          ],
          // Pass raw data for advanced features
          variants: productData.variants || [],
          availableSizes: sizes,
          availableColors: colors,
          media: productData.media || [],
          categories: productData.categories || [],
          tags: productData.tags || [],
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Product</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

if (!product) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h3>
        <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Image Carousel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ImageCarousel images={product.images} productName={product.name} />
          </div>

          {/* Right - Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-12">
          <TrustBadges />
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs
            description={product.description}
            washCare={product.washCare}
            features={product.features}
            productId={product.id}
            productName={product.name}
          />
        </div>
      </div>
    </div>
  );
}