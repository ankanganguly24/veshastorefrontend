"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Services
import { CategoryService } from "@/services/category-service";
import { OptionService } from "@/services/option-service";
import { OptionValueService } from "@/services/option-value-service";
import { MediaService } from "@/services/media-service";
import { ProductService } from "@/services/product-service";

// Components
import { ProductBasicInfo } from "@/components/admin/products/product-basic-info";
import { ProductImageUpload } from "@/components/admin/products/product-image-upload";
import { ProductCategorySelector } from "@/components/admin/products/product-category-selector";
import ProductVariantsEditor from "@/components/admin/products/product-variants-editor";

// Validation
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

/**
 * Add Product Page
 * Refactored to be under 200 lines with proper component separation
 */
export default function AddProductPage() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [allMedia, setAllMedia] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [variants, setVariants] = useState([]);
  const [options, setOptions] = useState([]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories-tree"],
    queryFn: async () => {
      const response = await CategoryService.getCategoriesTree();
      return response.data?.categories_tree || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Fetch options and media
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [optionResponse, valueResponse, mediaResponse] = await Promise.all([
          OptionService.getAll(),
          OptionValueService.getAll(),
          MediaService.getAll(),
        ]);

        if (optionResponse.success && valueResponse.success) {
          const optionsWithValues = optionResponse.data.options.map((option) => ({
            ...option,
            values: valueResponse.data.optionValues.filter(
              (val) => val.option_definition_id === option.id
            ),
          }));
          setOptions(optionsWithValues);
        }

        if (mediaResponse.success && mediaResponse.data?.mediaList) {
          setAllMedia(mediaResponse.data.mediaList);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load form data");
      }
    };

    fetchData();
  }, []);

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: (payload) => ProductService.create(payload),
    onSuccess: () => {
      toast.success("Product created successfully!");
      router.push("/admin/products");
    },
    onError: (error) => {
      console.error("API error:", error);
      toast.error(error.response?.data?.message || "Failed to create product");
    },
  });

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  const onSubmit = async (data) => {
    // Validation
    if (selectedCategoryIds.length === 0) {
      toast.error("Please select at least one category");
      return;
    }
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }
    
    // Variants are now optional - only validate if they exist
    if (variants.length > 0) {
      const hasInvalidVariant = variants.some(
        (v) => !v.sku || !v.price || v.stock_quantity === undefined
      );
      if (hasInvalidVariant) {
        toast.error("Please ensure every variant has SKU, price, and stock quantity");
        return;
      }
    } else {
      // If no variants, show warning but allow submission
      toast.warning("No variants added. You can add them later.");
    }

    const payload = {
      title: data.name,
      slug: slugify(data.name),
      description: data.description,
      is_active: true,
      categories: selectedCategoryIds,
      media_ids: uploadedImages.map((img) => img.id),
      variants: variants.map((variant) => ({
        sku: variant.sku,
        price: Number(variant.price),
        compare_at_price: variant.compare_at_price ? Number(variant.compare_at_price) : undefined,
        stock_quantity: Number(variant.stock_quantity),
        is_default: variant.is_default || false,
        is_active: variant.is_active !== false,
        barcode: variant.barcode || undefined,
        weight_value: variant.weight_value ? Number(variant.weight_value) : undefined,
        weight_unit_id: variant.weight_unit_id || undefined,
        option_value_ids: variant.option_value_ids || [],
        media_ids: variant.media_ids || [],
      })),
    };

    createProductMutation.mutate(payload);
  };

  const isLoading = createProductMutation.isLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">Create a new item for your store</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ProductBasicInfo form={form} />
              <ProductImageUpload
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                allMedia={allMedia}
                setAllMedia={setAllMedia}
              />
              <Card>
                <CardContent className="pt-6">
                  <ProductVariantsEditor
                    options={options}
                    variants={variants}
                    setVariants={setVariants}
                    allMedia={allMedia}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProductCategorySelector
                categories={categoriesData || []}
                selectedCategoryIds={selectedCategoryIds}
                setSelectedCategoryIds={setSelectedCategoryIds}
                isLoading={categoriesLoading}
              />

              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Product"
                    )}
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/products">Cancel</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}