"use client";

import { memo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Shield, Truck, RefreshCw, Shirt, Sun, Wind, Droplets } from "lucide-react";

const ProductTabs = memo(({ description, washCare, features = [], productId, productName }) => {
  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="w-full">
        <div className="border-b border-gray-100 mb-8">
          <TabsList className="flex w-full justify-start gap-8 bg-transparent p-0 h-auto">
            {['Description', 'Features', 'Care'].map((tab) => {
              const value = tab.split(' ')[0].toLowerCase();
              return (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="bg-transparent border-b-2 border-transparent px-0 py-4 rounded-none text-gray-500 hover:text-gray-900 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none transition-all text-sm font-medium uppercase tracking-wide"
                >
                  {tab}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <TabsContent value="description" className="animate-in fade-in-50 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">About this item</h3>
                <p className="text-gray-600 leading-relaxed font-light text-lg">
                  {description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Premium Quality", desc: "Crafted with finest materials" },
                  { icon: Truck, title: "Fast Delivery", desc: "Ships within 24 hours" },
                  { icon: RefreshCw, title: "Easy Returns", desc: "7-day return policy" },
                  { icon: Check, title: "Authentic", desc: "100% original product" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-sm bg-gray-50/50 border border-gray-100">
                    <item.icon className="w-5 h-5 text-gray-900 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-sm">
                <h4 className="font-medium text-gray-900 mb-4">Material & Care</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Material</span>
                    <span className="font-medium text-gray-900">100% Cotton</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weave</span>
                    <span className="font-medium text-gray-900">Woven</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fit</span>
                    <span className="font-medium text-gray-900">Regular</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="animate-in fade-in-50 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {(features.length > 0 ? features : [
              "Premium Cotton Fabric", "Intricate Embroidery", "Perfect Fit", "Color-Fast", "Easy Care", "Versatile Styling"
            ]).map((feature, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-gray-700 font-light">{typeof feature === 'string' ? feature : feature.title}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="care" className="animate-in fade-in-50 duration-500">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Wash Care Instructions</h3>
              <p className="text-gray-600 leading-relaxed">{washCare}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { icon: Shirt, text: "Machine Wash Cold" },
                  { icon: Sun, text: "Avoid Direct Sunlight" },
                  { icon: Droplets, text: "Do Not Bleach" },
                  { icon: Wind, text: "Tumble Dry Low" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <item.icon className="w-4 h-4" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

ProductTabs.displayName = "ProductTabs";

export default ProductTabs;
