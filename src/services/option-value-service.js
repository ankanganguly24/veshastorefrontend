import api, { handleApiError } from '@/lib/api';

/**
 * Option Value Service
 * Handles all product option value related API calls
 */
export const OptionValueService = {
  /**
   * Get all option values
   * @returns {Promise<Object>} Response with option values array
   */
  getAll: async () => {
    try {
      const response = await api.get('/product/option-value');
      return response.data;
    } catch (error) {
      console.error('Error fetching option values:', error);
      throw new Error(handleApiError(error, 'Failed to fetch option values'));
    }
  },

  /**
   * Create a new option value
   * @param {Object} data - Option value data
   * @returns {Promise<Object>} Created option value
   */
  create: async (data) => {
    try {
      const response = await api.post('/product/option-value', data);
      return response.data;
    } catch (error) {
      console.error('Error creating option value:', error);
      throw new Error(handleApiError(error, 'Failed to create option value'));
    }
  },

  /**
   * Update an existing option value
   * @param {string|number} id - Option value ID
   * @param {Object} data - Updated option value data
   * @returns {Promise<Object>} Updated option value
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/product/option-value/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating option value ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to update option value'));
    }
  },

  /**
   * Delete an option value
   * @param {string|number} id - Option value ID
   * @returns {Promise<Object>} Deletion response
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/product/option-value/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting option value ${id}:`, error);
      throw new Error(handleApiError(error, 'Failed to delete option value'));
    }
  },
};

