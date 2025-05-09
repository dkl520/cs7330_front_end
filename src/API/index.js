import { userApi } from './userApi';
import { mediaApi } from './mediaApi';
import { postApi } from './postApi';
import { repostApi } from './repostApi';
import { instituteApi } from './instituteApi';
import { projectApi } from './projectApi';
import { projectFieldApi } from './projectFieldApi';
import { analysisResultApi } from './analysisResultApi';
import { experimentApi } from './experimentApi';
import { projectPost } from './projectPostApi';
import { searchApi } from './searchApi'
// 创建一个统一的API对象
const api = {
  user: userApi,
  media: mediaApi,
  post: postApi,
  search: searchApi,
  projectPost: projectPost,
  analysisResult: analysisResultApi,
  repost: repostApi,
  institute: instituteApi,
  project: projectApi,
  projectField: projectFieldApi,
  experiment: experimentApi
};

export default api;