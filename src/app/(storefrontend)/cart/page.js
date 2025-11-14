"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CartService from "@/services/cart-service";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track loaders for each item (per item update)
  const [updatingItems, setUpdatingItems] = useState({});
  const [removingItems, setRemovingItems] = useState({});

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await CartService.getCart();
      const cartData = res?.data?.data?.cart;
      setCart(cartData || { items: [] });
    } catch (err) {
      console.error("Failed to load cart:", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cart_item_id, quantity) => {
    if (quantity < 1) return;

    // Optimistic UI update
    setUpdatingItems((prev) => ({ ...prev, [cart_item_id]: true }));

    const previousCart = cart;

    const updatedCart = {
      ...cart,
      items: cart.items.map((item) =>
        item.id === cart_item_id ? { ...item, quantity } : item
      ),
    };

    setCart(updatedCart);

    try {
      await CartService.updateQuantity(cart_item_id, quantity);
      loadCart();
    } catch (err) {
      console.error("Update quantity failed:", err);
      setCart(previousCart); // rollback
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [cart_item_id]: false }));
    }
  };

  const removeItem = async (cart_item_id) => {
    setRemovingItems((prev) => ({ ...prev, [cart_item_id]: true }));

    const previousCart = cart;

    const updatedCart = {
      ...cart,
      items: cart.items.filter((item) => item.id !== cart_item_id),
    };

    setCart(updatedCart);

    try {
      await CartService.removeFromCart(cart_item_id);
      loadCart();
    } catch (err) {
      console.error("Remove item failed:", err);
      setCart(previousCart); // rollback
    } finally {
      setRemovingItems((prev) => ({ ...prev, [cart_item_id]: false }));
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center flex items-center justify-center gap-2 text-lg">
        <Loader2 className="animate-spin" />
        Loading cart...
      </div>
    );

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-12 text-center bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Start Shopping
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price_snapshot ?? 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Shopping Cart
          </h1>

          <p className="text-gray-600">{items.length} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = item.price_snapshot ?? 0;
              const isUpdating = updatingItems[item.id];
              const isRemoving = removingItems[item.id];

              return (
                <Card
                  key={item.id}
                  className={`p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg transition-all duration-300 ${
                    isUpdating ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-4">

                    {/* Image */}
                    <div className="w-full md:w-32 h-32 rounded-lg bg-gray-100 overflow-hidden">
                      <img
                        src={item.thumbnail_media?.url}
                        alt={item.title_snapshot}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{item.title_snapshot}</h3>

                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isRemoving}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          {isRemoving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <p className="text-sm text-gray-500 mb-2">
                        SKU: {item.sku_snapshot}
                      </p>

                      <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        ₹{price}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center border border-purple-200 rounded-lg min-w-[110px] justify-between">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isUpdating}
                          className="p-2 hover:bg-purple-50 rounded-l-lg disabled:opacity-40"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="px-4 py-2 border-x border-purple-200 min-w-[3rem] text-center">
                          {isUpdating ? (
                            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                          ) : (
                            item.quantity
                          )}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                          className="p-2 hover:bg-purple-50 rounded-r-lg disabled:opacity-40"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-lg font-semibold">
                        ₹{(price * item.quantity).toLocaleString()}
                      </p>

                      <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                        <Heart className="w-4 h-4 mr-1" />
                        Save for Later
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 text-lg font-semibold">
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
