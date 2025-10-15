import React, { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const MultiSelect = ({ options, selected = [], onChange, label }) => {
  useEffect(() => {
    console.log("Options passed to MultiSelect:", options);
    console.log("Selected values in MultiSelect:", selected);
  }, [options, selected]);

  // selected is now always an array of IDs
  const handleToggle = (value, event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Checkbox clicked for value:", value);
    onChange((prevSelected) => {
      const safePrevSelected = Array.isArray(prevSelected) ? prevSelected : [];
      const isSelected = safePrevSelected.includes(value.id);
      if (isSelected) {
        console.log("Removing value:", value);
        return safePrevSelected.filter((id) => id !== value.id);
      } else {
        console.log("Adding value:", value);
        return [...safePrevSelected, value.id];
      }
    });
  };

  return (
    <div className="multi-select">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
        {options.length === 0 ? (
          <div className="text-sm text-gray-500">No options available.</div>
        ) : (
          options.map((option) => (
            <div
              key={option.id}
              className="flex items-center mb-2 cursor-pointer"
              onClick={(event) => handleToggle(option, event)}
            >
              <Checkbox
                checked={
                  Array.isArray(selected) &&
                  selected.includes(option.id)
                }
                onChange={(event) => handleToggle(option, event)}
              />
              <span className="ml-2 text-sm text-gray-800">
                {option.value || option.name}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MultiSelect;