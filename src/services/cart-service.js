import api, { handleApiError } from "@/lib/api";

/**
 * Cart Service
 * Handles all cart-related API calls
 */
const CartService = {
  /**
   * Get current cart
   * @returns {Promise<Object>} Cart data
   */
  async getCart() {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw new Error(handleApiError(error, "Failed to fetch cart"));
    }
  },

  /**
   * Add item to cart
   * @param {Object} params - Cart item parameters
   * @param {string|number} params.product_id - Product ID
   * @param {string|number} params.variant_id - Variant ID
   * @param {number} params.quantity - Quantity
   * @returns {Promise<Object>} Updated cart
   */
  async addToCart({ product_id, variant_id, quantity }) {
    try {
      const response = await api.post("/cart/items", {
        product_id,
        variant_id,
        quantity,
      });
      // Dispatch cart update event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event("cartUpdated"));
      }
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error(handleApiError(error, "Failed to add item to cart"));
    }
  },

  /**
   * Update cart item quantity
   * @param {string|number} cart_item_id - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Object>} Updated cart
   */
  async updateQuantity(cart_item_id, quantity) {
    try {
      console.log(`Updating cart item ${cart_item_id} to quantity ${quantity}`);
      const response = await api.put(`/cart/items/${cart_item_id}`, {
        quantity,
      });
      console.log('Cart update response:', response.data);
      // Dispatch cart update event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event("cartUpdated"));
      }
      return response.data;
    } catch (error) {
      console.error("Error updating quantity:", error);
      console.error("Error details:", {
        cart_item_id,
        quantity,
        endpoint: `/cart/items/${cart_item_id}`,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      throw error; // Throw original error instead of wrapping it
    }
  },

  /**
   * Remove item from cart
   * @param {string|number} cart_item_id - Cart item ID
   * @returns {Promise<Object>} Updated cart
   */
  async removeFromCart(cart_item_id) {
    try {
      console.log(`Removing cart item ${cart_item_id}`);
      const response = await api.delete(`/cart/items/${cart_item_id}`);
      console.log('Cart remove response:', response.data);
      // Dispatch cart update event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event("cartUpdated"));
      }
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      console.error("Error details:", {
        cart_item_id,
        endpoint: `/cart/items/${cart_item_id}`,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      throw error; // Throw original error instead of wrapping it
    }
  },

  /**
   * Get cart summary (item count and total)
   * @returns {Promise<Object>} Cart summary with itemCount, total, and items
   */
  async getCartSummary() {
    try {
      const cartData = await this.getCart();
      // Handle different response structures
      const cart = cartData?.data?.cart || cartData?.data?.data?.cart || cartData?.cart;
      const items = cart?.items || [];
      
      const itemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);
      const total = items.reduce((sum, item) => {
        const price = item.price_snapshot || item.price || 0;
        return sum + (price * (item.quantity || 0));
      }, 0);

      return {
        itemCount,
        total,
        items,
      };
    } catch (error) {
      console.error("Error getting cart summary:", error);
      return { itemCount: 0, total: 0, items: [] };
    }
  },

  /**
   * Cart preflight - Call before displaying cart
   * @param {string} cart_id - Cart ID
   * @returns {Promise<Object>} Preflight response
   */
  async cartPreflight(cart_id) {
    try {
      const response = await api.post("/cart/preflight", {
        cart_id,
      });
      return response.data;
    } catch (error) {
      console.error("Error calling cart preflight:", error);
      throw new Error(handleApiError(error, "Failed to call cart preflight"));
    }
  },
};

export default CartService;

