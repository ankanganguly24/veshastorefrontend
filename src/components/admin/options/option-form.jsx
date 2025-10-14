import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { MetaSchemaService } from "@/services/meta-schema-service";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function OptionForm({ initialValues = {}, onSubmit, isLoading }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: initialValues,
  });

  const { data: metaSchemaData, isLoading: metaLoading } = useQuery({
    queryKey: ["meta-schemas"],
    queryFn: async () => {
      const res = await MetaSchemaService.getAll();
      return res.data.schemas || [];
    },
  });

  const [selectedSchemaId, setSelectedSchemaId] = useState(initialValues.metadata_schema_id || "");

  const selectedSchema = metaSchemaData?.find((schema) => schema.id === watch("metadata_schema_id"));

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="space-y-6 bg-white rounded-xl shadow-lg p-6 border border-primary/10 max-w-lg mx-auto"
    >
      <div>
        <label className="block text-sm font-semibold mb-2 text-primary">Name</label>
        <Input
          {...register("name", { required: true })}
          placeholder="Option name"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-primary">Display Name</label>
        <Input
          {...register("display_name", { required: true })}
          placeholder="Display name"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-primary">Metadata Schema</label>
        <Select
          value={watch("metadata_schema_id") || ""}
          onValueChange={(val) => {
            setValue("metadata_schema_id", val);
            setSelectedSchemaId(val);
          }}
          disabled={metaLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a schema" />
          </SelectTrigger>
          <SelectContent>
            {metaSchemaData?.map((schema) => (
              <SelectItem key={schema.id} value={schema.id}>
                {schema.display_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedSchema && (
          <div className="mt-2 text-xs text-muted-foreground">
            <div className="font-semibold">{selectedSchema.display_name}</div>
            <div>{selectedSchema.description}</div>
          </div>
        )}
      </div>
      <Button type="submit" disabled={isLoading} className="w-full mt-2">
        {isLoading ? "Saving..." : "Save Option"}
      </Button>
    </form>
  );
}
