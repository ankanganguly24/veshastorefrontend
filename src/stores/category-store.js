import { create } from 'zustand';
import { CategoryService } from '@/services/category-service';

const useCategoryStore = create((set, get) => ({
  categories: [],
  categoriesTree: [],
  isLoading: false,
  error: null,
  
  // Fetch all categories
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await CategoryService.getAllCategories();
      if (response.success && response.data?.categories) {
        set({ 
          categories: response.data.categories,
          isLoading: false 
        });
        return response.data.categories;
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch categories', 
        isLoading: false 
      });
      return [];
    }
  },

  // Fetch categories tree
  fetchCategoriesTree: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await CategoryService.getCategoriesTree();
      if (response.success && response.data?.categories_tree) {
        set({ 
          categoriesTree: response.data.categories_tree,
          isLoading: false 
        });
        return response.data.categories_tree;
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch categories tree', 
        isLoading: false 
      });
      return [];
    }
  },

  // Add a new category
  addCategory: async (categoryData) => {
    set({ isLoading: true, error: null });
    try {
      // Handle the "null" string value for parent_id
      const processedData = {
        ...categoryData,
        parent_id: categoryData.parent_id === "null" ? null : categoryData.parent_id
      };
      
      const response = await CategoryService.createCategory(processedData);
      await get().fetchCategories();
      await get().fetchCategoriesTree();
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to add category', 
        isLoading: false 
      });
      throw error;
    }
  },

  // Update a category
  updateCategory: async (categoryId, categoryData) => {
    set({ isLoading: true, error: null });
    try {
      // Validate category ID
      if (!categoryId) {
        throw new Error('Category ID is required for updates');
      }

      // Handle the "null" string value for parent_id
      const processedData = {
        ...categoryData,
        parent_id: categoryData.parent_id === "null" ? null : categoryData.parent_id
      };
      
      const response = await CategoryService.updateCategory(categoryId, processedData);
      await get().fetchCategories();
      await get().fetchCategoriesTree();
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to update category', 
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    set({ isLoading: true, error: null });
    try {
      // Validate category ID
      if (!categoryId) {
        throw new Error('Category ID is required for deletion');
      }
      
      const response = await CategoryService.deleteCategory(categoryId);
      await get().fetchCategories();
      await get().fetchCategoriesTree();
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to delete category', 
        isLoading: false 
      });
      throw error;
    }
  },

  // Find a category by ID
  getCategoryById: (categoryId) => {
    return get().categories.find(category => category.id === categoryId);
  },

  // Get parent categories (categories without parents or are themselves parents)
  getParentCategories: () => {
    return get().categories.filter(category => 
      !category.parent_id || 
      get().categories.some(cat => cat.parent_id === category.id)
    );
  },
  
  // Clear errors
  clearErrors: () => {
    set({ error: null });
  }
}));

export default useCategoryStore;
