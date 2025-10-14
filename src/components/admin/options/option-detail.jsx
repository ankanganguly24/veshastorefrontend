import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OptionService } from "@/services/option-service";
import { OptionValueService } from "@/services/option-value-service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptionValueForm from "@/components/admin/options/option-value-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";

export default function OptionDetail({ optionId }) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["option-detail", optionId],
    queryFn: async () => {
      const res = await OptionService.getById(optionId);
      return res.data.option;
    },
    enabled: !!optionId,
  });

  const optionValues = data?.optionValues || [];

  const createValueMutation = useMutation({
    mutationFn: OptionValueService.create,
    onSuccess: () => {
      toast.success("Option value created");
      queryClient.invalidateQueries({ queryKey: ["option-detail", optionId] });
      setModalOpen(false);
    },
    onError: () => toast.error("Failed to create option value"),
  });

  const editValueMutation = useMutation({
    mutationFn: ({ id, payload }) => OptionValueService.update(id, payload),
    onSuccess: () => {
      toast.success("Option value updated");
      queryClient.invalidateQueries({ queryKey: ["option-detail", optionId] });
      setEditModalOpen(false);
      setSelectedValue(null);
    },
    onError: () => toast.error("Failed to update option value"),
  });

  const deleteValueMutation = useMutation({
    mutationFn: (id) => OptionValueService.delete(id),
    onSuccess: () => {
      toast.success("Option value deleted");
      queryClient.invalidateQueries({ queryKey: ["option-detail", optionId] });
      setDeleteModalOpen(false);
      setSelectedValue(null);
    },
    onError: () => toast.error("Failed to delete option value"),
    onSettled: () => setIsDeleting(false),
  });

  const handleEditClick = (value) => {
    setSelectedValue(value);
    setEditModalOpen(true);
    setModalOpen(false);
    setDeleteModalOpen(false);
  };

  const handleDeleteClick = (value) => {
    setSelectedValue(value);
    setDeleteModalOpen(true);
    setModalOpen(false);
    setEditModalOpen(false);
    setIsDeleting(false);
  };

  const handleAddClick = () => {
    setModalOpen(true);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedValue(null);
  };

  const confirmDelete = async () => {
    if (selectedValue) {
      setIsDeleting(true);
      deleteValueMutation.mutate(selectedValue.id);
    }
  };

  if (!optionId) return null;
  if (isLoading) return <div>Loading option details...</div>;
  if (error) return <div className="text-red-500">Failed to load option details</div>;
  if (!data) return null;

  const { name, display_name, metadataSchema } = data;

  return (
    <Card className="mb-6 p-4 bg-white border border-primary/10 rounded-xl shadow">
      <h2 className="text-lg font-bold text-primary mb-2">{display_name}</h2>
      <div className="mb-2 text-sm text-muted-foreground">Name: {name}</div>
      <div className="mb-2 text-sm text-muted-foreground">
        Schema: {metadataSchema?.display_name}
      </div>
      <div className="mb-2 text-xs text-gray-500">{metadataSchema?.description}</div>
      <div className="mb-2">
        <div className="font-semibold text-sm mb-1">Fields:</div>
        <ul className="list-disc ml-5">
          {metadataSchema?.schema?.fields?.map((field) => (
            <li key={field.name} className="text-xs text-gray-700">
              <span className="font-medium">{field.label}</span> ({field.type})
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4 mb-2">
        <div className="font-semibold text-sm">Option Values:</div>
        <Button size="sm" onClick={handleAddClick}>
          Add Value
        </Button>
      </div>
      {/* Tabular display of option values */}
      <div className="w-full overflow-x-auto max-w-full">
        <table className="min-w-[600px] bg-white rounded shadow border border-primary/10">
          <thead>
            <tr className="bg-muted/40">
              <th className="px-4 py-2 text-left text-sm font-semibold">Value</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Code</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Metadata</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {optionValues.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-muted-foreground">No values defined.</td>
              </tr>
            ) : (
              optionValues.map((val) => (
                <tr key={val.id} className="border-b">
                  <td className="px-4 py-2">{val.value}</td>
                  <td className="px-4 py-2">{val.code}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs text-muted-foreground">{JSON.stringify(val.metadata)}</span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(val)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(val)}>
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
      {/* Add Option Value Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle>Add Option Value</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <OptionValueForm
            optionDefinition={data}
            onSubmit={createValueMutation.mutate}
            isLoading={createValueMutation.isPending}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Option Value Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle>Edit Option Value</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedValue && (
            <OptionValueForm
              optionDefinition={data}
              initialValues={selectedValue}
              onSubmit={(payload) => editValueMutation.mutate({ id: selectedValue.id, payload })}
              isLoading={editValueMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* Delete Option Value Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogTitle>Delete Option Value</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <div className="mb-4">
            Are you sure you want to delete <span className="font-semibold">{selectedValue?.value}</span>?
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
    </Card>
  );
}
