"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw, ListTree, List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCategoryStore from "@/stores/category-store";
import CategoryForm from "@/components/admin/categories/category-form";
import CategoryTree from "@/components/admin/categories/category-tree";
import DeleteCategoryDialog from "@/components/admin/categories/delete-category-dialog";
import { DataTable } from "@/components/ui/data-table";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const Category = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("tree");
  const { toast } = useToast();

  const { 
    categories, 
    categoriesTree, 
    fetchCategories, 
    fetchCategoriesTree, 
    isLoading, 
    error 
  } = useCategoryStore();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      await Promise.all([
        fetchCategories(),
        fetchCategoriesTree()
      ]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error loading categories",
        description: error.message || "Failed to load categories"
      });
    }
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const handleAddSubcategory = (parentCategory) => {
    setSelectedCategory({
      name: "",
      slug: "",
      description: "",
      parent_id: parentCategory.id
    });
    setFormOpen(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setSelectedCategory(null);
    loadCategories();
  };

  const handleDeleteSuccess = () => {
    setCategoryToDelete(null);
    loadCategories();
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "slug",
      header: "Slug"
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="truncate max-w-[300px]">
          {row.getValue("description") || "-"}
        </div>
      )
    },
    {
      accessorKey: "parent_id",
      header: "Parent",
      cell: ({ row }) => {
        const parentId = row.getValue("parent_id");
        if (!parentId) return "None";
        const parent = categories.find(cat => cat.id === parentId);
        return parent ? parent.name : parentId;
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditCategory(category)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAddSubcategory(category)}
            >
              Add Sub
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              onClick={() => handleDeleteCategory(category)}
            >
              Delete
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadCategories}
            disabled={isLoading}
          >
            <RefreshCcw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={handleAddCategory}>
            <Plus className="h-4 w-4 mr-1" />
            Add Category
          </Button>
        </div>
      </div>

      <Separator />
      
      <Tabs defaultValue="tree" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="tree">
            <ListTree className="h-4 w-4 mr-1" />
            Tree View
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="h-4 w-4 mr-1" />
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tree" className="mt-0">
          <Card>
            <CardHeader className="py-4">
              <CardTitle>Category Tree</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <RefreshCcw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="text-destructive py-4 text-center">
                  Error: {error}
                </div>
              ) : !categoriesTree || categoriesTree.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No categories found. Create your first category by clicking "Add Category" button.
                </div>
              ) : (
                <ScrollArea className="h-[500px] pr-4">
                  <CategoryTree 
                    categories={categoriesTree}
                    onEditCategory={handleEditCategory}
                    onDeleteCategory={handleDeleteCategory}
                    onAddSubcategory={handleAddSubcategory}
                  />
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader className="py-4">
              <CardTitle>Categories List</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <RefreshCcw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="text-destructive py-4 text-center">
                  Error: {error}
                </div>
              ) : !categories || categories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No categories found.
                </div>
              ) : (
                <DataTable columns={columns} data={categories} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Category Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory && selectedCategory.id
                ? "Edit Category"
                : selectedCategory && selectedCategory.parent_id
                ? "Add Subcategory"
                : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm 
            category={selectedCategory} 
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteCategoryDialog
        category={categoryToDelete}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default Category;