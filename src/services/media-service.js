import api from '@/utils/axios';

export const MediaService = {
  // 📂 Get all uploaded media
  getAll: async () => {
    const res = await api.get('/media');
    return res.data;
  },

  // 📤 Upload a single file
  upload: async (formData) => {
    const res = await api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  // 📤 Upload multiple files at once
  uploadMultiple: async (formData) => {
    const res = await api.post('/media/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },


};