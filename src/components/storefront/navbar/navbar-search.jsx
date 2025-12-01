"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function NavbarSearch({ className }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Fetch all products for client-side search (cached)
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products-search"],
    queryFn: async () => {
      const response = await api.get("/product");
      return response.data.data.products;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const products = productsData || [];

  // Filter products based on query
  const filteredProducts = query.length > 1
    ? products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5) // Limit to 5 results
    : [];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 1);
  };

  const handleSelectProduct = (productId) => {
    router.push(`/product/${productId}`);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSearch}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="pl-9 pr-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              <span className="text-xs">Loading...</span>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
                Products
              </div>
              {filteredProducts.map((product) => {
                const primaryMedia = product.media.find(m => m.is_primary) || product.media[0];
                const imageUrl = primaryMedia?.media?.url;
                const price = product.variants[0]?.price;

                return (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                  >
                    <div className="relative h-10 w-10 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        ₹{price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
                <button 
                  onClick={() => {
                    router.push(`/products?search=${encodeURIComponent(query)}`);
                    setIsOpen(false);
                  }}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  View all results
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">No products found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
