"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryTree({ 
  categories = [], 
  onEditCategory, 
  onDeleteCategory,
  onAddSubcategory,
  className = "" 
}) {
  if (!Array.isArray(categories)) {
    categories = [];
  }
  
  return (
    <div className={`category-tree ${className}`}>
      {categories.length === 0 ? (
        <div className="text-muted-foreground py-4 text-center">No categories available</div>
      ) : (
        categories.map((category) => (
          <CategoryNode 
            key={category.id} 
            category={category} 
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            onAddSubcategory={onAddSubcategory}
          />
        ))
      )}
    </div>
  );
}

function CategoryNode({ 
  category, 
  onEditCategory, 
  onDeleteCategory,
  onAddSubcategory,
  depth = 0 
}) {
  const [expanded, setExpanded] = useState(true);
  
  if (!category) return null;
  
  const hasChildren = category.children && Array.isArray(category.children) && category.children.length > 0;
  
  return (
    <div className="category-node">
      <div 
        className={`
          flex items-center p-2 rounded-md
          ${depth === 0 ? "bg-muted/50" : "hover:bg-muted/30"}
          ${depth > 0 ? `ml-${depth * 4}` : ""}
        `}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 mr-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        {!hasChildren && <div className="w-7"></div>}
        
        <span className="flex-1 font-medium text-sm">
          {category.name}
          <span className="ml-2 text-xs text-muted-foreground">
            ({category.slug})
          </span>
        </span>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onAddSubcategory(category)}
            title="Add subcategory"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onEditCategory(category)}
            title="Edit category"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            onClick={() => onDeleteCategory(category)}
            title="Delete category"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {hasChildren && expanded && (
        <div className="pl-4">
          {category.children.map((child) => (
            <CategoryNode
              key={child.id}
              category={child}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              onAddSubcategory={onAddSubcategory}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
