"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Edit, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

function getStatusColor(status) {
	switch (status) {
		case "delivered":
			return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
		case "shipped":
			return "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
		case "processing":
			return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
		case "pending":
			return "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800";
		case "cancelled":
			return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
		default:
			return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
	}
}

function getPaymentColor(payment) {
	switch (payment) {
		case "paid":
			return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
		case "pending":
			return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
		case "refunded":
			return "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
		default:
			return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
	}
}

export default function OrdersPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredOrders = orders.filter((order) => {
		const matchesSearch =
			order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || order.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-foreground">Orders</h1>
				<p className="text-muted-foreground">
					Manage customer orders and fulfillment
				</p>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-6">
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search orders..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<div className="flex gap-2 overflow-x-auto">
							{statusFilters.map((filter) => (
								<Button
									key={filter.value}
									variant={
										statusFilter === filter.value
											? "default"
											: "outline"
									}
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

			{/* Orders Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Orders ({filteredOrders.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-border">
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">
										Order
									</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">
										Customer
									</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">
										Date
									</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">
										Status
									</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">
										Payment
									</th>
									<th className="text-left py-3 px-2 font-medium text-muted-foreground">
										Total
									</th>
									<th className="text-right py-3 px-2 font-medium text-muted-foreground">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredOrders.map((order) => (
									<tr
										key={order.id}
										className="border-b border-border hover:bg-accent/50"
									>
										<td className="py-4 px-2">
											<div>
												<p className="font-medium text-foreground">
													{order.id}
												</p>
												<p className="text-sm text-muted-foreground">
													{order.items} items
												</p>
											</div>
										</td>
										<td className="py-4 px-2">
											<div>
												<p className="font-medium text-foreground">
													{order.customer}
												</p>
												<p className="text-sm text-muted-foreground">
													{order.email}
												</p>
											</div>
										</td>
										<td className="py-4 px-2 text-foreground">
											{order.date}
										</td>
										<td className="py-4 px-2">
											<span
												className={cn(
													"px-2 py-1 rounded-full text-xs font-medium border capitalize",
													getStatusColor(order.status)
												)}
											>
												{order.status}
											</span>
										</td>
										<td className="py-4 px-2">
											<span
												className={cn(
													"px-2 py-1 rounded-full text-xs font-medium border capitalize",
													getPaymentColor(order.payment)
												)}
											>
												{order.payment}
											</span>
										</td>
										<td className="py-4 px-2 font-medium text-foreground">
											{order.total}
										</td>
										<td className="py-4 px-2">
											<div className="flex items-center justify-end space-x-2">
												<Button variant="ghost" size="icon">
													<Eye className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="icon">
													<Truck className="h-4 w-4" />
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
