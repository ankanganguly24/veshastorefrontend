import api, { handleApiError } from "@/lib/api";

/**
 * Order Service
 * Handles all order-related API calls
 */
const OrderService = {
  /**
   * Get order history
   * @returns {Promise<Object>} Order history data
   */
  async getOrderHistory() {
    try {
      const response = await api.get("/order/history");
      return response.data;
    } catch (error) {
      console.error("Error fetching order history:", error);
      throw new Error(handleApiError(error, "Failed to fetch order history"));
    }
  },

  /**
   * Get admin order history
   * @returns {Promise<Object>} Admin order history data
   */
  async getAdminOrderHistory() {
    try {
      const response = await api.get("/order/admin/history");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin order history:", error);
      throw new Error(handleApiError(error, "Failed to fetch admin order history"));
    }
  },
};

export default OrderService;
