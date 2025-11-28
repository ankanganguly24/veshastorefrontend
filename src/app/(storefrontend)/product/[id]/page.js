"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "@/components/common/image-carousel";
import ProductInfo from "@/components/common/product-info";
import ProductTabs from "@/components/common/product-tabs";
import { ProductService } from "@/services/product-service";
import api from "@/utils/axios";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

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

        const productData = res?.data?.product || res?.product || res?.data || res;
        const defaultVariant = productData.variants?.find(v => v.is_default) || productData.variants?.[0];

        const images = productData.media?.map(mediaItem => {
          const medium720p = mediaItem.media?.variants?.find(
            v => v.variant_key === 'medium' && v.metadata?.resolution === '720p'
          );
          const thumbnail720p = mediaItem.media?.variants?.find(
            v => v.variant_key === 'thumbnail' && v.metadata?.resolution === '720p'
          );
          return medium720p?.url || thumbnail720p?.url || mediaItem.media?.url;
        }).filter(Boolean) || [];

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

        const price = defaultVariant?.price || 0;
        const compareAt = defaultVariant?.compare_at_price || null;
        const discount = (compareAt && price) 
          ? Math.round(((compareAt - price) / compareAt) * 100) 
          : null;

        const mapped = {
          id: productData.id,
          slug: productData.slug || String(productData.id),
          title: productData.title,
          name: productData.title,
          brand: productData.brands?.[0]?.name || "Vesha",
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading product...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Unavailable</h3>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${product.categories?.[0]?.category?.id}`} className="hover:text-gray-900 transition-colors">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left - Image Carousel */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <ImageCarousel images={product.images} productName={product.name} />
          </div>

          {/* Right - Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-4xl mx-auto border-t border-gray-100 pt-16">
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