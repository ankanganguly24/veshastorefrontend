import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CategoryMultiSelect({ categories = [], onSelect }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleCategory = (category) => {
    setSelectedIds((prev) => {
      const isSelected = prev.includes(category.id);
      const newSelected = isSelected
        ? prev.filter((id) => id !== category.id) // Remove only the current category
        : [...prev, category.id]; // Add only the current category

      // Call onSelect after updating local state
      setTimeout(() => onSelect(newSelected), 0);
      return newSelected;
    });
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          selectedIds={selectedIds}
          toggleCategory={toggleCategory}
        />
      ))}
    </div>
  );
}

function CategoryItem({ category, selectedIds, toggleCategory }) {
  const isSelected = selectedIds.includes(category.id);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="pl-4 border-l border-muted">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleCategory(category)}
        />
        <span>{category.name}</span>
      </div>
      {hasChildren && (
        <div className="pl-4">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              selectedIds={selectedIds}
              toggleCategory={toggleCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
}