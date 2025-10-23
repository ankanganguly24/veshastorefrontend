"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Tag, Palette, Ruler, Barcode, Weight, Box } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ProductDetailsDialog({ product, open, onOpenChange }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];
  const allImages = product.media?.map(m => m.media?.url).filter(Boolean) || [];

  // Group variants by options
  const sizes = [...new Set(
    product.variants?.flatMap(v =>
      v.variantOptions
        ?.filter(opt => opt.optionValue?.optionDefinition?.name === "size")
        .map(opt => opt.optionValue?.value)
    ).filter(Boolean)
  )];

  const colors = [...new Set(
    product.variants?.flatMap(v =>
      v.variantOptions
        ?.filter(opt => opt.optionValue?.optionDefinition?.name === "color")
        .map(opt => opt.optionValue?.value)
    ).filter(Boolean)
  )];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {allImages.length > 0 ? (
              <>
                <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={allImages[currentImageIndex]}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-full h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center">
                <Package className="w-20 h-20 text-primary/60" />
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Status and Category */}
            <div className="flex items-center gap-2">
              <Badge variant={product.is_active ? "default" : "secondary"}>
                {product.is_active ? "Active" : "Inactive"}
              </Badge>
              {product.categories?.[0] && (
                <Badge variant="outline">
                  {product.categories[0].category?.name || product.categories[0].name}
                </Badge>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Description</h3>
                <p className="text-sm text-foreground">{product.description}</p>
              </div>
            )}

            <Separator />

            {/* Price Information */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Pricing
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{defaultVariant?.price || 0}
                  </p>
                </div>
                {defaultVariant?.compare_at_price && (
                  <div>
                    <p className="text-sm text-muted-foreground">Compare At</p>
                    <p className="text-xl font-semibold text-muted-foreground line-through">
                      ₹{defaultVariant.compare_at_price}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Variants */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Variants
              </h3>
              
              {sizes.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Ruler className="w-3 h-3" />
                    Sizes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size, idx) => (
                      <Badge key={idx} variant="secondary">{size}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {colors.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Palette className="w-3 h-3" />
                    Colors
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color, idx) => (
                      <Badge key={idx} variant="secondary">{color}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Stock & SKU */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Package className="w-4 h-4" />
                Inventory
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Barcode className="w-3 h-3" />
                    SKU
                  </p>
                  <p className="font-mono text-sm">{defaultVariant?.sku || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Box className="w-3 h-3" />
                    Stock
                  </p>
                  <p className="font-semibold">{defaultVariant?.stock_quantity || 0} units</p>
                </div>
              </div>

              {defaultVariant?.barcode && (
                <div>
                  <p className="text-sm text-muted-foreground">Barcode</p>
                  <p className="font-mono text-sm">{defaultVariant.barcode}</p>
                </div>
              )}
            </div>

            {/* Dimensions */}
            {(defaultVariant?.weight_value || defaultVariant?.length_value) && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    Dimensions
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {defaultVariant?.weight_value && (
                      <div>
                        <p className="text-muted-foreground">Weight</p>
                        <p className="font-medium">
                          {defaultVariant.weight_value} {defaultVariant.weightUnit?.code}
                        </p>
                      </div>
                    )}
                    {defaultVariant?.length_value && (
                      <div>
                        <p className="text-muted-foreground">Dimensions</p>
                        <p className="font-medium">
                          {defaultVariant.length_value} × {defaultVariant.width_value} × {defaultVariant.height_value} {defaultVariant.lengthUnit?.code}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Return Policy */}
            {defaultVariant?.is_returnable && (
              <>
                <Separator />
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    ✓ Returnable within {defaultVariant.return_in_days} days
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Variants Table */}
        {product.variants && product.variants.length > 1 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">All Variants ({product.variants.length})</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3">SKU</th>
                    <th className="text-left p-3">Options</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Stock</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3 font-mono text-xs">{variant.sku}</td>
                      <td className="p-3">
                        {variant.variantOptions?.map(opt => opt.optionValue?.value).join(" / ")}
                      </td>
                      <td className="p-3 font-semibold">₹{variant.price}</td>
                      <td className="p-3">{variant.stock_quantity}</td>
                      <td className="p-3">
                        <Badge variant={variant.is_active ? "default" : "secondary"} className="text-xs">
                          {variant.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}