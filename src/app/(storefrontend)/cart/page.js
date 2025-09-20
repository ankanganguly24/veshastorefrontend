"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Heart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CartService } from "@/lib/cart-service";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Load cart items from localStorage on mount
  useEffect(() => {
    setCartItems(CartService.getCartItems());
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(CartService.getCartItems());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateQuantity = (id, size, color, newQuantity) => {
    CartService.updateQuantity(id, size, color, newQuantity);
  };

  const removeItem = (id, size, color) => {
    CartService.removeFromCart(id, size, color);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "vesha20") {
      setAppliedPromo({ code: "VESHA20", discount: 20 });
      setPromoCode("");
    } else if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo({ code: "WELCOME10", discount: 10 });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal - promoDiscount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-12 text-center bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Start Shopping
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

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
          <p className="text-gray-600">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-purple-400" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      <span>Size: {item.size}</span> • <span>Color: {item.color}</span>
                    </div>

                    {!item.inStock && (
                      <p className="text-red-600 text-sm mb-2 font-medium">Out of Stock</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          ₹{item.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {item.discount}% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center border border-purple-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="p-2 hover:bg-purple-50 rounded-l-lg transition-colors"
                        disabled={!item.inStock}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-purple-200 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="p-2 hover:bg-purple-50 rounded-r-lg transition-colors"
                        disabled={!item.inStock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    
                    <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                      <Heart className="w-4 h-4 mr-1" />
                      Save for Later
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">{appliedPromo.code}</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount ({appliedPromo.discount}%)</span>
                    <span>-₹{promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <p className="text-xs text-green-600">🎉 Free shipping on orders over ₹2,000</p>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold">
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Secure checkout with 256-bit SSL encryption
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Free returns within 30 days
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  24/7 customer support
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Secure payment gateway
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
