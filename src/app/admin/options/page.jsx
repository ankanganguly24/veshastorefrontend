"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OptionService } from "@/services/option-service";
import OptionList from "@/components/admin/options/option-list";
import OptionForm from "@/components/admin/options/option-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import OptionDetail from "@/components/admin/options/option-detail";

export default function OptionsPage() {
  const queryClient = useQueryClient();
  const [editingOption, setEditingOption] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["options"],
    queryFn: async () => {
      const res = await OptionService.getAll();
      return res.data.options || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: OptionService.create,
    onSuccess: () => {
      toast.success("Option created");
      queryClient.invalidateQueries({ queryKey: ["options"] });
      setModalOpen(false);
    },
    onError: () => toast.error("Failed to create option"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => OptionService.update(id, data),
    onSuccess: () => {
      toast.success("Option updated");
      queryClient.invalidateQueries({ queryKey: ["options"] });
      setEditingOption(null);
      setModalOpen(false);
    },
    onError: () => toast.error("Failed to update option"),
  });

  const deleteMutation = useMutation({
    mutationFn: (option) => OptionService.delete(option.id),
    onSuccess: () => {
      toast.success("Option deleted");
      queryClient.invalidateQueries({ queryKey: ["options"] });
    },
    onError: () => toast.error("Failed to delete option"),
  });

  const handleEdit = (option) => {
    setEditingOption(option);
    setModalOpen(true);
  };

  const handleDelete = (option) => {
    toast(
      `Delete option "${option.display_name}"?`,
      {
        action: {
          label: "Delete",
          onClick: () => deleteMutation.mutate(option),
          loading: deleteMutation.isPending,
          className: "bg-destructive text-white px-4 py-2 rounded",
        },
        cancel: {
          label: "Cancel",
        },
        duration: 6000,
      }
    );
  };

  const handleFormSubmit = (formData) => {
    if (editingOption) {
      updateMutation.mutate({ id: editingOption.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleAdd = () => {
    setEditingOption(null);
    setModalOpen(true);
  };

  const handleShowDetail = (option) => {
    setSelectedOption(option);
    setDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Option Definitions</h1>
        <Button onClick={handleAdd}>
          Add Option
        </Button>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-primary/10 p-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <OptionList
            options={data || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShowDetail={handleShowDetail}
          />
        )}
      </div>
      {/* Create/Edit Option Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>
              {editingOption ? "Edit Option" : "Add Option"}
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <OptionForm
            initialValues={editingOption || {}}
            onSubmit={handleFormSubmit}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
      {/* Option Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Option Details</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedOption && (
            <OptionDetail optionId={selectedOption.id} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}