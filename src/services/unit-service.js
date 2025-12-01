import api, { handleApiError } from '@/lib/api';

/**
 * Unit Service
 * Handles all measurement unit related API calls
 */
export const UnitService = {
  /**
   * Get all units
   * @returns {Promise<Object>} Response with units array
   */
  getAllUnits: async () => {
    try {
      const response = await api.get('/mesurement/unit');
      return response.data;
    } catch (error) {
      console.error('Error fetching units:', error);
      throw new Error(handleApiError(error, 'Failed to fetch units'));
    }
  },

  /**
   * Get a specific unit by ID
   * @param {string|number} unitId - Unit ID
   * @returns {Promise<Object>} Unit data
   */
  getUnitById: async (unitId) => {
    try {
      if (!unitId) {
        throw new Error('Unit ID is required');
      }
      const response = await api.get(`/mesurement/unit/${unitId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching unit ${unitId}:`, error);
      throw new Error(handleApiError(error, 'Failed to fetch unit'));
    }
  }
};

