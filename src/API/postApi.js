import axios from './axiosConfig';

export const postApi = {
  // 获取帖子列表
  list: () => {
    return axios.get('/post');
  },

  // 创建帖子
  create: (data) => {
    return axios.post('/post/create', data);
  },

  // 获取帖子详情
  detail: (id) => {
    return axios.get(`/post/${id}`);
  },

  // 更新帖子
  update: (id, data) => {
    return axios.put(`/post/${id}`, data);
  },

  // 删除帖子
  delete: (id) => {
    return axios.delete(`/post/${id}`);
  },

  // 获取转发列表
  getReposts: () => {
    return axios.get('/repost');
  },

  // 创建转发
  createRepost: (data) => {
    return axios.post('/repost/create', data);
  },

  // 获取转发详情
  repostDetail: (id) => {
    return axios.get(`/repost/${id}`);
  },

  // 更新转发
  updateRepost: (id, data) => {
    return axios.put(`/repost/${id}`, data);
  },

  // 删除转发
  deleteRepost: (id) => {
    return axios.delete(`/repost/${id}`);
  }
};