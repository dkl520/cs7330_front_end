import axios from './axiosConfig';

export const userApi = {
  // 获取用户列表
  list: (params) => {
    return axios.get('/user');
  },

  // 创建用户
  create: (data) => {
    return axios.post('/user/create', data);
  },

  // 更新用户
  update: (id, data) => {
    return axios.put(`/user/${id}`, data);
  },

  // 删除用户
  delete: (id) => {
    return axios.delete(`/user/${id}`);
  }
};