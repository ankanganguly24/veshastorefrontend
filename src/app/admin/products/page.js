"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilters } from "@/components/common/search-and-filters";
import { StatusBadge } from "@/components/common/status-badge";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { TableActions } from "@/components/common/table-actions";

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

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProducts = useMemo(() => {
		return products.filter(
			(product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.sku.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm]);

	const columns = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Product",
				cell: ({ row }) => {
					const product = row.original;
					return (
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
								<Package className="h-6 w-6 text-muted-foreground" />
							</div>
							<div>
								<p className="font-medium text-foreground">{product.name}</p>
								<p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
							</div>
						</div>
					);
				},
			},
			{
				accessorKey: "category",
				header: "Category",
			},
			{
				accessorKey: "price",
				header: "Price",
				cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
			},
			{
				accessorKey: "stock",
				header: "Stock",
			},
			{
				id: "variants",
				header: "Variants",
				cell: ({ row }) => {
					const product = row.original;
					return (
						<div>
							<p className="text-sm text-foreground">Sizes: {product.size}</p>
							<p className="text-sm text-muted-foreground">Colors: {product.color}</p>
						</div>
					);
				},
			},
			{
				accessorKey: "status",
				header: "Status",
				cell: ({ getValue }) => <StatusBadge status={getValue()} />,
			},
			{
				id: "actions",
				header: "Actions",
				cell: ({ row }) => {
					const product = row.original;
					return (
						<TableActions
							editHref={`/admin/products/edit/${product.id}`}
							onView={() => console.log("View", product.id)}
							onDelete={() => console.log("Delete", product.id)}
						/>
					);
				},
			},
		],
		[]
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<PageHeader
				title="Products"
				description="Manage your clothing inventory"
			>
				<Button asChild>
					<Link href="/admin/products/add">
						<Plus className="h-4 w-4 mr-2" />
						Add Product
					</Link>
				</Button>
			</PageHeader>

			{/* Centered Search */}
			<SearchAndFilters
				searchValue={searchTerm}
				onSearchChange={(e) => setSearchTerm(e.target.value)}
				searchPlaceholder="Search products, categories, or SKU..."
				centered
			/>

			{/* Products Table */}
			<DataTable
				data={filteredProducts}
				columns={columns}
				title="All Products"
			/>
		</div>
	);
}

