"use client";

import { Package } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";

/**
 * ProductsTable Component
 * Displays products in a table format
 * Extracted from main products page for better code organization
 */
export function ProductsTable({ 
  products, 
  isLoading, 
  onView, 
  onEdit, 
  onDelete,
  onOpenInNewTab 
}) {
  if (isLoading) {
    return (
      <div className="border rounded-lg p-6 space-y-4">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-3 rounded-lg border">
              <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              <div className="h-4 w-12 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-sm text-muted-foreground">
          Get started by adding your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Product</th>
              <th className="text-left p-4 font-medium">Category</th>
              <th className="text-left p-4 font-medium">Price</th>
              <th className="text-left p-4 font-medium">Stock</th>
              <th className="text-left p-4 font-medium">Variants</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onOpenInNewTab={onOpenInNewTab}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t bg-muted/20 text-sm text-muted-foreground">
        Showing 1 to {products.length} of {products.length} entries
      </div>
    </div>
  );
}

/**
 * ProductRow Component
 * Single product row in the table
 */
function ProductRow({ product, onView, onEdit, onDelete, onOpenInNewTab }) {
  const primaryImage = product.media?.find((m) => m.is_primary)?.media?.url;
  const price = product.variants?.[0]?.price;
  const comparePrice = product.variants?.[0]?.compare_at_price;
  const stock = product.variants?.[0]?.stock_quantity;
  const variantCount = product.variants?.length || 0;

  // Extract sizes and colors
  const sizes = [
    ...new Set(
      product.variants
        ?.flatMap((v) =>
          v.variantOptions
            ?.filter((opt) => opt.optionValue?.optionDefinition?.name === "size")
            .map((opt) => opt.optionValue?.value)
        )
        .filter(Boolean)
    ),
  ];

  const colors = [
    ...new Set(
      product.variants
        ?.flatMap((v) =>
          v.variantOptions
            ?.filter((opt) => opt.optionValue?.optionDefinition?.name === "color")
            .map((opt) => opt.optionValue?.value)
        )
        .filter(Boolean)
    ),
  ];

  return (
    <tr className="border-t hover:bg-muted/30 transition-colors">
      <td className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{product.title}</p>
            <p className="text-sm text-muted-foreground">
              SKU: {product.variants?.[0]?.sku || "-"}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm">
          {product.categories && product.categories.length > 0
            ? product.categories.map((cat) => cat.category?.name || cat.name).join(", ")
            : "-"}
        </span>
      </td>
      <td className="p-4">
        <div>
          <span className="font-medium">{price ? `₹${price}` : "-"}</span>
          {comparePrice && comparePrice > price && (
            <span className="text-xs text-muted-foreground line-through ml-2">
              ₹{comparePrice}
            </span>
          )}
        </div>
      </td>
      <td className="p-4">
        <span className={stock === 0 ? "text-red-500 font-medium" : ""}>
          {stock ?? "-"}
        </span>
      </td>
      <td className="p-4">
        <div className="text-sm">
          <p className="font-medium">
            {variantCount} variant{variantCount !== 1 ? "s" : ""}
          </p>
          {sizes.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Sizes: {sizes.slice(0, 3).join(", ")}
              {sizes.length > 3 && ` +${sizes.length - 3}`}
            </p>
          )}
          {colors.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Colors: {colors.slice(0, 3).join(", ")}
              {colors.length > 3 && ` +${colors.length - 3}`}
            </p>
          )}
        </div>
      </td>
      <td className="p-4">
        <StatusBadge status={product.is_active ? "active" : "inactive"} />
      </td>
      <td className="p-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onView(product)}
            className="px-3 py-1.5 text-sm hover:bg-muted rounded-md transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onEdit(product.id)}
            className="px-3 py-1.5 text-sm hover:bg-muted rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
