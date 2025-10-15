import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { OptionService } from "@/services/option-service";
import { OptionValueService } from "@/services/option-value-service";
import { UnitService } from "@/services/unit-service";
import { z } from "zod";

// Zod schema for variant validation
const variantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  price: z.preprocess(val => Number(val), z.number().min(0.01, "Price must be greater than 0")),
  compare_at_price: z.preprocess(val => val === "" ? undefined : Number(val), z.number().optional()),
  stock_quantity: z.preprocess(val => Number(val), z.number().int().min(0, "Stock must be 0 or more")),
  barcode: z.string().optional(),
  weight_value: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "Weight must be 0 or more").optional()),
  weight_unit_id: z.string().optional(),
  length_value: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "Length must be 0 or more").optional()),
  length_unit_id: z.string().optional(),
  width_value: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "Width must be 0 or more").optional()),
  width_unit_id: z.string().optional(),
  height_value: z.preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, "Height must be 0 or more").optional()),
  height_unit_id: z.string().optional(),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
  is_returnable: z.boolean().optional(),
  return_in_days: z.preprocess(val => val === "" ? undefined : Number(val), z.number().int().min(0, "Return days must be 0 or more").optional()),
  option_value_ids: z.array(z.string()).min(1, "Select all required options"),
});

const defaultVariantFields = {
  sku: "",
  price: "",
  compare_at_price: "",
  stock_quantity: "",
  barcode: "",
  weight_value: "",
  weight_unit_id: "",
  length_value: "",
  length_unit_id: "",
  width_value: "",
  width_unit_id: "",
  height_value: "",
  height_unit_id: "",
  is_active: true,
  is_default: false,
  is_returnable: false,
  return_in_days: "",
  option_value_ids: [],
};

