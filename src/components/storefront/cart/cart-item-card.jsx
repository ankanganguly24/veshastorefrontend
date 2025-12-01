"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, Heart, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartService from "@/services/cart-service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

/**
 * CartItemCard Component
 * Displays a single cart item with quantity controls
 */
export function CartItemCard({ item, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const queryClient = useQueryClient();

  const price = item.price_snapshot ?? 0;

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      await CartService.updateQuantity(item.id, newQuantity);
      await onUpdate();
      queryClient.invalidateQueries(['cart-summary']);
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Update quantity failed:", error);
      toast.error("Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async () => {
    setIsRemoving(true);
    try {
      await CartService.removeFromCart(item.id);
      await onUpdate();
      queryClient.invalidateQueries(['cart-summary']);
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Remove item failed:", error);
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className={`flex gap-6 py-6 border-b border-gray-100 last:border-0 transition-opacity duration-200 ${
      isUpdating || isRemoving ? "opacity-50" : "opacity-100"
    }`}>
      {/* Image */}
      <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-50 relative flex-shrink-0">
        {item.thumbnail_media?.url ? (
          <Image
            src={item.thumbnail_media.url}
            alt={item.title_snapshot}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1">{item.title_snapshot}</h3>
            <p className="text-sm text-gray-500 mb-2">SKU: {item.sku_snapshot}</p>
            <p className="text-sm font-medium text-gray-900">₹{price.toLocaleString()}</p>
          </div>
          
          <button
            onClick={removeItem}
            disabled={isRemoving}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Remove item"
          >
            {isRemoving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity */}
          <div className="flex items-center border border-gray-200 w-fit">
            <button
              onClick={() => updateQuantity(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-2 hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {isUpdating ? (
                <Loader2 className="w-3 h-3 animate-spin mx-auto" />
              ) : (
                item.quantity
              )}
            </span>
            <button
              onClick={() => updateQuantity(item.quantity + 1)}
              disabled={isUpdating}
              className="p-2 hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              ₹{(price * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
