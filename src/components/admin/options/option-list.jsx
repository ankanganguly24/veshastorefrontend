import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import OptionForm from "@/components/admin/options/option-form";
import { OptionService } from "@/services/option-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Accept optionValues prop for tabular display
export default function OptionList({ options, onEdit, onDelete, onShowDetail, optionValues = [], onEditValue, onDeleteValue }) {
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [valueDeleteModalOpen, setValueDeleteModalOpen] = useState(false);
  const [optionToDelete, setOptionToDelete] = useState(null);
  const [optionToEdit, setOptionToEdit] = useState(null);
  const [optionValueToDelete, setOptionValueToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isValueDeleting, setIsValueDeleting] = useState(false);

  // Option definition delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => OptionService.delete(id),
    onSuccess: () => {
      toast.success("Option deleted");
      queryClient.invalidateQueries({ queryKey: ["options"] });
      setDeleteModalOpen(false);
      setOptionToDelete(null);
    },
    onError: () => toast.error("Failed to delete option"),
    onSettled: () => setIsDeleting(false),
  });

  // Option definition edit mutation
  const editMutation = useMutation({
    mutationFn: ({ id, data }) => OptionService.update(id, data),
    onSuccess: () => {
      toast.success("Option updated");
      queryClient.invalidateQueries({ queryKey: ["options"] });
      setEditModalOpen(false);
      setOptionToEdit(null);
    },
    onError: () => toast.error("Failed to update option"),
  });

  const handleDeleteClick = (option) => {
    setOptionToDelete(option);
    setDeleteModalOpen(true);
    setEditModalOpen(false);
    setIsDeleting(false);
  };

  const confirmDelete = async () => {
    if (optionToDelete) {
      setIsDeleting(true);
      deleteMutation.mutate(optionToDelete.id);
    }
  };

  const handleEditClick = (option) => {
    setOptionToEdit(option);
    setEditModalOpen(true);
    setDeleteModalOpen(false);
  };

  const handleEditSubmit = (formData) => {
    if (optionToEdit) {
      editMutation.mutate({ id: optionToEdit.id, data: formData });
    }
  };

  const handleValueDeleteClick = (value) => {
    setOptionValueToDelete(value);
    setValueDeleteModalOpen(true);
    setIsValueDeleting(false);
  };

  const confirmValueDelete = async () => {
    if (optionValueToDelete) {
      setIsValueDeleting(true);
      try {
        if (typeof onDeleteValue === "function") {
          await onDeleteValue(optionValueToDelete.id);
        }
        setValueDeleteModalOpen(false);
        setOptionValueToDelete(null);
      } finally {
        setIsValueDeleting(false);
      }
    }
  };

  return (
    <>
      {/* Option Definitions Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded shadow border border-primary/10">
          <thead>
            <tr className="bg-muted/40">
              <th className="px-4 py-2 text-left text-sm font-semibold">Display Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Schema</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {options.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-muted-foreground">No options found.</td>
              </tr>
            ) : (
              options.map((option) => (
                <tr key={option.id} className="border-b">
                  <td className="px-4 py-2">{option.display_name}</td>
                  <td className="px-4 py-2">{option.name}</td>
                  <td className="px-4 py-2">{option.metadata_schema_id}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => onShowDetail(option)}>
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(option)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(option)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Option Values Table */}
      {optionValues && optionValues.length > 0 && (
        <div className="overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Option Values</h3>
          <table className="min-w-full bg-white rounded shadow border border-primary/10">
            <thead>
              <tr className="bg-muted/40">
                <th className="px-4 py-2 text-left text-sm font-semibold">Value</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Code</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Metadata</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {optionValues.map((val) => (
                <tr key={val.id} className="border-b">
                  <td className="px-4 py-2">{val.value}</td>
                  <td className="px-4 py-2">{val.code}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs text-muted-foreground">{JSON.stringify(val.metadata)}</span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEditValue && onEditValue(val)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleValueDeleteClick(val)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Option Definition Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Edit Option</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {optionToEdit && (
            <OptionForm
              initialValues={optionToEdit}
              onSubmit={handleEditSubmit}
              isLoading={editMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Option Definition Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogTitle>Delete Option</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <div className="mb-4">
            Are you sure you want to delete <span className="font-semibold">{optionToDelete?.display_name}</span>?
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Option Value Modal */}
      <Dialog open={valueDeleteModalOpen} onOpenChange={setValueDeleteModalOpen}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogTitle>Delete Option Value</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <div className="mb-4">
            Are you sure you want to delete <span className="font-semibold">{optionValueToDelete?.value}</span>?
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setValueDeleteModalOpen(false)} disabled={isValueDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmValueDelete} disabled={isValueDeleting}>
              {isValueDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
