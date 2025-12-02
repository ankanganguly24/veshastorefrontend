import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items;
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      
      toggleWishlist: (product) => {
        const { items, addItem, removeItem } = get();
        if (items.some((item) => item.id === product.id)) {
          removeItem(product.id);
          return false; // Removed
        } else {
          addItem(product);
          return true; // Added
        }
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage', // unique name for localStorage key
    }
  )
);

export default useWishlistStore;
