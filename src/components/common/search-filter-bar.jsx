import { SearchInput } from "./search-input";
import { FilterTabs } from "./filter-tabs";

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  activeFilter,
  onFilterChange,
  className = "",
  children,
}) {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          className="flex-1"
        />
        {filters && (
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
          />
        )}
        {children}
      </div>
    </div>
  );
}
