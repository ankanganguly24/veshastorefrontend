import api, { handleApiError } from "@/lib/api";

/**
 * Address Service
 * Handles all address-related API calls
 */
const AddressService = {
  /**
   * Get all user addresses
   * @returns {Promise<Object>} Address list data
   */
  async getAddresses() {
    try {
      const response = await api.get("/address");
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw new Error(handleApiError(error, "Failed to fetch addresses"));
    }
  },

  /**
   * Add new address
   * @param {Object} addressData - Address data
   * @returns {Promise<Object>} Created address data
   */
  async addAddress(addressData) {
    try {
      const response = await api.post("/address", addressData);
      return response.data;
    } catch (error) {
      console.error("Error adding address:", error);
      throw new Error(handleApiError(error, "Failed to add address"));
    }
  },

  /**
   * Update existing address
   * @param {string} addressId - Address ID
   * @param {Object} addressData - Updated address data
   * @returns {Promise<Object>} Updated address data
   */
  async updateAddress(addressId, addressData) {
    try {
      const response = await api.put(`/address/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error);
      throw new Error(handleApiError(error, "Failed to update address"));
    }
  },

  /**
   * Delete address
   * @param {string} addressId - Address ID
   * @returns {Promise<Object>} Delete response
   */
  async deleteAddress(addressId) {
    try {
      const response = await api.delete(`/address/${addressId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting address:", error);
      throw new Error(handleApiError(error, "Failed to delete address"));
    }
  },
};

export default AddressService;
