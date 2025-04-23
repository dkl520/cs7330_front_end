import axios from './axiosConfig';

export const projectApi = {
  // 获取项目列表
  list: (params) => {
    return axios.get('/project', { params });
  },

  // 创建项目
  create: (data) => {
    return axios.post('/project/create', data);
  },

  // 更新项目
  update: (id, data) => {
    return axios.put(`/project/${id}`, data);
  },

  // 删除项目
  delete: (id) => {
    return axios.delete(`/project/${id}`);
  }
};