"use client";

import { useState } from "react";
import { SearchInput } from "@/components/common/search-input";

/**
 * NavbarSearch Component
 * Search input for navbar
 */
export function NavbarSearch({ className }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchInput
      placeholder="Search products..."
      value={searchValue}
      onChange={handleSearchChange}
      className={className}
    />
  );
}