export default function ProductVariantsEditor({ options: initialOptions, variants, setVariants }) {
  const [variant, setVariant] = useState(defaultVariantFields);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [selectedValueId, setSelectedValueId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(initialOptions || []);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  // Unit state
  const [allUnits, setAllUnits] = useState([]);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});

  // Open modal for option definition
  const handleOpenOptionModal = (option) => {
    setActiveOption(option);
    // Preselect current value for this option
    const currentId = variant.option_value_ids.find(id =>
      option.values.some(val => val.id === id)
    );
    setSelectedValueId(currentId || null);
    setModalOpen(true);
  };

  // Helper to generate SKU from selected option values
  const generateSku = (optionValueIds, options) => {
    if (!options || !optionValueIds) return "";
    const skuParts = options.map(opt => {
      const val = opt.values.find(v => optionValueIds.includes(v.id));
      return val ? (val.code || val.value || val.name || "") : "";
    }).filter(Boolean);
    return skuParts.join("-").toUpperCase();
  };

  // Update SKU when option values change
  const updateSkuFromOptions = (optionValueIds) => {
    const autoSku = generateSku(optionValueIds, options);
    setVariant(prev => ({
      ...prev,
      sku: autoSku,
      option_value_ids: optionValueIds,
    }));
  };

  // Save selected value for option definition
  const handleSaveOptionValue = () => {
    setVariant((prev) => {
      const otherIds = prev.option_value_ids.filter(
        (id) => !activeOption.values.some(val => val.id === id)
      );
      const newOptionValueIds = selectedValueId ? [...otherIds, selectedValueId] : otherIds;
      // Auto-generate SKU
      const autoSku = generateSku(newOptionValueIds, options);
      return {
        ...prev,
        option_value_ids: newOptionValueIds,
        sku: autoSku,
      };
    });
    setModalOpen(false);
    setActiveOption(null);
    setSelectedValueId(null);
  };

  // Clear selection for active option
  const handleClearOptionValue = () => {
    setSelectedValueId(null);
  };

  const handleFieldChange = (field, value) => {
    setVariant((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddVariant = () => {
    // Validate with Zod
    try {
      // Ensure all required options are selected
      const requiredOptionIds = options.map(opt =>
        variant.option_value_ids.find(id => opt.values.some(val => val.id === id))
      );
      if (requiredOptionIds.some(id => !id)) {
        setErrors({ option_value_ids: "Select all required options" });
        return;
      }
      const parsed = variantSchema.parse(variant);
      setVariants([...variants, parsed]);
      setVariant(defaultVariantFields);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Map errors to field names
        const fieldErrors = {};
        err.errors.forEach(e => {
          if (e.path && e.path.length > 0) {
            fieldErrors[e.path[0]] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleRemoveVariant = (idx) => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const handleShowOptions = async () => {
    setShowOptions(true);
    setIsLoadingOptions(true);
    setIsLoadingUnits(true);
    try {
      // Fetch options
      if (options.length === 0) {
        const optionResponse = await OptionService.getAll();
        const valueResponse = await OptionValueService.getAll();
        if (
          optionResponse.success &&
          Array.isArray(optionResponse.data.options) &&
          valueResponse.success &&
          Array.isArray(valueResponse.data.optionValues)
        ) {
          const optionsWithValues = optionResponse.data.options.map((option) => ({
            ...option,
            values: valueResponse.data.optionValues.filter(
              (val) => val.option_definition_id === option.id
            ),
          }));
          setOptions(optionsWithValues);
        }
      }
      // Fetch all units
      const unitRes = await UnitService.getAllUnits();
      if (unitRes.success && Array.isArray(unitRes.data.units)) {
        setAllUnits(unitRes.data.units);
      }
    } catch (err) {
      // Optionally handle error
    } finally {
      setIsLoadingOptions(false);
      setIsLoadingUnits(false);
    }
  };

  return (
    <div>
      <Button variant="outline" className="mb-4" onClick={handleShowOptions}>
        Show Options
      </Button>
      {showOptions && (
        <>
          {(isLoadingOptions || isLoadingUnits) ? (
            <div className="text-muted-foreground mb-4">Loading options & units...</div>
          ) : (
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              {options.map((option) => {
                const selectedId = variant.option_value_ids.find(id =>
                  option.values.some(val => val.id === id)
                );
                const selectedValue = option.values.find(val => val.id === selectedId);
                return (
                  <div key={option.id} className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={() => handleOpenOptionModal(option)}>
                      {option.display_name}
                    </Button>
                    {selectedValue && (
                      <span className="ml-2 text-sm text-gray-800">
                        {selectedValue.value || selectedValue.name}
                      </span>
                    )}
                  </div>
                );
              })}
              {/* SKU */}
              <div>
                <Input
                  placeholder="SKU"
                  value={variant.sku}
                  onChange={e => handleFieldChange("sku", e.target.value)}
                />
                {errors.sku && <div className="text-destructive text-xs mt-1">{errors.sku}</div>}
              </div>
              {/* Price */}
              <div>
                <Input
                  placeholder="Price"
                  type="number"
                  value={variant.price}
                  onChange={e => handleFieldChange("price", e.target.value)}
                />
                {errors.price && <div className="text-destructive text-xs mt-1">{errors.price}</div>}
              </div>
              {/* Compare at Price */}
              <div>
                <Input
                  placeholder="Compare at Price"
                  type="number"
                  value={variant.compare_at_price}
                  onChange={e => handleFieldChange("compare_at_price", e.target.value)}
                />
                {errors.compare_at_price && <div className="text-destructive text-xs mt-1">{errors.compare_at_price}</div>}
              </div>
              {/* Stock Quantity */}
              <div>
                <Input
                  placeholder="Stock Quantity"
                  type="number"
                  value={variant.stock_quantity}
                  onChange={e => handleFieldChange("stock_quantity", e.target.value)}
                />
                {errors.stock_quantity && <div className="text-destructive text-xs mt-1">{errors.stock_quantity}</div>}
              </div>
              {/* Barcode */}
              <div>
                <Input
                  placeholder="Barcode"
                  value={variant.barcode}
                  onChange={e => handleFieldChange("barcode", e.target.value)}
                />
                {errors.barcode && <div className="text-destructive text-xs mt-1">{errors.barcode}</div>}
              </div>
              {/* Weight */}
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Weight"
                    type="number"
                    value={variant.weight_value}
                    onChange={e => handleFieldChange("weight_value", e.target.value)}
                  />
                  {errors.weight_value && <div className="text-destructive text-xs mt-1">{errors.weight_value}</div>}
                </div>
                <select
                  value={variant.weight_unit_id}
                  onChange={e => handleFieldChange("weight_unit_id", e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select Unit</option>
                  {allUnits.filter(u => u.type === "weight").map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name} ({unit.code})
                    </option>
                  ))}
                </select>
                {errors.weight_unit_id && <div className="text-destructive text-xs mt-1">{errors.weight_unit_id}</div>}
              </div>
              {/* Length */}
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Length"
                    type="number"
                    value={variant.length_value}
                    onChange={e => handleFieldChange("length_value", e.target.value)}
                  />
                  {errors.length_value && <div className="text-destructive text-xs mt-1">{errors.length_value}</div>}
                </div>
                <select
                  value={variant.length_unit_id}
                  onChange={e => handleFieldChange("length_unit_id", e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select Unit</option>
                  {allUnits.filter(u => u.type === "length").map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name} ({unit.code})
                    </option>
                  ))}
                </select>
                {errors.length_unit_id && <div className="text-destructive text-xs mt-1">{errors.length_unit_id}</div>}
              </div>
              {/* Width */}
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Width"
                    type="number"
                    value={variant.width_value}
                    onChange={e => handleFieldChange("width_value", e.target.value)}
                  />
                  {errors.width_value && <div className="text-destructive text-xs mt-1">{errors.width_value}</div>}
                </div>
                <select
                  value={variant.width_unit_id}
                  onChange={e => handleFieldChange("width_unit_id", e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select Unit</option>
                  {allUnits.filter(u => u.type === "length").map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name} ({unit.code})
                    </option>
                  ))}
                </select>
                {errors.width_unit_id && <div className="text-destructive text-xs mt-1">{errors.width_unit_id}</div>}
              </div>
              {/* Height */}
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Height"
                    type="number"
                    value={variant.height_value}
                    onChange={e => handleFieldChange("height_value", e.target.value)}
                  />
                  {errors.height_value && <div className="text-destructive text-xs mt-1">{errors.height_value}</div>}
                </div>
                <select
                  value={variant.height_unit_id}
                  onChange={e => handleFieldChange("height_unit_id", e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select Unit</option>
                  {allUnits.filter(u => u.type === "length").map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name} ({unit.code})
                    </option>
                  ))}
                </select>
                {errors.height_unit_id && <div className="text-destructive text-xs mt-1">{errors.height_unit_id}</div>}
              </div>
              {/* Return in Days */}
              <div>
                <Input
                  placeholder="Return in Days"
                  type="number"
                  value={variant.return_in_days}
                  onChange={e => handleFieldChange("return_in_days", e.target.value)}
                />
                {errors.return_in_days && <div className="text-destructive text-xs mt-1">{errors.return_in_days}</div>}
              </div>
              {/* Option errors */}
              {errors.option_value_ids && (
                <div className="text-destructive text-xs mt-1 col-span-2">{errors.option_value_ids}</div>
              )}
              {/* ...other fields/toggles if needed... */}
            </div>
          )}
        </>
      )}
      <Button onClick={handleAddVariant}>Add Variant</Button>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Added Variants</h4>
        {variants.length === 0 ? (
          <div className="text-muted-foreground">No variants added yet.</div>
        ) : (
          <ul className="space-y-2">
            {variants.map((v, idx) => (
              <li key={idx} className="flex items-center gap-2 border p-2 rounded">
                <span className="font-mono text-xs">{v.sku}</span>
                <span>Price: ₹{v.price}</span>
                <span>Stock: {v.stock_quantity}</span>
                <span>Options: {v.option_value_ids.join(", ")}</span>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveVariant(idx)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Option value select modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {activeOption ? `Select ${activeOption.display_name}` : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {activeOption &&
              activeOption.values.map((val) => (
                <label
                  key={val.id}
                  className={`flex items-center cursor-pointer p-2 rounded ${selectedValueId === val.id ? "bg-primary/10" : ""}`}
                  onClick={() => setSelectedValueId(val.id)}
                >
                  <input
                    type="radio"
                    checked={selectedValueId === val.id}
                    onChange={() => setSelectedValueId(val.id)}
                    className="mr-2"
                  />
                  <span>{val.value || val.name}</span>
                </label>
              ))}
            {/* Add clear selection button */}
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={handleClearOptionValue}
              disabled={selectedValueId === null}
            >
              Clear Selection
            </Button>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveOptionValue}
              // Allow saving even if nothing is selected (to clear selection)
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setModalOpen(false);
                setActiveOption(null);
                setSelectedValueId(null);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
