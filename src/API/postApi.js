import axios from './axiosConfig';

export const postApi = {
  // 获取帖子列表
  list: () => {
    return axios.get('/post');
  },

  getListById: (user_id, media_id) => {
    return axios.get(`/post?user_id=${user_id}&media_id=${media_id}`);
  },
  // getPostById: (post_id) => {
  //   return axios.get(`/post?post_id=${post_id}`);
  // },
  getAvailablePosts: (user_id, media_id) => {
    return axios.get(`/get_available_posts?user_id=${user_id}&media_id=${media_id}`);
  },
  // 通过projct id 获取帖子id
  getPorjectPost: (project_id) => {
    return axios.get(`/project_post?project_id=${project_id}`);
  },

  getPostBatchById: (ids, ins) => {
    return axios.get('/post_batch', { params: { post_ids: ids, in: ins } })
  },

  getOtherPostsByProjectId: (project_id) => {
    return axios.get(`/get_available_posts?user_id=${user_id}&media_id=${media_id}`);
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
  getReposts: (user_id) => {
    return axios.get(`/repost?user_id=${user_id}`);
  },

  // 创建转发
  createRepost: (data) => {
    return axios.post('/repost/create', data);
  },
  // 批量转发
  // {
  //   user_id: 42,            // 当前用户
  //   post_ids: [201, 202, 203, 204]  // 选择要转发的帖子 ID
  // };
  bulk_repost: (data) => {
    return axios.post('/repost/bulk_repost', data);
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