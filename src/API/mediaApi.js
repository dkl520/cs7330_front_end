import axios from './axiosConfig';

export const mediaApi = {
  // 获取媒体列表
  list: (params) => {
    return axios.get('/media', { params });
  },

  // 创建媒体
  create: (data) => {
    return axios.post('/media/create', data);
  },

  // 更新媒体
  update: (id, data) => {
    return axios.put(`/media/${id}`, data);
  },

  // 删除媒体
  delete: (id) => {
    return axios.delete(`/media/${id}`);
  }
};