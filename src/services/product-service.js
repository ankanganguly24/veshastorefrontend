import api from '@/utils/axios';

export const ProductService = {
  getAll: async () => {
    const res = await api.get('/product');
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/product/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/product', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.patch(`/product/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/product/${id}`);
    return res.data;
  },
};
