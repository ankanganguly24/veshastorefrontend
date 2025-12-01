import api, { handleApiError } from '@/lib/api';

/**
 * Option Service
 * Handles all product option definition related API calls
 */
export const OptionService = {
  /**
   * Get all option definitions
   * @returns {Promise<Object>} Response with options array
   */
  getAll: async () => {
    try {
      const response = await api.get('/product/option-defination');
      return response.data;
    } catch (error) {
      console.error('Error fetching options:', error);
      throw new Error(handleApiError(error, 'Failed to fetch options'));
    }
  },

  /**
   * Get option definition by ID
   * @param {string|number} id - Option ID
   * @returns {Promise<Object>} Option data
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/product/option-defination/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching option ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to fetch option'));
    }
  },

  /**
   * Create a new option definition
   * @param {Object} data - Option data
   * @returns {Promise<Object>} Created option
   */
  create: async (data) => {
    try {
      const response = await api.post('/product/option-defination', data);
      return response.data;
    } catch (error) {
      console.error('Error creating option:', error);
      throw new Error(handleApiError(error, 'Failed to create option'));
    }
  },

  /**
   * Update an existing option definition
   * @param {string|number} id - Option ID
   * @param {Object} data - Updated option data
   * @returns {Promise<Object>} Updated option
   */
  update: async (id, data) => {
    try {
      const response = await api.patch(`/product/option-defination/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating option ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to update option'));
    }
  },

  /**
   * Delete an option definition
   * @param {string|number} id - Option ID
   * @returns {Promise<Object>} Deletion response
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/product/option-defination/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting option ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to delete option'));
    }
  },
};

