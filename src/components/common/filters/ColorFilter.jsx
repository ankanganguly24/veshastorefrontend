import React from "react";

const COLORS = [
  { id: "red", name: "Red", hex: "#ef4444" },
  { id: "blue", name: "Blue", hex: "#3b82f6" },
  { id: "green", name: "Green", hex: "#10b981" },
  { id: "purple", name: "Purple", hex: "#8b5cf6" },
  { id: "pink", name: "Pink", hex: "#ec4899" },
  { id: "yellow", name: "Yellow", hex: "#f59e0b" },
  { id: "black", name: "Black", hex: "#000000" },
  { id: "white", name: "White", hex: "#ffffff", border: true },
];

export default function ColorFilter({ selected = [], onChange = () => {} }) {
  const toggle = (id) => {
    if (selected.includes(id)) onChange(selected.filter((s) => s !== id));
    else onChange([...selected, id]);
  };

  return (
    <div>
      <h4 className="font-semibold mb-3 text-gray-800">Colors</h4>
      <div className="grid grid-cols-4 gap-2">
        {COLORS.map((c) => {
          const active = selected.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`w-8 h-8 rounded-full transition-transform shadow-md flex items-center justify-center ${
                active ? "ring-2 ring-offset-1 ring-primary scale-105" : ""
              }`}
              title={c.name}
              style={{
                background: c.hex,
                border: c.border ? "1px solid #e5e7eb" : "none",
              }}
              aria-pressed={active}
            />
          );
        })}
      </div>
    </div>
  );
}

// export list for possible reuse
export { COLORS };
