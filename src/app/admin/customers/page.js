"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

function getStatusColor(status) {
	switch (status) {
		case "active":
			return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
		case "vip":
			return "text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800";
		case "new":
			return "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
		case "inactive":
			return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
		default:
			return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
	}
}

export default function CustomersPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredCustomers = customers.filter((customer) => {
		const matchesSearch =
			customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-foreground">Customers</h1>
				<p className="text-muted-foreground">Manage your customer relationships</p>
			</div>

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
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search customers..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<div className="flex gap-2 overflow-x-auto">
							{statusFilters.map((filter) => (
								<Button
									key={filter.value}
									variant={statusFilter === filter.value ? "default" : "outline"}
									size="sm"
									onClick={() => setStatusFilter(filter.value)}
									className="whitespace-nowrap"
								>
									{filter.label}
								</Button>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Customers Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-border">
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">Contact</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">Location</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">Orders</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">Total Spent</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
									<th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredCustomers.map((customer) => (
									<tr key={customer.id} className="border-b border-border hover:bg-accent/50">
										<td className="py-4 px-2">
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
										</td>
										<td className="py-4 px-2">
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
										</td>
										<td className="py-4 px-2">
											<div className="flex items-center space-x-2">
												<MapPin className="h-3 w-3 text-muted-foreground" />
												<span className="text-foreground">{customer.location}</span>
											</div>
										</td>
										<td className="py-4 px-2">
											<div>
												<p className="font-medium text-foreground">{customer.totalOrders}</p>
												<p className="text-sm text-muted-foreground">Last: {customer.lastOrder}</p>
											</div>
										</td>
										<td className="py-4 px-2 font-medium text-foreground">{customer.totalSpent}</td>
										<td className="py-4 px-2">
											<span
												className={cn(
													"px-2 py-1 rounded-full text-xs font-medium border capitalize",
													getStatusColor(customer.status)
												)}
											>
												{customer.status}
											</span>
										</td>
										<td className="py-4 px-2">
											<div className="flex items-center justify-end space-x-2">
												<Button variant="ghost" size="icon">
													<Eye className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="icon">
													<Mail className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="icon">
													<MoreHorizontal className="h-4 w-4" />
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
