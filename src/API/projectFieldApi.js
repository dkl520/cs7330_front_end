import axios from './axiosConfig';

export const projectFieldApi = {
  // 获取项目字段列表
  list: (params) => {
    return axios.get('/query/ProjectField/list/', { params });
  },

  // 创建项目字段
  create: (data) => {
    return axios.post('/query/ProjectField/create/', data);
  },

  // 更新项目字段
  update: (id, data) => {
    return axios.put(`/ProjectField/${id}/update`, data);
  },

  // 删除项目字段
  delete: (id) => {
    return axios.delete(`/ProjectField/${id}/delete`);
  }
};