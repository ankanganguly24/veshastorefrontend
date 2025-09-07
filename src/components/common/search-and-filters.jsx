import { SearchInput } from "./search-input";
import { FilterTabs } from "./filter-tabs";

export function SearchAndFilters({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  activeFilter,
  onFilterChange,
  centered = false,
  children,
}) {
  if (centered) {
    return (
      <div className="space-y-4">
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          centered
        />
        {filters && (
          <div className="flex justify-center">
            <FilterTabs
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={onFilterChange}
            />
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
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
  );
}
