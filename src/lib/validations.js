import { z } from "zod";

/**
 * Product Validation Schemas
 * Zod schemas for product-related forms and data validation
 */

// Product variant schema
export const productVariantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(0, "Price must be positive"),
  compare_at_price: z.number().min(0).optional(),
  stock_quantity: z.number().int().min(0, "Stock must be non-negative"),
  variantOptions: z.array(z.object({
    optionValue: z.object({
      id: z.number(),
      value: z.string(),
    }),
  })).optional(),
});

// Product media schema
export const productMediaSchema = z.object({
  media: z.object({
    url: z.string().url("Invalid image URL"),
    alt: z.string().optional(),
  }),
  is_primary: z.boolean().default(false),
});

// Main product schema
export const productSchema = z.object({
  title: z.string().min(1, "Product title is required").max(200, "Title too long"),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  categories: z.array(z.object({
    category: z.object({
      id: z.number(),
      name: z.string(),
    }),
  })).min(1, "At least one category is required"),
  variants: z.array(productVariantSchema).min(1, "At least one variant is required"),
  media: z.array(productMediaSchema).optional(),
});

// Product form schema (for creating/editing)
export const productFormSchema = z.object({
  title: z.string().min(1, "Product title is required").max(200, "Title too long"),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  category_ids: z.array(z.number()).min(1, "Select at least one category"),
  sku: z.string().min(1, "SKU is required"),
  price: z.string().min(1, "Price is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    "Price must be a positive number"
  ),
  compare_at_price: z.string().optional().refine(
    (val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0),
    "Compare price must be a positive number"
  ),
  stock_quantity: z.string().min(1, "Stock quantity is required").refine(
    (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0,
    "Stock must be a non-negative number"
  ),
});

// Category schema
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100, "Name too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug too long").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase with hyphens only"
  ),
  description: z.string().optional(),
  parent_id: z.number().nullable().optional(),
});

// Option schema
export const optionSchema = z.object({
  name: z.string().min(1, "Option name is required").max(50, "Name too long"),
  display_name: z.string().min(1, "Display name is required").max(50, "Name too long"),
});

// Option value schema
export const optionValueSchema = z.object({
  value: z.string().min(1, "Value is required").max(50, "Value too long"),
  option_definition_id: z.number().min(1, "Option definition is required"),
});
