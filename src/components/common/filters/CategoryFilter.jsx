"use client";

import React, { useState } from "react";
import api from "@/utils/axios";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

export default function CategoryFilter({
  categories = [], // array of { id, name }
  selected = [],
  onChange = () => {},
}) {
  const [expandedParents, setExpandedParents] = useState({}); // { [parentId]: boolean }
  const [childrenMap, setChildrenMap] = useState({}); // { [parentId]: childrenArray }
  const [loadingMap, setLoadingMap] = useState({}); // { [parentId]: boolean }

  const toggleParent = async (parentId) => {
    const isExpanded = !!expandedParents[parentId];
    
    if (isExpanded) {
      setExpandedParents((s) => ({ ...s, [parentId]: false }));
      return;
    }

    setExpandedParents((s) => ({ ...s, [parentId]: true }));

    if (!childrenMap[parentId]) {
      setLoadingMap((s) => ({ ...s, [parentId]: true }));
      try {
        const res = await api.get(
          `/product/category/tree?parent_id=${encodeURIComponent(parentId)}`
        );
        const tree = res?.data?.data?.categories_tree || [];
        const node = Array.isArray(tree) && tree.length ? tree[0] : null;
        const children = Array.isArray(node?.children) ? node.children : [];
        setChildrenMap((s) => ({ ...s, [parentId]: children }));
      } catch (err) {
        console.error("Failed to fetch child categories:", err);
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

  const categoriesArray = Array.isArray(categories) ? categories : [];

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">Categories</h4>

      <ul className="space-y-1">
        {categoriesArray.map((cat) => {
          const isExpanded = !!expandedParents[cat.id];
          return (
            <li key={cat.id}>
              <button
                onClick={() => toggleParent(cat.id)}
                className="flex items-center justify-between w-full py-2 text-sm text-gray-600 hover:text-primary transition-colors group"
              >
                <span className="font-light group-hover:font-normal transition-all">{cat.name}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-2 pl-2 border-l border-gray-100 my-1">
                  {loadingMap[cat.id] ? (
                    <div className="text-xs text-gray-400 py-1 pl-2">Loading...</div>
                  ) : childrenMap[cat.id] && childrenMap[cat.id].length > 0 ? (
                    <ul className="space-y-1">
                      {childrenMap[cat.id].map((child) => {
                        const isSelected = selected.includes(child.id);
                        return (
                          <li key={child.id}>
                            <button
                              onClick={() => toggleChild(child.id)}
                              className={`flex items-center w-full py-1.5 px-2 text-sm rounded-sm transition-colors ${
                                isSelected 
                                  ? "text-primary bg-primary/5 font-medium" 
                                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                              }`}
                            >
                              <div className={`w-3 h-3 border rounded-sm mr-2 flex items-center justify-center ${
                                isSelected ? "border-primary bg-primary" : "border-gray-300"
                              }`}>
                                {isSelected && <Check className="w-2 h-2 text-white" />}
                              </div>
                              {child.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="text-xs text-gray-400 py-1 pl-2">
                      No subcategories
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
