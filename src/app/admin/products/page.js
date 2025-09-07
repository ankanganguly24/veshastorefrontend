"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    category: "T-Shirts",
    price: "₹2,299",
    stock: 150,
    status: "active",
    image: "/api/placeholder/60/60",
    sku: "OCT-001",
    size: "S, M, L, XL",
    color: "White, Black, Navy",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    category: "Jeans", 
    price: "₹5,999",
    stock: 75,
    status: "active",
    image: "/api/placeholder/60/60",
    sku: "SFJ-002",
    size: "28, 30, 32, 34, 36",
    color: "Blue, Black",
  },
  {
    id: 3,
    name: "Summer Dress",
    category: "Dresses",
    price: "₹4,499",
    stock: 0,
    status: "out_of_stock",
    image: "/api/placeholder/60/60",
    sku: "SD-003",
    size: "XS, S, M, L",
    color: "Floral, Solid",
  },
  {
    id: 4,
    name: "Casual Hoodie",
    category: "Hoodies",
    price: "₹3,699",
    stock: 200,
    status: "active",
    image: "/api/placeholder/60/60",
    sku: "CH-004",
    size: "S, M, L, XL, XXL",
    color: "Gray, Black, White",
  },
  {
    id: 5,
    name: "Formal Blazer",
    category: "Blazers",
    price: "₹9,799",
    stock: 45,
    status: "low_stock",
    image: "/api/placeholder/60/60",
    sku: "FB-005",
    size: "36, 38, 40, 42, 44",
    color: "Navy, Black, Charcoal",
  },
];

function getStatusColor(status) {
  switch (status) {
    case "active":
      return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    case "low_stock":
      return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
    case "out_of_stock":
      return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
  }
}

function getStatusText(status) {
  switch (status) {
    case "active":
      return "Active";
    case "low_stock":
      return "Low Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return status;
  }
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your clothing inventory</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Centered Search */}
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, categories, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Stock</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Variants</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-accent/50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-foreground">{product.category}</td>
                    <td className="py-4 px-2 font-medium text-foreground">{product.price}</td>
                    <td className="py-4 px-2 text-foreground">{product.stock}</td>
                    <td className="py-4 px-2">
                      <div>
                        <p className="text-sm text-foreground">Sizes: {product.size}</p>
                        <p className="text-sm text-muted-foreground">Colors: {product.color}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium border",
                        getStatusColor(product.status)
                      )}>
                        {getStatusText(product.status)}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/products/edit/${product.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
