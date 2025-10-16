import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { UnitService } from "@/services/unit-service";
import { z } from "zod";

// Zod schema for a single variant's validation (no changes needed here)
const variantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  price: z.preprocess(val => Number(val), z.number().min(0.01, "Price must be greater than 0")),
  compare_at_price: z.preprocess(val => val === "" || val === null ? undefined : Number(val), z.number().optional()),
  stock_quantity: z.preprocess(val => Number(val), z.number().int().min(0, "Stock must be 0 or more")),
  barcode: z.string().optional(),
  weight_value: z.preprocess(val => val === "" || val === null ? undefined : Number(val), z.number().min(0, "Weight must be 0 or more").optional()),
  weight_unit_id: z.string().optional(),
  length_value: z.preprocess(val => val === "" || val === null ? undefined : Number(val), z.number().min(0, "Length must be 0 or more").optional()),
  length_unit_id: z.string().optional(),
  width_value: z.preprocess(val => val === "" || val === null ? undefined : Number(val), z.number().min(0, "Width must be 0 or more").optional()),
  width_unit_id: z.string().optional(),
  height_value: z.preprocess(val => val === "" || val === null ? undefined : Number(val), z.number().min(0, "Height must be 0 or more").optional()),
  height_unit_id: z.string().optional(),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
  is_returnable: z.boolean().optional(),
  return_in_days: z.preprocess(val => val === "" || val === null ? undefined : Number(val), z.number().int().min(0, "Return days must be 0 or more").optional()),
  option_value_ids: z.array(z.string()),
});

