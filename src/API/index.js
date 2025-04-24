import { userApi } from './userApi';
import { mediaApi } from './mediaApi';
import { postApi } from './postApi';
import { repostApi } from './repostApi';
import { instituteApi } from './instituteApi';
import { projectApi } from './projectApi';
import { projectFieldApi } from './projectFieldApi';
// import { projectPostApi } from './projectPostApi';
import { analysisResultApi } from './analysisResultApi';
import { experimentApi } from './experimentApi';
import { projectPostApi } from './projectPostApi';
import analysisResultApi from './analysisResultApi';
// 创建一个统一的API对象
const api = {
  user: userApi,
  media: mediaApi,
  post: postApi,
  projectPost: projectPostApi,
  analysisResult: analysisResultApi,
  repost: repostApi,
  institute: instituteApi,
  project: projectApi,
  projectField: projectFieldApi,
  //   projectPost: projectPostApi,
  analysisResult: analysisResultApi,
  experiment: experimentApi
};

export default api;