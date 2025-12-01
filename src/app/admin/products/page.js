"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product-service";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductsSearch } from "@/components/admin/products/products-search";
import { ProductDetailsDialog } from "@/components/admin/products/product-details-dialogue";
import { toast } from "sonner";

/**
 * Products Page
 * Main page for managing products
 * Refactored to be under 200 lines with proper separation of concerns
 */
export default function ProductsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch products with caching
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await ProductService.getAll();
      return res.data?.products || [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.title?.toLowerCase().includes(term) ||
        product.categories?.[0]?.category?.name?.toLowerCase().includes(term) ||
        product.variants?.[0]?.sku?.toLowerCase().includes(term)
    );
  }, [searchTerm, products]);

  // Handlers
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (productId) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const handleDeleteProduct = async (product) => {
    if (!confirm(`Delete "${product.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await ProductService.delete(product.id);
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleOpenInNewTab = (productId) => {
    window.open(`/product/${productId}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search */}
      <ProductsSearch
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm("")}
      />

      {/* Products Table */}
      <ProductsTable
        products={filteredProducts}
        isLoading={isLoading}
        onView={handleViewProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onOpenInNewTab={handleOpenInNewTab}
      />

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        product={selectedProduct}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
