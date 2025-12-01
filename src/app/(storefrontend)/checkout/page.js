"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import CartService from "@/services/cart-service";
import PaymentService from "@/services/payment-service";
import { toast } from "sonner";

const RAZORPAY_KEY = "rzp_test_RgrblFTsE8id5O";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'failed' | null
  const [orderData, setOrderData] = useState(null);

  // Get cart_id and address_id from session storage (set by address modal)
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    // Retrieve checkout data from session storage
    const storedData = sessionStorage.getItem("checkoutData");
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else {
      // If no checkout data, redirect to cart
      toast.error("Please select an address to continue");
      router.push("/cart");
    }
  }, [router]);

  // Fetch cart data
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await CartService.getCart();
      return res?.data?.cart || res?.data?.data?.cart || { items: [] };
    },
    staleTime: 2 * 60 * 1000,
    enabled: !!checkoutData,
  });

  const items = cart?.items || [];
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price_snapshot ?? 0) * item.quantity,
    0
  );

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!checkoutData || !cart?.id) {
      toast.error("Missing checkout information");
      return;
    }

    setIsProcessing(true);

    try {
      // Get order details from backend
      const checkoutResponse = await PaymentService.checkout({
        cart_id: checkoutData.cart_id,
        address_id: checkoutData.address_id,
      });

      console.log("Checkout response:", checkoutResponse);

      // Extract Razorpay order details from response
      const razorpayOrderId = checkoutResponse?.data?.razorpay_order_id || 
                              checkoutResponse?.razorpay_order_id;
      const amount = checkoutResponse?.data?.amount || subtotal * 100;

      if (!razorpayOrderId) {
        throw new Error("Failed to create payment order");
      }

      // Configure Razorpay options
      const options = {
        key: RAZORPAY_KEY,
        amount: amount,
        currency: "INR",
        name: "Vesha",
        description: `Order for ${items.length} item(s)`,
        order_id: razorpayOrderId,
        image: "/logo.png", // Make sure you have a logo in public folder
        handler: async function (response) {
          // Payment successful, verify with backend
          try {
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cart_id: checkoutData.cart_id,
              address_id: checkoutData.address_id,
            };

            const verifyResponse = await PaymentService.verifyPayment(verificationData);
            
            console.log("Payment verified:", verifyResponse);
            
            // Clear checkout data from session
            sessionStorage.removeItem("checkoutData");
            
            // Set success status
            setPaymentStatus("success");
            setOrderData(verifyResponse?.data);
            
            toast.success("Payment successful!");
            
            // Redirect to orders page after 2 seconds
            setTimeout(() => {
              router.push("/orders");
            }, 2000);
          } catch (error) {
            console.error("Payment verification failed:", error);
            setPaymentStatus("failed");
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#000000", // Vesha brand color (black)
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        setPaymentStatus("failed");
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      razorpay.open();
      setIsProcessing(false);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  if (isLoading || !checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
          <span className="text-sm">Loading checkout...</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
        <h1 className="text-2xl font-light mb-4 text-gray-900">Your cart is empty</h1>
        <Button asChild variant="outline">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  // Success state
  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. Redirecting to orders...
          </p>
          <Loader2 className="w-5 h-5 animate-spin mx-auto text-gray-400" />
        </div>
      </div>
    );
  }

  // Failed state
  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            Your payment could not be processed. Please try again or contact support.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => router.push("/cart")}>
              Back to Cart
            </Button>
            <Button onClick={() => setPaymentStatus(null)} className="bg-black hover:bg-gray-800">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-light mt-4 text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-600 mt-2">
            Complete your purchase securely with Razorpay
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-sm">
              <h3 className="text-lg font-medium mb-6 text-gray-900">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-20 h-24 bg-gray-200 relative flex-shrink-0 rounded-sm overflow-hidden">
                      {item.thumbnail_media?.url && (
                        <Image
                          src={item.thumbnail_media.url}
                          alt={item.title_snapshot}
                          fill
                          className="object-cover"
                        />
                      )}
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {item.title_snapshot}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.variant_snapshot?.options?.map((o) => o.value).join(" / ")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-2">
                        ₹{(item.price_snapshot * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-base pt-3 border-t border-gray-300">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-sm sticky top-8">
              <h3 className="text-lg font-medium mb-4 text-gray-900">Payment</h3>

              <div className="mb-6">
                <div className="p-4 border-2 border-black rounded-sm bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Razorpay</span>
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">
                    Secure payment gateway
                  </p>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${subtotal.toLocaleString()}`
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-3 h-3" />
                Secure Checkout
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to Vesha's terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
