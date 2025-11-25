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
  const [error, setError] = useState(null);

  // Track loaders for each item (per item update)
  const [updatingItems, setUpdatingItems] = useState({});
  const [removingItems, setRemovingItems] = useState({});

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await CartService.getCart();
      
      // Handle the response structure properly
      const cartData = res?.data?.cart || res?.data?.data?.cart;
      
      if (cartData) {
        setCart(cartData);
        console.log("Cart loaded:", cartData);
      } else {
        setCart({ items: [] });
        console.warn("No cart data found in response");
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
      setError("Failed to load cart. Please try again.");
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cart_item_id, quantity) => {
    if (quantity < 1) return;

    setUpdatingItems((prev) => ({ ...prev, [cart_item_id]: true }));
    const previousCart = cart;

    // Optimistic UI update
    const updatedCart = {
      ...cart,
      items: cart.items.map((item) =>
        item.id === cart_item_id ? { ...item, quantity } : item
      ),
    };
    setCart(updatedCart);

    try {
      await CartService.updateQuantity(cart_item_id, quantity);
      await loadCart(); // Reload to ensure consistency
    } catch (err) {
      console.error("Update quantity failed:", err);
      setCart(previousCart); // rollback
      setError("Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [cart_item_id]: false }));
    }
  };

  const removeItem = async (cart_item_id) => {
    setRemovingItems((prev) => ({ ...prev, [cart_item_id]: true }));
    const previousCart = cart;

    // Optimistic UI update
    const updatedCart = {
      ...cart,
      items: cart.items.filter((item) => item.id !== cart_item_id),
    };
    setCart(updatedCart);

    try {
      await CartService.removeFromCart(cart_item_id);
      await loadCart(); // Reload to ensure consistency
    } catch (err) {
      console.error("Remove item failed:", err);
      setCart(previousCart); // rollback
      setError("Failed to remove item");
    } finally {
      setRemovingItems((prev) => ({ ...prev, [cart_item_id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center flex items-center justify-center gap-2 text-lg min-h-screen">
        <Loader2 className="animate-spin" />
        Loading cart...
      </div>
    );
  }

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-12 text-center bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started</p>
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
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
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
                          onClick={() => removeItem(item.id)}
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
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹0</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 text-lg font-semibold hover:shadow-lg transition-all">
                Proceed to Checkout
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by our payment gateway
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
