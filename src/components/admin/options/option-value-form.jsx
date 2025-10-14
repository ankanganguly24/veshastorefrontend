import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OptionValueForm({ optionDefinition, onSubmit, isLoading }) {
  const fields = optionDefinition?.metadataSchema?.schema?.fields || [];
  const { register, handleSubmit, reset } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // Build metadata object dynamically
        const metadata = {};
        fields.forEach((field) => {
          metadata[field.name] = data[field.name];
        });
        onSubmit({
          option_definition_id: optionDefinition.id,
          value: data.value,
          code: data.code,
          metadata,
        });
        reset();
      })}
      className="space-y-6 bg-white rounded-xl shadow-lg p-6 border border-primary/10 max-w-lg mx-auto"
    >
      <div>
        <label className="block text-sm font-semibold mb-2 text-primary">Value</label>
        <Input {...register("value", { required: true })} placeholder="Value (e.g. Red, XL)" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-primary">Code</label>
        <Input {...register("code", { required: true })} placeholder="Code (e.g. red-01, xl)" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-primary">Metadata</label>
        <div className="space-y-2">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-medium mb-1">{field.label}{field.required ? " *" : ""}</label>
              <Input
                {...register(field.name, { required: field.required })}
                type={field.type === "number" ? "number" : "text"}
                placeholder={field.label}
              />
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full mt-2">
        {isLoading ? "Saving..." : "Save Option Value"}
      </Button>
    </form>
  );
}
