"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import CategoryMultiSelect from "@/components/admin/categories/category-multi-select";

/**
 * ProductCategorySelector Component
 * Handles category selection for products
 * Extracted from add product page for better organization
 */
export function ProductCategorySelector({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
  isLoading,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const findCategory = (cats, catId) => {
    for (const category of cats) {
      if (category.id === catId) return category;
      if (category.children) {
        const found = findCategory(category.children, catId);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="w-full"
          >
            {selectedCategoryIds.length > 0 
              ? `${selectedCategoryIds.length} Selected` 
              : "Select Categories"}
          </Button>

          {selectedCategoryIds.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Selected Categories:</p>
              <ul className="space-y-1">
                {selectedCategoryIds.map((id) => {
                  const category = findCategory(categories, id);
                  return category ? (
                    <li key={id} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {category.name}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Selection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Categories</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="text-muted-foreground py-4 text-center">
                Loading categories...
              </div>
            ) : categories.length === 0 ? (
              <div className="text-muted-foreground py-4 text-center">
                No categories available
              </div>
            ) : (
              <CategoryMultiSelect
                categories={categories}
                selectedIds={selectedCategoryIds}
                onSelect={setSelectedCategoryIds}
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Add missing import
import { useState } from "react";
