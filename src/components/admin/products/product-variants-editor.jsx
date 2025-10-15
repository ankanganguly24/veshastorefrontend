import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { OptionService } from "@/services/option-service";
import { OptionValueService } from "@/services/option-value-service";
import { UnitService } from "@/services/unit-service";

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

  // Save selected value for option definition
  const handleSaveOptionValue = () => {
    setVariant((prev) => {
      // Remove previous value for this option group
      const otherIds = prev.option_value_ids.filter(
        (id) => !activeOption.values.some(val => val.id === id)
      );
      return {
        ...prev,
        option_value_ids: selectedValueId ? [...otherIds, selectedValueId] : otherIds,
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
    // Validate required fields (sku, price, stock_quantity, option_value_ids)
    if (
      !variant.sku ||
      !variant.price ||
      !variant.stock_quantity ||
      options.some(opt =>
        !variant.option_value_ids.some(id => opt.values.some(val => val.id === id))
      )
    ) {
      alert("Please fill SKU, price, stock, and select all required options.");
      return;
    }
    setVariants([...variants, variant]);
    setVariant(defaultVariantFields);
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
              <Input
                placeholder="SKU"
                value={variant.sku}
                onChange={e => handleFieldChange("sku", e.target.value)}
              />
              <Input
                placeholder="Price"
                type="number"
                value={variant.price}
                onChange={e => handleFieldChange("price", e.target.value)}
              />
              <Input
                placeholder="Compare at Price"
                type="number"
                value={variant.compare_at_price}
                onChange={e => handleFieldChange("compare_at_price", e.target.value)}
              />
              <Input
                placeholder="Stock Quantity"
                type="number"
                value={variant.stock_quantity}
                onChange={e => handleFieldChange("stock_quantity", e.target.value)}
              />
              <Input
                placeholder="Barcode"
                value={variant.barcode}
                onChange={e => handleFieldChange("barcode", e.target.value)}
              />
              {/* Weight */}
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Weight"
                  type="number"
                  value={variant.weight_value}
                  onChange={e => handleFieldChange("weight_value", e.target.value)}
                />
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
              </div>
              {/* Length */}
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Length"
                  type="number"
                  value={variant.length_value}
                  onChange={e => handleFieldChange("length_value", e.target.value)}
                />
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
              </div>
              {/* Width */}
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Width"
                  type="number"
                  value={variant.width_value}
                  onChange={e => handleFieldChange("width_value", e.target.value)}
                />
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
              </div>
              {/* Height */}
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Height"
                  type="number"
                  value={variant.height_value}
                  onChange={e => handleFieldChange("height_value", e.target.value)}
                />
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
              </div>
              <Input
                placeholder="Return in Days"
                type="number"
                value={variant.return_in_days}
                onChange={e => handleFieldChange("return_in_days", e.target.value)}
              />
              {/* Add toggles for is_active, is_default, is_returnable if needed */}
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
