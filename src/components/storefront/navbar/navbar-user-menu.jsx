"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/stores/auth-store";
import { useLogout } from "@/hooks/auth/use-auth";

/**
 * NavbarUserMenu Component
 * Displays user profile dropdown menu
 */
export function NavbarUserMenu() {
  const { isAuthenticated, getFullName, getUserInitials } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
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
  );
}
