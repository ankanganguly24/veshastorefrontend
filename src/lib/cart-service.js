// Cart utility functions for localStorage management

export const CartService = {
  // Get cart items from localStorage
  getCartItems: () => {
    try {
      const cartItems = localStorage.getItem('cart');
      return cartItems ? JSON.parse(cartItems) : [];
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  },

  // Add item to cart
  addToCart: (product, selectedSize = 'M', selectedColor = 'Default', quantity = 1) => {
    try {
      const cartItems = CartService.getCartItems();
      
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(
        item => item.id === product.id && 
                item.size === selectedSize && 
                item.color === selectedColor
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.images?.[0] || product.image || '/placeholder.jpg',
          size: selectedSize,
          color: selectedColor,
          quantity: quantity,
          addedAt: new Date().toISOString(),
          discount: product.discount || 0,
          category: product.category || 'Fashion',
          brand: product.brand || 'Vesha',
          inStock: product.inStock !== false,
          sku: product.sku || `SKU-${product.id}`,
          rating: product.rating || 4.5
        };
        cartItems.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Trigger custom event for cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { cartItems, action: 'add', product } 
      }));

      return cartItems;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: (productId, size, color) => {
    try {
      const cartItems = CartService.getCartItems();
      const updatedCart = cartItems.filter(
        item => !(item.id === productId && item.size === size && item.color === color)
      );
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Trigger custom event for cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { cartItems: updatedCart, action: 'remove' } 
      }));

      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Update item quantity
  updateQuantity: (productId, size, color, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        return CartService.removeFromCart(productId, size, color);
      }

      const cartItems = CartService.getCartItems();
      const itemIndex = cartItems.findIndex(
        item => item.id === productId && item.size === size && item.color === color
      );

      if (itemIndex > -1) {
        cartItems[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        // Trigger custom event for cart updates
        window.dispatchEvent(new CustomEvent('cartUpdated', { 
          detail: { cartItems, action: 'update' } 
        }));
      }

      return cartItems;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: () => {
    try {
      localStorage.removeItem('cart');
      
      // Trigger custom event for cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { cartItems: [], action: 'clear' } 
      }));

      return [];
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Get cart summary
  getCartSummary: () => {
    try {
      const cartItems = CartService.getCartItems();
      const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        itemCount,
        subtotal,
        cartItems
      };
    } catch (error) {
      console.error('Error getting cart summary:', error);
      return { itemCount: 0, subtotal: 0, cartItems: [] };
    }
  },

  // Check if product is in cart
  isInCart: (productId, size = null, color = null) => {
    try {
      const cartItems = CartService.getCartItems();
      return cartItems.some(item => {
        if (size && color) {
          return item.id === productId && item.size === size && item.color === color;
        }
        return item.id === productId;
      });
    } catch (error) {
      console.error('Error checking cart:', error);
      return false;
    }
  },

  // Get item quantity in cart
  getItemQuantity: (productId, size, color) => {
    try {
      const cartItems = CartService.getCartItems();
      const item = cartItems.find(
        item => item.id === productId && item.size === size && item.color === color
      );
      return item ? item.quantity : 0;
    } catch (error) {
      console.error('Error getting item quantity:', error);
      return 0;
    }
  }
};

// Wishlist utility functions
export const WishlistService = {
  // Get wishlist items from localStorage
  getWishlistItems: () => {
    try {
      const wishlistItems = localStorage.getItem('wishlist');
      return wishlistItems ? JSON.parse(wishlistItems) : [];
    } catch (error) {
      console.error('Error getting wishlist items:', error);
      return [];
    }
  },

  // Add item to wishlist
  addToWishlist: (product) => {
    try {
      const wishlistItems = WishlistService.getWishlistItems();
      
      // Check if item already exists
      const existingItem = wishlistItems.find(item => item.id === product.id);
      
      if (!existingItem) {
        const wishlistItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.images?.[0] || product.image || '/placeholder.jpg',
          addedAt: new Date().toISOString(),
          discount: product.discount || 0,
          category: product.category || 'Fashion',
          brand: product.brand || 'Vesha',
          inStock: product.inStock !== false,
          rating: product.rating || 4.5
        };
        
        wishlistItems.push(wishlistItem);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        
        // Trigger custom event for wishlist updates
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
          detail: { wishlistItems, action: 'add', product } 
        }));
      }

      return wishlistItems;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  // Remove item from wishlist
  removeFromWishlist: (productId) => {
    try {
      const wishlistItems = WishlistService.getWishlistItems();
      const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
      
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      // Trigger custom event for wishlist updates
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
        detail: { wishlistItems: updatedWishlist, action: 'remove' } 
      }));

      return updatedWishlist;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // Check if product is in wishlist
  isInWishlist: (productId) => {
    try {
      const wishlistItems = WishlistService.getWishlistItems();
      return wishlistItems.some(item => item.id === productId);
    } catch (error) {
      console.error('Error checking wishlist:', error);
      return false;
    }
  },

  // Clear entire wishlist
  clearWishlist: () => {
    try {
      localStorage.removeItem('wishlist');
      
      // Trigger custom event for wishlist updates
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
        detail: { wishlistItems: [], action: 'clear' } 
      }));

      return [];
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw error;
    }
  }
};

const services = { CartService, WishlistService };
export default services;
