"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarCategories } from "@/components/storefront/navbar/navbar-categories";
import { NavbarSearch } from "@/components/storefront/navbar/navbar-search";
import { NavbarUserMenu } from "@/components/storefront/navbar/navbar-user-menu";
import { NavbarCartIcon } from "@/components/storefront/navbar/navbar-cart-icon";
import { NavbarWishlistIcon } from "@/components/storefront/navbar/navbar-wishlist-icon";
import { MobileNavbarCategories } from "@/components/storefront/navbar/mobile-navbar-categories";

/**
 * StoreNavbar Component
 * Main navigation bar for storefront
 * Broken down into smaller components for maintainability
 */
export default function StoreNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                className="h-14 w-auto object-contain md:h-28 lg:h-28"
                priority
              />
            </Link>
          </div>

          {/* Desktop Categories Navigation */}
          <div className="hidden lg:flex flex-1 justify-center ml-8">
            <NavbarCategories />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <NavbarSearch className="w-64" />
            </div>

            {/* User Menu */}
            <NavbarUserMenu />

            {/* Wishlist */}
            <NavbarWishlistIcon />

            {/* Shopping Cart */}
            <NavbarCartIcon />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <NavbarSearch />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium text-gray-900 hover:text-primary" onClick={toggleMenu}>
              Home
            </Link>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</p>
              <div className="flex flex-col space-y-3 pl-2">
                {/* We use a separate component for mobile categories to handle data fetching */}
                <MobileNavbarCategories onSelect={toggleMenu} />
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <Link href="/cart" className="flex items-center text-sm font-medium text-gray-900 hover:text-primary" onClick={toggleMenu}>
                Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}