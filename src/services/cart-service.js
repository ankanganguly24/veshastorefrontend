import axiosInstance from "@/utils/axios";

const CartService = {
  // Get cart
  async getCart() {
    try {
      const response = await axiosInstance.get("/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  // Add item to cart
  async addToCart({ product_id, variant_id, quantity }) {
    try {
      const response = await axiosInstance.post("/cart/items", {
        product_id,
        variant_id,
        quantity,
      });
      // Dispatch cart update event
      window.dispatchEvent(new Event("cartUpdated"));
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // Update quantity (by cart item id)
  async updateQuantity(cart_item_id, quantity) {
    try {
      const response = await axiosInstance.put(`/cart/items/${cart_item_id}`, {
        quantity,
      });
      // Dispatch cart update event
      window.dispatchEvent(new Event("cartUpdated"));
      return response.data;
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  },

  // Remove an item
  async removeFromCart(cart_item_id) {
    try {
      const response = await axiosInstance.delete(`/cart/items/${cart_item_id}`);
      // Dispatch cart update event
      window.dispatchEvent(new Event("cartUpdated"));
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  // Get cart summary (item count and total)
  async getCartSummary() {
    try {
      const cartData = await this.getCart();
      const items = cartData?.data?.items || [];
      const itemCount = items.reduce((count, item) => count + (item.quantity || 0), 0);
      const total = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

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
};

export default CartService;
