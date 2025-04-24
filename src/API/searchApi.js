
import axios from './axiosConfig';

export const searchApi = {
  
  PostSearch: (params) => {
    return axios.get(`/query/post`, { params })
  },
  experSearch: (params) => {
    return axios.get(`/query/experiment`, { params })
  },

};