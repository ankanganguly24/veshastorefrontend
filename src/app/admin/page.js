"use client";

import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * StatCard Component
 * Displays a quick access card for admin sections
 */
function QuickAccessCard({ title, description, icon: Icon, href }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = href}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

/**
 * Admin Dashboard Page
 * Main landing page for admin section
 */
export default function AdminDashboard() {
  const quickLinks = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: Package,
      href: "/admin/products"
    },
    {
      title: "Categories",
      description: "Organize product categories",
      icon: ShoppingCart,
      href: "/admin/category"
    },
    {
      title: "Customers",
      description: "View customer information",
      icon: Users,
      href: "/admin/customers"
    },
    {
      title: "Settings",
      description: "Configure your store",
      icon: DollarSign,
      href: "/admin/settings"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to Vesha Admin. Manage your e-commerce store from here.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <QuickAccessCard key={index} {...link} />
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">1. Add Products</h3>
            <p className="text-sm text-muted-foreground">
              Start by adding products to your catalog. Navigate to Products → Add Product.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">2. Organize Categories</h3>
            <p className="text-sm text-muted-foreground">
              Create categories to organize your products and make them easier to find.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">3. Configure Settings</h3>
            <p className="text-sm text-muted-foreground">
              Set up your store preferences, shipping options, and payment methods.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
