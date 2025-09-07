"use client";

import { useState, useMemo } from "react";
import { Eye, Mail, MoreHorizontal, Calendar, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchAndFilters } from "@/components/common/search-and-filters";
import { StatusBadge } from "@/components/common/status-badge";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { TableActions } from "@/components/common/table-actions";

const customers = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		phone: "+91 98765 43210",
		location: "Mumbai, MH",
		joinDate: "2024-01-15",
		totalOrders: 12,
		totalSpent: "₹2,10,710",
		status: "active",
		lastOrder: "2024-01-20",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		phone: "+91 87654 32109",
		location: "Delhi, DL",
		joinDate: "2024-01-10",
		totalOrders: 8,
		totalSpent: "₹1,07,800",
		status: "active",
		lastOrder: "2024-01-18",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		phone: "+91 76543 21098",
		location: "Bangalore, KA",
		joinDate: "2023-12-20",
		totalOrders: 24,
		totalSpent: "₹3,87,330",
		status: "vip",
		lastOrder: "2024-01-19",
	},
	{
		id: 4,
		name: "Alice Brown",
		email: "alice@example.com",
		phone: "+91 65432 10987",
		location: "Chennai, TN",
		joinDate: "2024-01-05",
		totalOrders: 3,
		totalSpent: "₹25,617",
		status: "new",
		lastOrder: "2024-01-16",
	},
	{
		id: 5,
		name: "Charlie Wilson",
		email: "charlie@example.com",
		phone: "+91 54321 09876",
		location: "Pune, MH",
		joinDate: "2023-11-15",
		totalOrders: 0,
		totalSpent: "₹0",
		status: "inactive",
		lastOrder: "Never",
	},
];

const statusFilters = [
	{ label: "All", value: "all" },
	{ label: "Active", value: "active" },
	{ label: "VIP", value: "vip" },
	{ label: "New", value: "new" },
	{ label: "Inactive", value: "inactive" },
];

export default function CustomersPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredCustomers = useMemo(() => {
		return customers.filter((customer) => {
			const matchesSearch =
				customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				customer.email.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [searchTerm, statusFilter]);

	const columns = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Customer",
				cell: ({ row }) => {
					const customer = row.original;
					return (
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
								<span className="text-primary-foreground font-medium text-sm">
									{customer.name.split(" ").map((n) => n[0]).join("")}
								</span>
							</div>
							<div>
								<p className="font-medium text-foreground">{customer.name}</p>
								<p className="text-sm text-muted-foreground">Joined {customer.joinDate}</p>
							</div>
						</div>
					);
				},
			},
			{
				id: "contact",
				header: "Contact",
				cell: ({ row }) => {
					const customer = row.original;
					return (
						<div>
							<div className="flex items-center space-x-2 mb-1">
								<Mail className="h-3 w-3 text-muted-foreground" />
								<span className="text-sm text-foreground">{customer.email}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="h-3 w-3 text-muted-foreground" />
								<span className="text-sm text-foreground">{customer.phone}</span>
							</div>
						</div>
					);
				},
			},
			{
				accessorKey: "location",
				header: "Location",
				cell: ({ getValue }) => (
					<div className="flex items-center space-x-2">
						<MapPin className="h-3 w-3 text-muted-foreground" />
						<span className="text-foreground">{getValue()}</span>
					</div>
				),
			},
			{
				id: "orders",
				header: "Orders",
				cell: ({ row }) => {
					const customer = row.original;
					return (
						<div>
							<p className="font-medium text-foreground">{customer.totalOrders}</p>
							<p className="text-sm text-muted-foreground">Last: {customer.lastOrder}</p>
						</div>
					);
				},
			},
			{
				accessorKey: "totalSpent",
				header: "Total Spent",
				cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
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
					const customer = row.original;
					return (
						<TableActions
							onView={() => console.log("View", customer.id)}
							onEdit={() => console.log("Email", customer.id)}
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
				title="Customers"
				description="Manage your customer relationships"
			/>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Customers</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,234</div>
						<p className="text-xs text-muted-foreground">+12% from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Customers</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">987</div>
						<p className="text-xs text-muted-foreground">+8% from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">New This Month</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">156</div>
						<p className="text-xs text-muted-foreground">+23% from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">45</div>
						<p className="text-xs text-muted-foreground">+5% from last month</p>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-6">
					<SearchAndFilters
						searchValue={searchTerm}
						onSearchChange={(e) => setSearchTerm(e.target.value)}
						searchPlaceholder="Search customers..."
						filters={statusFilters}
						activeFilter={statusFilter}
						onFilterChange={setStatusFilter}
					/>
				</CardContent>
			</Card>

			<DataTable
				data={filteredCustomers}
				columns={columns}
				title="All Customers"
			/>
		</div>
	);
}
