"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import useCategoryStore from "@/stores/category-store";
import { toast } from "sonner";

export default function DeleteCategoryDialog({
  category,
  isOpen,
  onClose,
  onSuccess,
}) {
  const { deleteCategory } = useCategoryStore();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!category) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCategory(category.id);
      toast.success("Category deleted successfully");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  const hasChildren = category.children && category.children.length > 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {hasChildren ? (
              <span className="text-destructive font-semibold">
                Warning: This category has subcategories. Deleting it will also
                delete all its subcategories.
              </span>
            ) : (
              `This will permanently delete the category "${category.name}".`
            )}
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
