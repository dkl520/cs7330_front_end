import axios from './axiosConfig';

export const projectPost = {


    create: (data) => {
        return axios.post('/project_post/create', data);
    },

    // 获取帖子详情
    bulkProjectPost: (data) => {
        return axios.post(`/project_post/bulk_project_post`, data);
    },
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


};