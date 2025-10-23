"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilters } from "@/components/common/search-and-filters";
import { StatusBadge } from "@/components/common/status-badge";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { TableActions } from "@/components/common/table-actions";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product-service";
import { ProductDetailsDialog } from "@/components/admin/products/product-details-dialogue";

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Fetch products from API
	const { data, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await ProductService.getAll();
			return res.data?.products || [];
		},
	});

	const filteredProducts = useMemo(() => {
		if (!data) return [];
		return data.filter(
			(product) =>
				product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(product.categories?.[0]?.category?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.variants?.[0]?.sku?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, data]);

	const handleViewProduct = (product) => {
		setSelectedProduct(product);
		setIsDialogOpen(true);
	};

	const handleOpenInNewTab = (productId) => {
		window.open(`/product/${productId}`, '_blank');
	};

	const columns = useMemo(
		() => [
			{
				accessorKey: "title",
				header: "Product",
				cell: ({ row }) => {
					const product = row.original;
					const primaryImage = product.media?.find(m => m.is_primary)?.media?.url;
					return (
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
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
								? product.categories.map((cat) => cat.category?.name || cat.name).join(", ")
								: "-"}
						</span>
					);
				},
			},
			{
				id: "price",
				header: "Price",
				cell: ({ row }) => {
					const product = row.original;
					const price = product.variants?.[0]?.price;
					const comparePrice = product.variants?.[0]?.compare_at_price;
					return (
						<div>
							<span className="font-medium">
								{price ? `₹${price}` : "-"}
							</span>
							{comparePrice && comparePrice > price && (
								<span className="text-xs text-muted-foreground line-through ml-2">
									₹{comparePrice}
								</span>
							)}
						</div>
					);
				},
			},
			{
				id: "stock",
				header: "Stock",
				cell: ({ row }) => {
					const product = row.original;
					const stock = product.variants?.[0]?.stock_quantity;
					return (
						<span className={stock === 0 ? "text-red-500 font-medium" : ""}>
							{stock ?? "-"}
						</span>
					);
				},
			},
			{
				id: "variantDetails",
				header: "Variants",
				cell: ({ row }) => {
					const product = row.original;
					const variantCount = product.variants?.length || 0;
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
						<div>
							<p className="text-sm font-medium text-foreground">
								{variantCount} variant{variantCount !== 1 ? 's' : ''}
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
						<div className="flex items-center gap-2">
							<TableActions
								editHref={`/admin/products/edit/${product.id}`}
								onView={() => handleViewProduct(product)}
								onDelete={() => console.log("Delete", product.id)}
							/>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => handleOpenInNewTab(product.id)}
								title="Open in new tab"
							>
								<ExternalLink className="h-4 w-4" />
							</Button>
						</div>
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

			{/* Product Details Dialog */}
			<ProductDetailsDialog
				product={selectedProduct}
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			/>
		</div>
	);
}