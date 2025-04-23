import axios from './axiosConfig';

export const repostApi = {
  // 获取转发列表
  list: (params) => {
    return axios.get('/query/repost/list/', { params });
  },

  // 创建转发
  create: (data) => {
    return axios.post('/query/repost/create/', data);
  },

  // 更新转发
  update: (id, data) => {
    return axios.put(`/repost/${id}/update`, data);
  },

  // 删除转发
  delete: (id) => {
    return axios.delete(`/repost/${id}/delete`);
  }
};