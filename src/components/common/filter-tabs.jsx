import { Button } from "@/components/ui/button";

export function FilterTabs({ filters, activeFilter, onFilterChange, className = "" }) {
  return (
    <div className={`flex gap-2 overflow-x-auto ${className}`}>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className="whitespace-nowrap"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
