import React from "react";

const PRICE_RANGES = [
  { id: "under_1000", label: "Under ₹1,000", min: 0, max: 999 },
  { id: "1000_2500", label: "₹1,000 - ₹2,500", min: 1000, max: 2500 },
  { id: "2500_5000", label: "₹2,500 - ₹5,000", min: 2500, max: 5000 },
  { id: "above_5000", label: "Above ₹5,000", min: 5001, max: Number.MAX_SAFE_INTEGER },
];

export default function PriceFilter({ selected = [], onChange = () => {} }) {
  const toggle = (id) => {
    if (selected.includes(id)) onChange(selected.filter((s) => s !== id));
    else onChange([...selected, id]);
  };

  return (
    <div>
      <h4 className="font-semibold mb-3 text-gray-800">Price Range</h4>
      <div className="space-y-2">
        {PRICE_RANGES.map((r) => (
          <label key={r.id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(r.id)}
              onChange={() => toggle(r.id)}
              className="rounded border-primary/30 text-primary focus:ring-primary/50"
            />
            <span className="text-sm text-gray-600">{r.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// export ranges so parent can read min/max by id if needed
export { PRICE_RANGES };
