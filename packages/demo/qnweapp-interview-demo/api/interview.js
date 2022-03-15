import request from './request';
import store from '../store/index';

const getReqHeader = () => {
  const header = {};
  const { loginToken } = store?.userInfo || {};
  if (loginToken) header.Authorization = `Bearer ${loginToken}`; 
  return header;
}

/**
 * 面试列表
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1282
 * @param {*} data 
 */
export const getInterviewListApi = data => {
  const header = getReqHeader();
  return request({
    url: '/v1/interview',
    header,
    data
  });
}

/**
 * 创建面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1283
 * @param {*} data 
 */
export const createInterviewApi = data => {
  const header = getReqHeader();
  return request({
    url: '/v1/interview',
    method: 'POST',
    data,
    header
  });
}

/**
 * 面试详情
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1284
 * @param {*} data 
 */
export const getInterviewDetailApi = data => {
  const header = getReqHeader();
  const { interviewToken } = store;
  if (interviewToken) {
    return request({
      url: `/v1/interview/${data.interviewId}`,
      data: { interviewToken }
    });
  }
  return request({
    url: `/v1/interview/${data.interviewId}`,
    header
  });
}

/**
 * 修改面试（不能修改面试状态）
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1292
 * @param {*} data 
 */
export const updateInterviewApi = data => {
  const header = getReqHeader();
  const { interviewId, ...reqData } = data;
  return request({
    url: `/v1/interview/${interviewId}`,
    method: 'POST',
    header,
    data: reqData
  });
}

/**
 * 取消面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1288
 * @param {*} data 
 */
export const cancelInterviewApi = data => {
  const header = getReqHeader();
  const { interviewId, ...reqData } = data;
  return request({
    url: `/v1/cancelInterview/${interviewId}`,
    data: reqData,
    method: 'POST',
    header
  });
}

/**
 * 进入面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1289
 * @param {*} data 
 */
export const joinInterviewApi = data => {
  const header = getReqHeader();
  const { interviewToken } = store;
  if (interviewToken) {
    return request({
      url: `/v1/joinInterview/${data.interviewId}`,
      method: 'POST',
      data: { interviewToken }
    });
  }
  return request({
    url: `/v1/joinInterview/${data.interviewId}`,
    header,
    method: 'POST'
  });
}

/**
 * 退出面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1290
 * @param {*} data 
 */
export const leaveInterviewApi = data => {
  const header = getReqHeader();
  const { interviewToken } = store;
  if (interviewToken) {
    return request({
      url: `/v1/leaveInterview/${data.interviewId}`,
      method: 'POST',
      data: { interviewToken }
    });
  } 
  return request({
    url: `/v1/leaveInterview/${data.interviewId}`,
    method: 'POST',
    header
  });
}

/**
 * 结束面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1287
 * @param {*} data 
 */
export const endInterviewApi = data => {
  const header = getReqHeader();
  const { interviewToken } = store;
  if (interviewToken) {
    return request({
      url: `/v1/endInterview/${data.interviewId}`,
      method: 'POST',
      data: { interviewToken }
    });
  }
  return request({
    url: `/v1/endInterview/${data.interviewId}`,
    method: 'POST',
    header
  });
}

/**
 * 面试房间内心跳
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1291
 * @param {*} data 
 */
export const heartBeatApi = data => {
  const header = getReqHeader();
  const { interviewToken } = store;
  if (interviewToken) {
    return request({
      url: `/v1/heartBeat/${data.interviewId}`,
      loading: false,
      data: { interviewToken }
    });
  }
  return request({
    url: `/v1/heartBeat/${data.interviewId}`,
    header,
    loading: false
  });
}