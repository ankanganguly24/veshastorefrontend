"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import api from "@/utils/axios";

/**
 * NavbarCategories Component
 * Displays category navigation with dropdown menus
 * Uses React Query with proper caching
 */
export function NavbarCategories() {
  // Fetch categories with caching
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/product/category");
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
  });

  // Extract parent categories
  const categories = Array.isArray(categoriesData?.data?.categories)
    ? categoriesData.data.categories.filter((cat) => !cat.parent_id)
    : [];

  if (isLoading) {
    return (
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return <span className="text-muted-foreground px-4">No categories</span>;
  }

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            {category.children && category.children.length > 0 ? (
              <>
                <NavigationMenuTrigger className="h-10 text-gray-700 hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer px-4 rounded-md">
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-80 gap-3 p-4 bg-white shadow-lg border border-gray-200 rounded-md">
                    <div className="grid grid-cols-1 gap-2">
                      {category.children.map((subcategory) => (
                        <NavigationMenuLink
                          key={subcategory.id}
                          asChild
                          className="hover:bg-primary/10 hover:text-primary rounded-md p-2 text-sm transition-all duration-200 cursor-pointer"
                        >
                          <Link
                            href={`/category/${category.id}/${subcategory.id}`}
                            className="cursor-pointer"
                          >
                            {subcategory.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/category/${category.id}`}
                          className="text-sm font-medium text-primary hover:underline cursor-pointer"
                        >
                          View All {category.name}
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={`/category/${category.id}`}
                  className="h-10 flex items-center px-4 text-gray-700 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-200 cursor-pointer font-medium"
                >
                  {category.name}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
