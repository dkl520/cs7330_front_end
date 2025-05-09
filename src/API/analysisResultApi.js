import axios from './axiosConfig';

export const analysisResultApi = {
  // 获取分析结果列表
  list: (params) => {
    return axios.get('/analysis_result', { params });
  },

  // 创建分析结果
  create: (data) => {
    return axios.post('/analysis_result/create', data);
  },

  // 更新分析结果
  update: (id, data) => {
    return axios.put(`/AnalysisResult/${id}/update`, data);
  },

  // 删除分析结果
  delete: (id) => {
    return axios.delete(`/AnalysisResult/${id}/delete`);
  }
};