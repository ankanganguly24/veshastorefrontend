import api from '@/utils/axios';

export const OptionValueService = {
  getAll: async () => {
    const res = await api.get('/product/option-value');
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/product/option-value', data);
    return res.data;
  },
  update: async (id, data) => {
    // Update option value by ID
    const res = await api.put(`/product/option-value/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    // Delete option value by ID
    const res = await api.delete(`/product/option-value/${id}`);
    return res.data;
  },
};
