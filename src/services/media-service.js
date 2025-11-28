import api, { handleApiError } from '@/lib/api';

/**
 * Media Service
 * Handles all media/file upload related API calls
 */
export const MediaService = {
  /**
   * Get all uploaded media
   * @returns {Promise<Object>} Response with media array
   */
  getAll: async () => {
    try {
      const response = await api.get('/media');
      return response.data;
    } catch (error) {
      console.error('Error fetching media:', error);
      throw new Error(handleApiError(error, 'Failed to fetch media'));
    }
  },

  /**
   * Upload a single file
   * @param {FormData} formData - Form data containing file
   * @returns {Promise<Object>} Upload response
   */
  upload: async (formData) => {
    try {
      const response = await api.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(handleApiError(error, 'Failed to upload file'));
    }
  },

  /**
   * Upload multiple files at once
   * @param {FormData} formData - Form data containing multiple files
   * @returns {Promise<Object>} Upload response
   */
  uploadMultiple: async (formData) => {
    try {
      const response = await api.post('/media/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw new Error(handleApiError(error, 'Failed to upload files'));
    }
  },
};