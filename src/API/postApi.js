import axios from './axiosConfig';

export const postApi = {
  // 获取帖子列表
  list: (params) => {
    return axios.get('/query/Post/list/', { params });
  },

  // 创建帖子
  create: (data) => {
    return axios.post('/query/Post/create/', data);
  },

  // 更新帖子
  update: (id, data) => {
    return axios.put(`/Post/${id}/update`, data);
  },

  // 删除帖子
  delete: (id) => {
    return axios.delete(`/Post/${id}/delete`);
  },

  // 查询帖子
  query: (params) => {
    return axios.get('/query/post/', { params });
  }
};