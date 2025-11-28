"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <Card
      className={`p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg transition-all duration-300 ${
        isUpdating || isRemoving ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        <div className="w-full md:w-32 h-32 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          {item.thumbnail_media?.url ? (
            <img
              src={item.thumbnail_media.url}
              alt={item.title_snapshot}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-900 truncate">{item.title_snapshot}</h3>
              <p className="text-sm text-gray-500 truncate">
                SKU: {item.sku_snapshot}
              </p>
            </div>

            <button
              onClick={removeItem}
              disabled={isRemoving}
              className="text-red-500 hover:text-red-700 p-2 flex-shrink-0"
              title="Remove item"
            >
              {isRemoving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>

          <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            ₹{price.toLocaleString()}
          </p>
        </div>

        {/* Quantity and Total */}
        <div className="flex flex-col items-end space-y-3">
          <div className="flex items-center border border-purple-200 rounded-lg">
            <button
              onClick={() => updateQuantity(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-2 hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="px-4 py-2 border-x border-purple-200 min-w-[3rem] text-center font-semibold">
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                item.quantity
              )}
            </span>

            <button
              onClick={() => updateQuantity(item.quantity + 1)}
              disabled={isUpdating}
              className="p-2 hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ₹{(price * item.quantity).toLocaleString()}
            </p>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="border-purple-200 hover:bg-purple-50 w-full"
            disabled={isRemoving}
          >
            <Heart className="w-4 h-4 mr-1" />
            Save for Later
          </Button>
        </div>
      </div>
    </Card>
  );
}
