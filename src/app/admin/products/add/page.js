"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategoryService } from "@/services/category-service";
import { OptionService } from "@/services/option-service";
import { OptionValueService } from "@/services/option-value-service";
import CategoryMultiSelect from "@/components/admin/categories/category-multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ProductVariantsEditor from "@/components/admin/products/product-variants-editor";
import { useMutation } from "@tanstack/react-query";
import { ProductService } from "@/services/product-service";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [options, setOptions] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [variants, setVariants] = useState([]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const catResponse = await CategoryService.getCategoriesTree();
        if (catResponse.success && catResponse.data?.categories_tree) {
          setCategories(catResponse.data.categories_tree);
        } else {
          console.error("Invalid category response format:", catResponse);
        }

        const [optionResponse, valueResponse] = await Promise.all([
          OptionService.getAll(),
          OptionValueService.getAll(),
        ]);

        if (
          optionResponse.success && Array.isArray(optionResponse.data.options) &&
          valueResponse.success && Array.isArray(valueResponse.data.optionValues)
        ) {
          const optionsWithValues = optionResponse.data.options.map((option) => ({
            ...option,
            values: valueResponse.data.optionValues.filter(
              (val) => val.option_definition_id === option.id
            ),
          }));
          setOptions(optionsWithValues);
        } else {
          console.error("Unexpected options response format:", { optionResponse, valueResponse });
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // --- THIS IS THE ONLY CHANGE YOU NEED TO MAKE ---
  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^a-z-]/g, "") // Remove any character that is NOT a lowercase letter or a dash
      .replace(/\-+/g, "-") // Replace multiple dashes with a single dash
      .replace(/^-+|-+$/g, ""); // Remove leading or trailing dashes

  const createProductMutation = useMutation({
    mutationFn: (payload) => ProductService.create(payload),
    onSuccess: () => {
      alert("Product created successfully.");
      form.reset();
      setImages([]);
      setSelectedCategoryIds([]);
      setVariants([]);
    },
    onError: (error) => {
      console.error("API error:", error);
      // Display the specific validation message if available
      const errorDetails = error.response?.data?.details;
      let alertMessage = "Failed to create product. Check console for details.";
      if (errorDetails && typeof errorDetails === 'string') {
        try {
          const details = JSON.parse(errorDetails);
          if (details[0] && details[0].message) {
            alertMessage = `Failed to create product: ${details[0].message}`;
          }
        } catch (e) { /* Ignore parsing error */ }
      }
      alert(alertMessage);
    },
  });

  const onSubmit = async (data) => {
    if (selectedCategoryIds.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    if (variants.length === 0) {
      alert("Please add at least one product variant.");
      return;
    }
    
    const hasInvalidVariant = variants.some(v => !v.sku || !v.price || !v.stock_quantity === undefined);
    if (hasInvalidVariant) {
        alert("Please ensure every variant has a SKU, price, and stock quantity.");
        return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title: data.name,
        slug: slugify(data.name || ""),
        description: data.description,
        is_active: true,
        categories: selectedCategoryIds,
        variants: variants.map((variant) => ({
          ...variant,
          price: Number(variant.price),
          compare_at_price: variant.compare_at_price ? Number(variant.compare_at_price) : undefined,
          stock_quantity: Number(variant.stock_quantity),
        })),
      };

      console.log("Submitting Product Payload:", payload);
      await createProductMutation.mutateAsync(payload);

    } catch (err) {
      console.error("Error during product submission:", err);
      // This catch block will now likely be handled by react-query's onError
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains the same
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="text-muted-foreground">Create a new item for your store</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Premium Cotton T-Shirt" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Describe the product features, fit, and care instructions"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Product Images</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <label htmlFor="images" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-foreground">
                            Drop images here or click to upload
                          </span>
                          <input id="images" type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                    </div>
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <Image src={image.url} alt={image.name} width={200} height={96} className="w-full h-24 object-cover rounded-lg border border-border" />
                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeImage(image.id)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6 p-4 bg-white border border-primary/10 rounded-xl shadow">
                <h2 className="text-lg font-bold text-primary mb-2">Variants</h2>
                <ProductVariantsEditor
                  options={options}
                  variants={variants}
                  setVariants={setVariants}
                />
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
                <CardContent>
                  <Button type="button" onClick={() => setIsCategoryModalOpen(true)}>
                    Select Categories
                  </Button>
                  <div className="mt-4">
                    <strong>Selected Categories:</strong>
                    <ul className="list-disc pl-5">
                      {selectedCategoryIds.map((id) => {
                        const findCategory = (cats, catId) => {
                          for (const category of cats) {
                            if (category.id === catId) return category;
                            if (category.children) {
                              const found = findCategory(category.children, catId);
                              if (found) return found;
                            }
                          }
                          return null;
                        };
                        const category = findCategory(categories, id);
                        return category ? <li key={id}>{category.name}</li> : null;
                      })}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button type="submit" disabled={isLoading || createProductMutation.isLoading} className="w-full">
                      {isLoading || createProductMutation.isLoading ? "Creating..." : "Create Product"}
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/products">Cancel</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>

      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Select Categories</DialogTitle></DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="text-muted-foreground py-4 text-center">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="text-muted-foreground py-4 text-center">No categories available</div>
            ) : (
              <CategoryMultiSelect
                categories={categories}
                selectedIds={selectedCategoryIds}
                onSelect={setSelectedCategoryIds}
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsCategoryModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
