"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/search-input";
import { CartService } from "@/lib/cart-service";
import useAuthStore from "@/stores/auth-store";
import { useLogout } from "@/hooks/auth/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  {
    name: "NAWABI EXCLUSIVE",
    subcategories: [
      "Traditional Wear",
      "Ethnic Ensembles",
      "Royal Collection",
      "Heritage Pieces",
      "Luxury Items",
      "Special Occasions",
    ],
  },
  {
    name: "ETHNIC WEAR",
    subcategories: [
      "KURTAS",
      "KAFTAN",
      "FESTIVE WEAR",
      "Traditional Sets",
      "Embroidered Collection",
      "Designer Wear",
    ],
  },
  {
    name: "WESTERN WEAR",
    subcategories: [
      "DRESSES",
      "SHIRTS",
      "CO-ORD SET",
      "Casual Wear",
      "Formal Wear",
      "Party Wear",
    ],
  },
  {
    name: "OUTERWEAR",
    subcategories: [
      "PEPLUM JACKET",
      "SHRUGS",
      "KOTI",
      "Blazers",
      "Cardigans",
      "Winter Wear",
    ],
  },
  {
    name: "BOTTOM WEAR",
    subcategories: [
      "Pants",
      "Trousers",
      "Leggings",
      "Palazzos",
      "Skirts",
      "Shorts",
    ],
  },
  {
    name: "NAWABI INDIA",
    subcategories: [
      "New Arrivals",
      "Best Sellers",
      "Trending Now",
      "Collections",
      "Limited Edition",
      "Seasonal Special",
    ],
  },
];

export default function StoreNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const { isAuthenticated, user, getFullName, getUserInitials } = useAuthStore();
  const logoutMutation = useLogout();

  // Update cart count on component mount
  useEffect(() => {
    const updateCartCount = () => {
      const { itemCount } = CartService.getCartSummary();
      setCartItemCount(itemCount);
    };

    // Initial cart count
    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center cursor-pointer">
              <Image
                src="/veshalogo.png"
                alt="Vesha"
                width={180}
                height={60}
                className="h-14 w-auto object-contain md:h-16 lg:h-18"
                priority
              />
            </Link>
          </div>

          {/* Desktop Categories Navigation */}
          <div className="hidden lg:flex flex-1 justify-center ml-8">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    <NavigationMenuTrigger className="h-10 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-80 gap-3 p-6 bg-white/95 backdrop-blur-md shadow-xl border border-gray-100">
                        <div className="grid grid-cols-2 gap-2">
                          {category.subcategories.map((subcategory) => (
                            <NavigationMenuLink
                              key={subcategory}
                              asChild
                              className="hover:bg-primary/5 hover:text-primary rounded-md p-2 text-sm transition-all duration-200 cursor-pointer"
                            >
                              <Link href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} className="cursor-pointer">
                                {subcategory}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/category/${category.name.toLowerCase()}`}
                              className="text-sm font-medium text-primary hover:underline cursor-pointer"
                            >
                              View All {category.name}
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchInput
                placeholder="Search products..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-64"
              />
            </div>

            {/* Mobile Search Icon */}
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                  {isAuthenticated ? (
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
                      {getUserInitials()}
                    </div>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border-gray-100">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium border-b border-gray-100">
                      <div className="text-gray-600">Welcome,</div>
                      <div className="text-primary">{getFullName()}</div>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                        My Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      className="hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer text-red-600 hover:text-red-700"
                    >
                      {logoutMutation.isPending ? 'Signing out...' : (
                        <div className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>Sign Out</span>
                        </div>
                      )}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                      Have an account? Sign In
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <SearchInput
            placeholder="Search products..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <h3 className="font-semibold text-sm text-primary">
                    {category.name}
                  </h3>
                  <div className="pl-4 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        className="block py-1 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 px-2 rounded transition-all duration-200 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile User Menu */}
          <div className="container mx-auto px-4 py-4 border-t border-gray-100">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-primary">
                My Account
              </h3>
              <div className="pl-4 space-y-1">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block py-1 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 px-2 rounded transition-all duration-200 cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block py-1 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 px-2 rounded transition-all duration-200 cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block py-1 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 px-2 rounded transition-all duration-200 cursor-pointer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      disabled={logoutMutation.isPending}
                      className="block w-full text-left py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 rounded transition-all duration-200 cursor-pointer"
                    >
                      {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block py-1 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 px-2 rounded transition-all duration-200 cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Have an account? Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
