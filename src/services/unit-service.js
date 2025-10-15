import apiClient from '@/lib/api-client';

export const UnitService = {
  // Get all units
  getAllUnits: async () => {
    try {
      const response = await apiClient.get('/mesurement/unit');
      return response.data;
    } catch (error) {
      console.error('Error fetching units:', error);
      throw error;
    }
  },

  // Get a specific unit by ID
  getUnitById: async (unitId) => {
    try {
      if (!unitId) throw new Error('Unit ID is required');
      const response = await apiClient.get(`/mesurement/unit/${unitId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching unit ${unitId}:`, error);
      throw error;
    }
  }
};
