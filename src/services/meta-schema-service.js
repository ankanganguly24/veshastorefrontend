import api from '@/utils/axios';

export const MetaSchemaService = {
  getAll: async () => {
    const res = await api.get('/product/metaschema');
    return res.data;
  },
};
