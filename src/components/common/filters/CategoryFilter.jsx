import React, { useState } from "react";
import api from "@/utils/axios";

export default function CategoryFilter({
  categories = [], // array of { id, name }
  selected = [],
  onChange = () => {},
}) {
  const [showAll, setShowAll] = useState(false);
  const [expandedParents, setExpandedParents] = useState({}); // { [parentId]: boolean }
  const [childrenMap, setChildrenMap] = useState({}); // { [parentId]: childrenArray }
  const [loadingMap, setLoadingMap] = useState({}); // { [parentId]: boolean }

  const toggleParent = async (parentId) => {
    const isExpanded = !!expandedParents[parentId];
    // collapse if currently expanded
    if (isExpanded) {
      setExpandedParents((s) => ({ ...s, [parentId]: false }));
      return;
    }

    // expand; fetch children if not cached
    setExpandedParents((s) => ({ ...s, [parentId]: true }));

    if (!childrenMap[parentId]) {
      setLoadingMap((s) => ({ ...s, [parentId]: true }));
      try {
        const res = await api.get(
          `/product/category/tree?parent_id=${encodeURIComponent(parentId)}`
        );
        // response: res.data.data.categories_tree -> array with parent tree; children under first item
        const tree = res?.data?.data?.categories_tree || [];
        const node = Array.isArray(tree) && tree.length ? tree[0] : null;
        const children = Array.isArray(node?.children) ? node.children : [];
        setChildrenMap((s) => ({ ...s, [parentId]: children }));
      } catch (err) {
        console.error("Failed to fetch child categories for parent:", parentId, err);
        setChildrenMap((s) => ({ ...s, [parentId]: [] }));
      } finally {
        setLoadingMap((s) => ({ ...s, [parentId]: false }));
      }
    }
  };

  const toggleChild = (childId) => {
    if (selected.includes(childId)) onChange(selected.filter((s) => s !== childId));
    else onChange([...selected, childId]);
  };

  // Ensure categories is always an array
  const categoriesArray = Array.isArray(categories) ? categories : [];
  const visible = showAll ? categoriesArray : categoriesArray.slice(0, 5);

  return (
    <div>
      <h4 className="font-semibold mb-3 text-gray-800">Categories</h4>

      <ul className="space-y-2 mb-4">
        {visible.map((cat) => {
          const isExpanded = !!expandedParents[cat.id];
          return (
            <li key={cat.id}>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleParent(cat.id)}
                  className="text-sm text-left text-gray-700 hover:text-primary block px-2 py-1 rounded transition-colors flex-1"
                >
                  {cat.name}
                </button>
                <button
                  onClick={() => toggleParent(cat.id)}
                  className="text-xs text-primary ml-3 px-2 py-1 rounded hover:underline"
                >
                  {isExpanded ? "Hide" : "Show"}
                </button>
              </div>

              {/* Children (checkboxes) */}
              {isExpanded && (
                <div className="mt-2 pl-4">
                  {loadingMap[cat.id] ? (
                    <div className="text-sm text-gray-500">Loading...</div>
                  ) : childrenMap[cat.id] && childrenMap[cat.id].length > 0 ? (
                    <ul className="space-y-1">
                      {childrenMap[cat.id].map((child) => (
                        <li key={child.id}>
                          <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={selected.includes(child.id)}
                              onChange={() => toggleChild(child.id)}
                              className="rounded border-primary/30 text-primary focus:ring-primary/50"
                            />
                            <span>{child.name}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No subcategories
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {categoriesArray.length > 5 && (
        <button
          onClick={() => setShowAll((s) => !s)}
          className="text-sm text-primary font-medium hover:underline"
        >
          {showAll ? "Show less" : "Show all categories"}
        </button>
      )}
    </div>
  );
}
