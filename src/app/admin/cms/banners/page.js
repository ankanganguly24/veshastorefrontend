"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Upload, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import Link from "next/link";

const banners = [
  {
    id: '1',
    title: 'Summer Sale 2024',
    type: 'hero',
    image: '/images/banners/summer-sale.jpg',
    link: '/products?sale=true',
    status: 'active',
    startDate: '2024-05-01',
    endDate: '2024-08-31',
    position: 1
  },
  {
    id: '2',
    title: 'New Collection Launch',
    type: 'promotional',
    image: '/images/banners/new-collection.jpg',
    link: '/products?new=true',
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    position: 2
  },
  {
    id: '3',
    title: 'Free Shipping Offer',
    type: 'notification',
    image: '/images/banners/free-shipping.jpg',
    link: '/shipping-info',
    status: 'inactive',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    position: 3
  }
];

export default function BannersPage() {
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleImageUpload = (e) => {
    // Handle banner image upload
    console.log("Upload banner image");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Banner Management"
        description="Manage homepage banners and promotional content"
      >
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/cms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CMS
            </Link>
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Banner
          </Button>
        </div>
      </PageHeader>

      {/* Banner Types */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="font-medium mb-2">Hero Banners</h3>
            <p className="text-sm text-muted-foreground mb-4">Main homepage banners</p>
            <p className="text-2xl font-bold text-primary">
              {banners.filter(b => b.type === 'hero').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="font-medium mb-2">Promotional</h3>
            <p className="text-sm text-muted-foreground mb-4">Sale and offer banners</p>
            <p className="text-2xl font-bold text-primary">
              {banners.filter(b => b.type === 'promotional').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="font-medium mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground mb-4">Announcement banners</p>
            <p className="text-2xl font-bold text-primary">
              {banners.filter(b => b.type === 'notification').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Banners Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/placeholder-banner.jpg";
                }}
              />
              <div className="absolute top-2 right-2">
                <StatusBadge status={banner.status} />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground">{banner.title}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{banner.type} banner</p>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">Active Period:</p>
                  <p className="text-foreground">{banner.startDate} to {banner.endDate}</p>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">Link:</p>
                  <p className="text-foreground truncate">{banner.link}</p>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Position: {banner.position}</span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Banner Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add New Banner
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Banner Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  placeholder="Enter banner title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Banner Type</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
                  <option value="hero">Hero Banner</option>
                  <option value="promotional">Promotional</option>
                  <option value="notification">Notification</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Banner Image</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <label htmlFor="banner-image" className="cursor-pointer">
                      <span className="text-sm font-medium text-foreground">
                        Click to upload banner image
                      </span>
                      <input
                        id="banner-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Link URL</label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  placeholder="/products"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddForm(false)}>
                  Create Banner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
