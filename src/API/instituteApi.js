import axios from './axiosConfig';

export const instituteApi = {
  // 获取研究所列表
  list: (params) => {
    return axios.get('/institute', { params });
  },

  // 创建研究所
  create: (data) => {
    return axios.post('/institute/create', data);
  },

  // 更新研究所
  update: (id, data) => {
    return axios.put(`/institute/${id}`, data);
  },

  // 删除研究所
  delete: (id) => {
    return axios.delete(`/institute/${id}`);
  }
};