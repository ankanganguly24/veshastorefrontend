"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCategoryStore from "@/stores/category-store";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import api from "@/utils/axios"; // <-- Import custom axios instance

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be valid (lowercase, numbers, hyphens)"),
  description: z.string().optional(),
  parent_id: z.string().nullable().optional(),
});

export default function CategoryForm({ category = null, onSuccess = () => {} }) {
  const { addCategory, updateCategory, categories, isLoading } = useCategoryStore();
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(!category?.slug);
  const isEditing = !!category?.id;  // Make sure we check for id existence
  
  // Check if we have a valid category with an id for editing
  useEffect(() => {
    if (isEditing && !category.id) {
      toast.error("Cannot edit category: Missing category ID");
    }
  }, [category, isEditing]);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      parent_id: category?.parent_id || "null",
    },
  });

  // Auto-generate slug from name if enabled
  const watchedName = form.watch("name");
  useEffect(() => {
    if (autoGenerateSlug) {
      if (watchedName) {
        const slug = watchedName
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        form.setValue("slug", slug);
      }
    }
  }, [watchedName, autoGenerateSlug, form]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        if (!category.id) {
          throw new Error("Cannot update: Missing category ID");
        }
        // Use correct endpoint for update
        await api.put(`/product/category/${category.id}`, data);
        toast.success("Category updated successfully");
      } else {
        // Use correct endpoint for create
        await api.post("/product/category", data);
        toast.success("Category created successfully");
      }
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to save category");
    }
  };

  // Filter out the current category and its children when editing
  const availableParentCategories = categories.filter((cat) => {
    if (!isEditing) return true;
    return cat.id !== category.id && 
           // Prevent circular references by excluding all descendants
           !isCategoryDescendant(cat, category.id, categories);
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Slug</FormLabel>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="autoSlug"
                    checked={autoGenerateSlug}
                    onChange={() => setAutoGenerateSlug(!autoGenerateSlug)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="autoSlug" className="text-xs text-gray-500">
                    Auto-generate
                  </label>
                </div>
              </div>
              <FormControl>
                <Input 
                  placeholder="category-slug" 
                  {...field} 
                  disabled={autoGenerateSlug}
                />
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
                <Textarea
                  placeholder="Category description (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parent_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || "null"}
                defaultValue={field.value || "null"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent category (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">None (Top Level)</SelectItem>
                  {availableParentCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading || (isEditing && !category.id)} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Category" : "Create Category"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}

// Helper function to check if a category is a descendant of another
function isCategoryDescendant(category, ancestorId, allCategories) {
  if (category.parent_id === ancestorId) return true;
  if (!category.parent_id) return false;
  
  const parent = allCategories.find(cat => cat.id === category.parent_id);
  if (!parent) return false;
  
  return isCategoryDescendant(parent, ancestorId, allCategories);
}