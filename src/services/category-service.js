import api, { handleApiError } from '@/lib/api';

/**
 * Category Service
 * Handles all category-related API calls
 */
export const CategoryService = {
  /**
   * Get all categories
   * @returns {Promise<Object>} Response with categories array
   */
  getAllCategories: async () => {
    try {
      const response = await api.get('/product/category');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error(handleApiError(error, 'Failed to fetch categories'));
    }
  },

  /**
   * Get categories tree structure
   * @returns {Promise<Object>} Response with categories tree
   */
  getCategoriesTree: async () => {
    try {
      const response = await api.get('/product/category/tree');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories tree:', error);
      throw new Error(handleApiError(error, 'Failed to fetch categories tree'));
    }
  },

  /**
   * Get a single category by ID
   * @param {string|number} categoryId - Category ID
   * @returns {Promise<Object>} Category data
   */
  getCategoryById: async (categoryId) => {
    try {
      if (!categoryId) {
        throw new Error('Category ID is required');
      }
      const response = await api.get(`/product/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${categoryId}:`, error);
      throw new Error(handleApiError(error, 'Failed to fetch category'));
    }
  },

  /**
   * Create a new category
   * @param {Object} categoryData - Category data
   * @returns {Promise<Object>} Created category
   */
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/product/category', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error(handleApiError(error, 'Failed to create category'));
    }
  },

  /**
   * Update an existing category
   * @param {string|number} categoryId - Category ID
   * @param {Object} categoryData - Updated category data
   * @returns {Promise<Object>} Updated category
   */
  updateCategory: async (categoryId, categoryData) => {
    try {
      if (!categoryId) {
        throw new Error('Category ID is required');
      }
      const response = await api.patch(`/product/category/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${categoryId}:`, error);
      throw new Error(handleApiError(error, 'Failed to update category'));
    }
  },

  /**
   * Delete a category
   * @param {string|number} categoryId - Category ID
   * @returns {Promise<Object>} Deletion response
   */
  deleteCategory: async (categoryId) => {
    try {
      if (!categoryId) {
        throw new Error('Category ID is required');
      }
      const response = await api.delete(`/product/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
      throw new Error(handleApiError(error, 'Failed to delete category'));
    }
  }
};

