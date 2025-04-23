import axios from './axiosConfig';

export const projectFieldApi = {
  // 获取项目字段列表
  list: (project_id) => {
    return axios.get(`/project_field?project_id=${project_id}`);
  },

  // 创建项目字段
  create: (data) => {
    return axios.post('/project_field/create', data);
  },

  // 更新项目字段
  update: (id, data) => {
    return axios.put(`/project_field/${id}`, data);
  },

  // 删除项目字段
  delete: (id) => {
    return axios.delete(`/project_field/${id}`);
  }
};