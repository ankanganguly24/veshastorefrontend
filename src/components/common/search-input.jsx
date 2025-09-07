"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className = "",
  centered = false 
}) {
  const containerClass = centered ? "flex justify-center" : "";
  const inputClass = centered ? "w-full max-w-2xl" : "w-full";

  return (
    <div className={containerClass}>
      <div className={`relative ${inputClass} ${className}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10"
        />
      </div>
    </div>
  );
}
