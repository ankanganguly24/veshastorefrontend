import api, { handleApiError } from '@/lib/api';

/**
 * Product Service
 * Handles all product-related API calls
 */
export const ProductService = {
  /**
   * Get all products
   * @returns {Promise<Object>} Response with products array
   */
  getAll: async () => {
    try {
      const response = await api.get('/product');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(handleApiError(error, 'Failed to fetch products'));
    }
  },

  /**
   * Get product by ID
   * @param {string|number} id - Product ID
   * @returns {Promise<Object>} Product data
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to fetch product'));
    }
  },

  /**
   * Create a new product
   * @param {Object} data - Product data
   * @returns {Promise<Object>} Created product
   */
  create: async (data) => {
    try {
      const response = await api.post('/product', data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error(handleApiError(error, 'Failed to create product'));
    }
  },

  /**
   * Update an existing product
   * @param {string|number} id - Product ID
   * @param {Object} data - Updated product data
   * @returns {Promise<Object>} Updated product
   */
  update: async (id, data) => {
    try {
      const response = await api.patch(`/product/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to update product'));
    }
  },

  /**
   * Delete a product
   * @param {string|number} id - Product ID
   * @returns {Promise<Object>} Deletion response
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to delete product'));
    }
  },
};

