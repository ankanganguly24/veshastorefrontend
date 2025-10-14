import api from '@/utils/axios';

export const OptionService = {
  getAll: async () => {
    const res = await api.get('/product/option-defination');
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/product/option-defination/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/product/option-defination', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.patch(`/product/option-defination/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/product/option-defination/${id}`);
    return res.data;
  },
};
