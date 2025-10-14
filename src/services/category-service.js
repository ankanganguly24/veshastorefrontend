import apiClient from '@/lib/api-client';

export const CategoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/product/category');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get categories tree
  getCategoriesTree: async () => {
    try {
      const response = await apiClient.get('/product/category/tree');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories tree:', error);
      throw error;
    }
  },

  // Get a single category by ID
  getCategoryById: async (categoryId) => {
    try {
      if (!categoryId) throw new Error('Category ID is required');
      const response = await apiClient.get(`/product/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${categoryId}:`, error);
      throw error;
    }
  },

  // Create a new category
  createCategory: async (categoryData) => {
    try {
      const response = await apiClient.post('/product/category', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update an existing category
  updateCategory: async (categoryId, categoryData) => {
    try {
      if (!categoryId) throw new Error('Category ID is required');
      const response = await apiClient.patch(`/product/category/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${categoryId}:`, error);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    try {
      if (!categoryId) throw new Error('Category ID is required');
      const response = await apiClient.delete(`/product/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
      throw error;
    }
  }
};
