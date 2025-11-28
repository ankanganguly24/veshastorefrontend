"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import api from "@/utils/axios";
import { ChevronRight } from "lucide-react";

export function MobileNavbarCategories({ onSelect }) {
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/product/category");
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const categories = Array.isArray(categoriesData?.data?.categories)
    ? categoriesData.data.categories.filter((cat) => !cat.parent_id)
    : [];

  if (isLoading) {
    return <div className="text-sm text-gray-400">Loading categories...</div>;
  }

  if (categories.length === 0) {
    return <div className="text-sm text-gray-400">No categories found</div>;
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="space-y-2">
          <Link
            href={`/category/${category.id}`}
            onClick={onSelect}
            className="flex items-center justify-between text-sm text-gray-700 hover:text-primary"
          >
            {category.name}
            {category.children?.length > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          </Link>
          
          {/* Subcategories */}
          {category.children && category.children.length > 0 && (
            <div className="pl-4 border-l border-gray-100 space-y-2 mt-1">
              {category.children.map((child) => (
                <Link
                  key={child.id}
                  href={`/category/${category.id}/${child.id}`}
                  onClick={onSelect}
                  className="block text-sm text-gray-500 hover:text-primary"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