const defaultVariantFields = {
  sku: "",
  price: "",
  compare_at_price: "",
  stock_quantity: "0",
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

export default function ProductVariantsEditor({ options, variants, setVariants }) {
  const [variant, setVariant] = useState(defaultVariantFields);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [selectedValueId, setSelectedValueId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [allUnits, setAllUnits] = useState([]);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUnits = async () => {
      if (showOptions && allUnits.length === 0) {
        setIsLoadingUnits(true);
        try {
          const unitRes = await UnitService.getAllUnits();
          if (unitRes.success && Array.isArray(unitRes.data.units)) {
            setAllUnits(unitRes.data.units);
          }
        } catch (err) {
          console.error("Failed to fetch units:", err);
        } finally {
          setIsLoadingUnits(false);
        }
      }
    };
    fetchUnits();
  }, [showOptions]);

  const handleOpenOptionModal = (option) => {
    setActiveOption(option);
    const currentId = variant.option_value_ids.find(id =>
      option.values.some(val => val.id === id)
    );
    setSelectedValueId(currentId || null);
    setModalOpen(true);
  };

  const generateSku = (optionValueIds) => {
    if (!options || !optionValueIds) return "";
    const skuParts = options.map(opt => {
      const val = opt.values.find(v => optionValueIds.includes(v.id));
      return val ? (val.code || val.value || val.name || "").substring(0, 3) : "";
    }).filter(Boolean);
    return skuParts.join("-").toUpperCase();
  };

  const handleSaveOptionValue = () => {
    setVariant((prev) => {
      const otherIds = prev.option_value_ids.filter(
        (id) => !activeOption.values.some(val => val.id === id)
      );
      const newOptionValueIds = selectedValueId ? [...otherIds, selectedValueId] : otherIds;
      const autoSku = generateSku(newOptionValueIds);
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

  const handleClearOptionValue = () => setSelectedValueId(null);

  const handleFieldChange = (field, value) => {
    setVariant((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddVariant = () => {
    if (variant.option_value_ids.length !== options.length) {
      setErrors({ option_value_ids: "Please select a value for all options." });
      return;
    }
    try {
      const parsedVariant = variantSchema.parse(variant);
      setVariants([...variants, parsedVariant]);
      setVariant(defaultVariantFields);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
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

  // Helper to render a dimension/weight input group
  const renderUnitInput = (name, valueField, unitField, unitType) => (
    <div className="flex gap-2 items-start">
      <div className="flex-1">
        <Input
          placeholder={name}
          type="number"
          value={variant[valueField]}
          onChange={e => handleFieldChange(valueField, e.target.value)}
        />
        {errors[valueField] && <div className="text-destructive text-xs mt-1">{errors[valueField]}</div>}
      </div>
      <select
        value={variant[unitField]}
        onChange={e => handleFieldChange(unitField, e.target.value)}
        className="border rounded px-2 h-10 bg-transparent"
      >
        <option value="">Unit</option>
        {allUnits.filter(u => u.type === unitType).map(unit => (
          <option key={unit.id} value={unit.id}>
            {unit.code}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      {!showOptions && (
        <Button type="button" variant="outline" className="mb-4" onClick={() => setShowOptions(true)}>
          Add Variants with Options
        </Button>
      )}

      {showOptions && (
        <>
          {isLoadingUnits ? (
            <div className="text-muted-foreground mb-4">Loading units...</div>
          ) : (
            <div className="mb-4 p-4 border rounded-lg space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {options.map((option) => {
                  const selectedValue = option.values.find(val => variant.option_value_ids.includes(val.id));
                  return (
                    <div key={option.id}>
                      <Button type="button" variant="outline" className="w-full justify-between" onClick={() => handleOpenOptionModal(option)}>
                        <span>{option.display_name}</span>
                        <span className="text-primary">{selectedValue?.value || "Select"}</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
              {errors.option_value_ids && <div className="text-destructive text-xs mt-1 col-span-2">{errors.option_value_ids}</div>}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Input placeholder="SKU (auto-generated)" value={variant.sku} onChange={e => handleFieldChange("sku", e.target.value)} />
                  {errors.sku && <div className="text-destructive text-xs mt-1">{errors.sku}</div>}
                </div>
                <div>
                  <Input placeholder="Price" type="number" value={variant.price} onChange={e => handleFieldChange("price", e.target.value)} />
                  {errors.price && <div className="text-destructive text-xs mt-1">{errors.price}</div>}
                </div>
                <div>
                  <Input placeholder="Compare at Price" type="number" value={variant.compare_at_price} onChange={e => handleFieldChange("compare_at_price", e.target.value)} />
                  {errors.compare_at_price && <div className="text-destructive text-xs mt-1">{errors.compare_at_price}</div>}
                </div>
                <div>
                  <Input placeholder="Stock Quantity" type="number" value={variant.stock_quantity} onChange={e => handleFieldChange("stock_quantity", e.target.value)} />
                  {errors.stock_quantity && <div className="text-destructive text-xs mt-1">{errors.stock_quantity}</div>}
                </div>
                <div>
                  <Input placeholder="Barcode (ISBN, UPC, etc.)" value={variant.barcode} onChange={e => handleFieldChange("barcode", e.target.value)} />
                  {errors.barcode && <div className="text-destructive text-xs mt-1">{errors.barcode}</div>}
                </div>
                
                {/* --- FIX: ADDED UNIT INPUTS --- */}
                {renderUnitInput("Weight", "weight_value", "weight_unit_id", "weight")}
                {renderUnitInput("Length", "length_value", "length_unit_id", "length")}
                {renderUnitInput("Width", "width_value", "width_unit_id", "length")}
                {renderUnitInput("Height", "height_value", "height_unit_id", "length")}
              </div>
              
              <Button type="button" onClick={handleAddVariant}>Add Variant</Button>
            </div>
          )}
        </>
      )}

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Added Variants</h4>
        {variants.length === 0 ? (
          <div className="text-muted-foreground p-4 border-dashed border-2 rounded-lg text-center">No variants added yet.</div>
        ) : (
          <ul className="space-y-2">
            {variants.map((v, idx) => (
              <li key={idx} className="flex items-center justify-between gap-2 border p-2 rounded-lg">
                <div>
                  <span className="font-mono text-sm font-bold">{v.sku}</span>
                  <div className="text-xs text-muted-foreground">
                    <span>Price: ₹{v.price}</span> | <span>Stock: {v.stock_quantity}</span>
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveVariant(idx)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{activeOption ? `Select ${activeOption.display_name}` : ""}</DialogTitle></DialogHeader>
          <div className="space-y-2">
            {activeOption?.values.map((val) => (
              <label key={val.id} className={`flex items-center cursor-pointer p-2 rounded ${selectedValueId === val.id ? "bg-primary/10" : ""}`} onClick={() => setSelectedValueId(val.id)}>
                <input type="radio" name={`option-${activeOption.id}`} checked={selectedValueId === val.id} onChange={() => {}} className="mr-2" />
                <span>{val.value || val.name}</span>
              </label>
            ))}
            <Button variant="secondary" size="sm" className="mt-2" onClick={handleClearOptionValue} disabled={selectedValueId === null}>
              Clear Selection
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveOptionValue}>Save</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
