import axiosInstance from "@/utils/axios";

const CartService = {
  // Get cart
  async getCart() {
    return axiosInstance.get("/cart");
  },

  // Add item to cart
  async addToCart({ product_id, variant_id, quantity }) {
    return axiosInstance.post("/cart/items", {
      product_id,
      variant_id,
      quantity,
    });
  },

  // Update quantity (by cart item id)
  async updateQuantity(cart_item_id, quantity) {
    return axiosInstance.put(`/cart/items/${cart_item_id}`, {
      quantity,
    });
  },

  // Remove an item
  async removeFromCart(cart_item_id) {
    return axiosInstance.delete(`/cart/items/${cart_item_id}`);
  },
};

export default CartService;
