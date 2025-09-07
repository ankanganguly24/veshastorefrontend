"use client";

import { useState, useMemo } from "react";
import { Eye, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilterBar } from "@/components/common/search-filter-bar";
import { StatusBadge } from "@/components/common/status-badge";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { TableMoreActions } from "@/components/common/table-actions";

const orders = [
	{
		id: "#ORD-001",
		customer: "John Doe",
		email: "john@example.com",
		date: "2024-01-15",
		status: "delivered",
		total: "₹22,199",
		items: 3,
		payment: "paid",
	},
	{
		id: "#ORD-002",
		customer: "Jane Smith",
		email: "jane@example.com",
		date: "2024-01-15",
		status: "shipped",
		total: "₹11,099",
		items: 2,
		payment: "paid",
	},
	{
		id: "#ORD-003",
		customer: "Bob Johnson",
		email: "bob@example.com",
		date: "2024-01-14",
		status: "processing",
		total: "₹29,599",
		items: 1,
		payment: "paid",
	},
	{
		id: "#ORD-004",
		customer: "Alice Brown",
		email: "alice@example.com",
		date: "2024-01-14",
		status: "cancelled",
		total: "₹7,399",
		items: 1,
		payment: "refunded",
	},
	{
		id: "#ORD-005",
		customer: "Charlie Wilson",
		email: "charlie@example.com",
		date: "2024-01-13",
		status: "pending",
		total: "₹14,799",
		items: 2,
		payment: "pending",
	},
];

const statusFilters = [
	{ label: "All", value: "all" },
	{ label: "Pending", value: "pending" },
	{ label: "Processing", value: "processing" },
	{ label: "Shipped", value: "shipped" },
	{ label: "Delivered", value: "delivered" },
	{ label: "Cancelled", value: "cancelled" },
];

export default function OrdersPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredOrders = useMemo(() => {
		return orders.filter((order) => {
			const matchesSearch =
				order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.email.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus =
				statusFilter === "all" || order.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [searchTerm, statusFilter]);

	const columns = useMemo(
		() => [
			{
				accessorKey: "id",
				header: "Order",
				cell: ({ row }) => {
					const order = row.original;
					return (
						<div>
							<p className="font-medium text-foreground">{order.id}</p>
							<p className="text-sm text-muted-foreground">
								{order.items} items
							</p>
						</div>
					);
				},
			},
			{
				accessorKey: "customer",
				header: "Customer",
				cell: ({ row }) => {
					const order = row.original;
					return (
						<div>
							<p className="font-medium text-foreground">{order.customer}</p>
							<p className="text-sm text-muted-foreground">
								{order.email}
							</p>
						</div>
					);
				},
			},
			{
				accessorKey: "date",
				header: "Date",
			},
			{
				accessorKey: "status",
				header: "Status",
				cell: ({ getValue }) => <StatusBadge status={getValue()} />,
			},
			{
				accessorKey: "payment",
				header: "Payment",
				cell: ({ getValue }) => <StatusBadge status={getValue()} />,
			},
			{
				accessorKey: "total",
				header: "Total",
				cell: ({ getValue }) => (
					<span className="font-medium">{getValue()}</span>
				),
			},
			{
				id: "actions",
				header: "Actions",
				cell: ({ row }) => {
					const order = row.original;
					return (
						<div className="flex items-center justify-end space-x-2">
							<Button variant="ghost" size="icon">
								<Eye className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="icon">
								<Truck className="h-4 w-4" />
							</Button>
							<TableMoreActions />
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
				title="Orders"
				description="Manage customer orders and fulfillment"
			/>

			{/* Filters */}
			<SearchFilterBar
				searchValue={searchTerm}
				onSearchChange={(e) => setSearchTerm(e.target.value)}
				searchPlaceholder="Search orders..."
				filters={statusFilters}
				activeFilter={statusFilter}
				onFilterChange={setStatusFilter}
			/>

			{/* Orders Table */}
			<DataTable
				data={filteredOrders}
				columns={columns}
				title="All Orders"
			/>
		</div>
	);
}