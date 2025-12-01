import api, { handleApiError } from "@/lib/api";

/**
 * Payment Service
 * Handles all payment-related API calls
 */
const PaymentService = {
  /**
   * Initiate checkout process
   * @param {Object} checkoutData - Checkout data
   * @param {string} checkoutData.cart_id - Cart ID
   * @param {string} checkoutData.address_id - Address ID
   * @returns {Promise<Object>} Checkout response
   */
  async checkout(checkoutData) {
    try {
      const response = await api.post("/payment/checkout", checkoutData);
      return response.data;
    } catch (error) {
      console.error("Error initiating checkout:", error);
      throw new Error(handleApiError(error, "Failed to initiate checkout"));
    }
  },

  /**
   * Verify Razorpay payment
   * @param {Object} paymentData - Payment verification data
   * @param {string} paymentData.razorpay_order_id - Razorpay order ID
   * @param {string} paymentData.razorpay_payment_id - Razorpay payment ID
   * @param {string} paymentData.razorpay_signature - Razorpay signature
   * @param {string} paymentData.cart_id - Cart ID
   * @param {string} paymentData.address_id - Address ID
   * @returns {Promise<Object>} Verification response
   */
  async verifyPayment(paymentData) {
    try {
      const response = await api.post("/payment/verify-payment", paymentData);
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw new Error(handleApiError(error, "Failed to verify payment"));
    }
  },
};

export default PaymentService;
