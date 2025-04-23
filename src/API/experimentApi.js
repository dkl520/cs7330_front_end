import axios from './axiosConfig';

export const experimentApi = {
  // 查询实验
  query: (params) => {
    return axios.get('/query/experiment/', { params });
  }
};