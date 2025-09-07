"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Truck, Package, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchInput } from "@/components/common/search-input";
import { StatusBadge } from "@/components/common/status-badge";
import { PageHeader } from "@/components/common/page-header";

const shippingMethods = [
	{
		id: 1,
		name: "Standard Shipping",
		description: "5-7 business days",
		cost: "₹99",
		minOrder: "₹0",
		maxWeight: "5 kg",
		zones: ["Local", "National"],
		status: "active",
		estimatedDays: "5-7",
	},
	{
		id: 2,
		name: "Express Shipping",
		description: "2-3 business days",
		cost: "₹199",
		minOrder: "₹999",
		maxWeight: "5 kg",
		zones: ["Local", "National"],
		status: "active",
		estimatedDays: "2-3",
	},
	{
		id: 3,
		name: "Same Day Delivery",
		description: "Same business day",
		cost: "₹299",
		minOrder: "₹1,999",
		maxWeight: "2 kg",
		zones: ["Local"],
		status: "active",
		estimatedDays: "1",
	},
	{
		id: 4,
		name: "Free Shipping",
		description: "Free for orders over ₹1,499",
		cost: "₹0",
		minOrder: "₹1,499",
		maxWeight: "10 kg",
		zones: ["Local", "National"],
		status: "active",
		estimatedDays: "7-10",
	},
	{
		id: 5,
		name: "International Shipping",
		description: "10-14 business days",
		cost: "₹999",
		minOrder: "₹2,999",
		maxWeight: "5 kg",
		zones: ["International"],
		status: "inactive",
		estimatedDays: "10-14",
	},
];

const shippingStats = [
	{
		title: "Active Methods",
		value: "4",
		icon: Truck,
		change: "+1 this month",
	},
	{
		title: "Avg Delivery Time",
		value: "5.2 days",
		icon: Clock,
		change: "-0.3 days improved",
	},
	{
		title: "Shipping Revenue",
		value: "₹2,10,747",
		icon: Package,
		change: "+15% this month",
	},
	{
		title: "Coverage Zones",
		value: "3",
		icon: MapPin,
		change: "Local, National, Intl",
	},
];

export default function ShippingPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddForm, setShowAddForm] = useState(false);

	const filteredMethods = shippingMethods.filter((method) =>
		method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		method.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<PageHeader 
				title="Shipping Methods"
				description="Manage shipping options and rates"
			>
				<Button onClick={() => setShowAddForm(true)}>
					<Plus className="h-4 w-4 mr-2" />
					Add Method
				</Button>
			</PageHeader>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{shippingStats.map((stat, index) => (
					<Card key={index}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
							<stat.icon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<p className="text-xs text-muted-foreground">{stat.change}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Search without card wrapper */}
			<div className="bg-card border border-border rounded-lg p-6">
				<SearchInput
					placeholder="Search shipping methods..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{/* Shipping Methods Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredMethods.map((method) => (
					<Card key={method.id} className="relative">
						<CardHeader>
							<div className="flex items-start justify-between">
								<div>
									<CardTitle className="text-lg">{method.name}</CardTitle>
									<p className="text-muted-foreground text-sm">{method.description}</p>
								</div>
								<StatusBadge status={method.status} />
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<p className="text-muted-foreground">Cost</p>
									<p className="font-medium">{method.cost}</p>
								</div>
								<div>
									<p className="text-muted-foreground">Min Order</p>
									<p className="font-medium">{method.minOrder}</p>
								</div>
								<div>
									<p className="text-muted-foreground">Max Weight</p>
									<p className="font-medium">{method.maxWeight}</p>
								</div>
								<div>
									<p className="text-muted-foreground">Delivery</p>
									<p className="font-medium">{method.estimatedDays} days</p>
								</div>
							</div>
							
							<div>
								<p className="text-muted-foreground text-sm mb-2">Coverage Zones</p>
								<div className="flex flex-wrap gap-1">
									{method.zones.map((zone, index) => (
										<span
											key={index}
											className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
										>
											{zone}
										</span>
									))}
								</div>
							</div>

							<div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
								<Button variant="ghost" size="sm">
									<Edit className="h-4 w-4 mr-1" />
									Edit
								</Button>
								<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
									<Trash2 className="h-4 w-4 mr-1" />
									Delete
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Add Method Form Modal */}
			{showAddForm && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Add Shipping Method</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">Method Name</label>
								<Input placeholder="e.g., Premium Shipping" />
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Description</label>
								<Input placeholder="e.g., 1-2 business days" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">Cost</label>
									<Input placeholder="$0.00" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Min Order</label>
									<Input placeholder="$0.00" />
								</div>
							</div>
							<div className="flex justify-end space-x-2 pt-4">
								<Button variant="outline" onClick={() => setShowAddForm(false)}>
									Cancel
								</Button>
								<Button onClick={() => setShowAddForm(false)}>
									Add Method
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
