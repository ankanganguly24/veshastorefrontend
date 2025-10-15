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
import { cn } from "@/lib/utils";
import { CategoryService } from "@/services/category-service";
import { OptionService } from "@/services/option-service";
import { OptionValueService } from "@/services/option-value-service";
import CategoryTree from "@/components/admin/categories/category-tree";
import CategoryMultiSelect from "@/components/admin/categories/category-multi-select";
import MultiSelect from "@/components/ui/multi-select"; // Assuming a reusable multi-select component exists
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ProductVariantsEditor from "@/components/admin/products/product-variants-editor";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.array(z.string()).min(1, "At least one category must be selected"),
  price: z.string().min(1, "Price is required"),
  sku: z.string().min(1, "SKU is required"),
  stock: z.string().min(1, "Stock quantity is required"),
  compare_at_price: z.string().optional(),
  barcode: z.string().optional(),
  weight_value: z.string().optional(),
  weight_unit_id: z.string().optional(),
  length_value: z.string().optional(),
  length_unit_id: z.string().optional(),
  width_value: z.string().optional(),
  width_unit_id: z.string().optional(),
  height_value: z.string().optional(),
  height_unit_id: z.string().optional(),
  brand: z.string().optional(),
  material: z.string().optional(),
});

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptionValueIds, setSelectedOptionValueIds] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [variants, setVariants] = useState([]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      sku: "",
      stock: "",
      compare_at_price: "",
      barcode: "",
      weight_value: "",
      weight_unit_id: "",
      length_value: "",
      length_unit_id: "",
      width_value: "",
      width_unit_id: "",
      height_value: "",
      height_unit_id: "",
      brand: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await CategoryService.getCategoriesTree();
        if (response.success && response.data?.categories_tree) {
          setCategories(response.data.categories_tree); // Extract categories_tree
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    const fetchOptions = async () => {
      try {
        const optionResponse = await OptionService.getAll();
        const valueResponse = await OptionValueService.getAll();

        console.log("Option Response:", optionResponse);
        console.log("Value Response:", valueResponse);

        if (
          optionResponse.success &&
          Array.isArray(optionResponse.data.options) &&
          valueResponse.success &&
          Array.isArray(valueResponse.data.optionValues)
        ) {
          const optionsWithValues = optionResponse.data.options.map((option) => ({
            ...option,
            values: valueResponse.data.optionValues.filter(
              (val) => val.option_definition_id === option.id
            ),
          }));
          setOptions(optionsWithValues);
        } else {
          console.error("Unexpected response format:", {
            optionResponse,
            valueResponse,
          });
        }
      } catch (error) {
        console.error("Error fetching options and values:", error);
      }
    };

    fetchCategories();
    fetchOptions();
  }, []);

  useEffect(() => {
    console.log("Categories state updated:", categories);
  }, [categories]);

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^a-z0-9\-]/g, "") // Remove invalid chars
      .replace(/\-+/g, "-");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        categories: selectedCategoryIds,
        title: data.name,
        slug: slugify(data.name || ""),
        description: data.description,
        is_active: true,
        media: images.map((img) => ({ url: img.url, alt: img.name })),
        variants, // use variants from ProductVariantsEditor
      };

      console.log("Product payload:", payload);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("API error:", await res.text());
        alert("Failed to create product.");
      } else {
        alert("Product created successfully.");
        form.reset();
        setImages([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setSelectedCategoryIds([]);
        setSelectedOptionValueIds([]);
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error while preparing the product. See console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Mock image handling - in real app, upload to storage
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

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleCategorySelect = (category) => {
    const collectAllChildren = (cat) => {
      const children = cat.children || [];
      return [cat.id, ...children.flatMap(collectAllChildren)];
    };

    const allIds = collectAllChildren(category);

    setSelectedCategoryIds((prev) => {
      const isSelected = allIds.every((id) => prev.includes(id));
      if (isSelected) {
        return prev.filter((id) => !allIds.includes(id));
      } else {
        return [...prev, ...allIds.filter((id) => !prev.includes(id))];
      }
    });
  };

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
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="text-muted-foreground">Create a new clothing item for your store</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
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

        
              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <label htmlFor="images" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-foreground">
                            Drop images here or click to upload
                          </span>
                          <input
                            id="images"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <Image
                              src={image.url}
                              alt={image.name}
                              width={200}
                              height={96}
                              className="w-full h-24 object-cover rounded-lg border border-border"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(image.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Variants */}
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
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setIsCategoryModalOpen(true)}>
                    Select Categories
                  </Button>

                    {/* Display selected categories outside the modal */}
      <div className="mt-4">
        <strong>Selected Categories:</strong>
        <ul className="list-disc pl-5">
          {selectedCategoryIds.map((id) => {
            const findCategory = (categories, id) => {
              for (const category of categories) {
                if (category.id === id) return category;
                if (category.children) {
                  const found = findCategory(category.children, id);
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

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Creating..." : "Create Product"}
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
          <DialogHeader>
            <DialogTitle>Select Categories</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="text-muted-foreground py-4 text-center">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="text-muted-foreground py-4 text-center">No categories available</div>
            ) : (
              <>
                <CategoryMultiSelect
                  categories={categories}
                  onSelect={(selectedIds) => setSelectedCategoryIds(selectedIds)}
                />
              </>
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
