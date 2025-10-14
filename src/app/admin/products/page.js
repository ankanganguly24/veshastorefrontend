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
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product-service";

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch products from API
	const { data, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await ProductService.getAll();
			// API returns { success, data: { products: [...] } }
			return res.data?.products || [];
		},
	});

	const filteredProducts = useMemo(() => {
		if (!data) return [];
		return data.filter(
			(product) =>
				product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(product.categories?.[0]?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.variants?.[0]?.sku?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, data]);

	const columns = useMemo(
		() => [
			{
				accessorKey: "title",
				header: "Product",
				cell: ({ row }) => {
					const product = row.original;
					return (
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
								<Package className="h-6 w-6 text-muted-foreground" />
							</div>
							<div>
								<p className="font-medium text-foreground">{product.title}</p>
								<p className="text-sm text-muted-foreground">
									SKU: {product.variants?.[0]?.sku || "-"}
								</p>
							</div>
						</div>
					);
				},
			},
			{
				accessorKey: "categories",
				header: "Category",
				cell: ({ row }) => {
					const product = row.original;
					return (
						<span>
							{product.categories && product.categories.length > 0
								? product.categories.map((cat) => cat.name).join(", ")
								: "-"}
						</span>
					);
				},
			},
			{
				id: "price", // <-- unique id for price column
				header: "Price",
				cell: ({ row }) => {
					const product = row.original;
					const price = product.variants?.[0]?.price;
					return <span className="font-medium">{price ? `₹${price}` : "-"}</span>;
				},
			},
			{
				id: "stock", // <-- unique id for stock column
				header: "Stock",
				cell: ({ row }) => {
					const product = row.original;
					const stock = product.variants?.[0]?.stock_quantity;
					return <span>{stock ?? "-"}</span>;
				},
			},
			{
				id: "variantDetails", // <-- unique id for variants details column
				header: "Variants",
				cell: ({ row }) => {
					const product = row.original;
					const sizes = product.variants
						?.map((v) =>
							v.variantOptions
								?.filter((opt) => opt.optionValue?.optionDefinition?.name === "size")
								.map((opt) => opt.optionValue?.value)
								.join(", ")
						)
						.filter(Boolean)
						.join(" | ");
					const colors = product.variants
						?.map((v) =>
							v.variantOptions
								?.filter((opt) => opt.optionValue?.optionDefinition?.name === "color")
								.map((opt) => opt.optionValue?.value)
								.join(", ")
						)
						.filter(Boolean)
						.join(" | ");
					return (
						<div>
							<p className="text-sm text-foreground">Sizes: {sizes || "-"}</p>
							<p className="text-sm text-muted-foreground">Colors: {colors || "-"}</p>
						</div>
					);
				},
			},
			{
				accessorKey: "is_active",
				header: "Status",
				cell: ({ getValue }) => <StatusBadge status={getValue() ? "active" : "inactive"} />,
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
				loading={isLoading}
			/>
		</div>
	);
}

