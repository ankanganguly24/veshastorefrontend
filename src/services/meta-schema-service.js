import api, { handleApiError } from '@/lib/api';

/**
 * Meta Schema Service
 * Handles all product meta schema related API calls
 */
export const MetaSchemaService = {
  /**
   * Get all meta schemas
   * @returns {Promise<Object>} Response with meta schemas array
   */
  getAll: async () => {
    try {
      const response = await api.get('/product/metaschema');
      return response.data;
    } catch (error) {
      console.error('Error fetching meta schemas:', error);
      throw new Error(handleApiError(error, 'Failed to fetch meta schemas'));
    }
  },
};

