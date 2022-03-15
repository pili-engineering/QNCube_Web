import qs from 'qs';
import request from './request';
import { BaseUserInfo, IMConfig, UserInfo } from './common';

export interface BaseInterview {
  title: string;
  startTime: string;
  endTime: string;
  government: string;
  career: string;
  isAuth: boolean;
  authCode: string;
  isRecorded: boolean;
  candidateName: string;
  candidatePhone: string;
  interviewerName: string;
  interviewerPhone: string;
}

export interface Interview {
  statusCode: number;
  isRecorded: boolean;
  shareInfo: ShareInfo;
  startTime: number;
  candidateName: string;
  candidatePhone: string;
  candidateId: string;
  id: string;
  interviewerId: string;
  status: string;
  isAuth: boolean;
  interviewerPhone: string;
  endTime: number;
  goverment: string;
  role: string;
  interviewerName: string;
  authCode: string;
  options: Option[];
  career: string;
  title: string;
  roleCode: number;
}

export interface Option {
  type: number;
  title: string;
  requestUrl: string;
  method: string;
}

export interface ShareInfo {
  content: string;
  url: string;
  icon: string;
}

export interface Pagination {
  total: number;
  nextId: string;
  cnt: number;
}

export interface InterviewIdReq {
  interviewId: string;
}

export type InterviewIdRes = Pick<Interview, 'id'>;

interface Token {
  authorization?: string;
  interviewToken?: string;
}

// 获取localStorage缓存的token值

export function getLocalStorageToken(): Token {
  return {
    authorization: localStorage.getItem('authorization') || '',
    interviewToken: localStorage.getItem('interviewToken') || ''
  }
}


/**
 * 创建面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1283
 * @param data
 */
export const createInterview = (data: BaseInterview) => {
  return request.post<InterviewIdRes, InterviewIdRes>(`/v1/interview`, qs.stringify(data), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};

/**
 * 面试详情
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1284
 * @param data
 */
export const getInterview = (params: InterviewIdReq) => {
  const { interviewToken, authorization } = getLocalStorageToken();
  let reqData = {};
  let headers = {};
  if (interviewToken) {
    reqData = Object.assign({}, params, {
      interviewToken
    });
  } else if (authorization) {
    headers = Object.assign({}, headers, {
      Authorization: `Bearer ${authorization}`
    });
  }
  return request.get<Partial<Interview>, Partial<Interview>>(`/v1/interview/${params.interviewId}`, {
    headers,
    params: reqData
  });
};

export type GetInterviewListRes = Pagination & {list: Interview[]};

/**
 * 面试列表
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1282
 */
export const getInterviewList = (params: {pageNum?: number; pageSize?: number}) => {
  return request.get<GetInterviewListRes, GetInterviewListRes>('/v1/interview', {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};

/**
 * 修改面试（不能修改面试状态）
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1292
 * @param data
 */
export const updateInterview = (data: InterviewIdReq & BaseInterview) => {
  const { interviewId, ...reqData } = data;
  return request.post<InterviewIdRes, InterviewIdRes>(`/v1/interview/${interviewId}`, qs.stringify(reqData), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};

/**
 * 结束面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1287
 * @param data
 */
export const endInterview = (data: InterviewIdReq) => {
  const { interviewToken, authorization } = getLocalStorageToken();
  const { interviewId, ...restData } = data;
  let reqData = restData;
  let headers = {};
  if (interviewToken) {
    reqData = Object.assign({}, restData, {
      interviewToken
    });
  } else if (authorization) {
    headers = Object.assign({}, headers, {
      Authorization: `Bearer ${authorization}`
    });
  }
  return request.post<InterviewIdRes, InterviewIdRes>(`/v1/endInterview/${interviewId}`, qs.stringify(reqData), {
    headers
  });
};

/**
 * 取消面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1288
 * @param data
 */
export const cancelInterview = (data: InterviewIdReq) => {
  const { interviewId, ...reqData } = data;
  return request.post<InterviewIdRes, InterviewIdRes>(`/v1/cancelInterview/${interviewId}`, qs.stringify(reqData), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};

export type JoinInterviewRes = {
  interview: Interview;
  userInfo: BaseUserInfo;
  roomToken: string;
  onlineUserList: BaseUserInfo[];
  allUserList: BaseUserInfo[];
  imConfig?: IMConfig;
} & Pick<UserInfo, 'imConfig'>;

/**
 * 进入面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1289
 * @param data
 */
export const joinInterview = (data: InterviewIdReq) => {
  const { interviewId, ...restData } = data;
  const { interviewToken, authorization } = getLocalStorageToken();
  let reqData = restData;
  let headers = {};
  if (interviewToken) {
    reqData = Object.assign({}, restData, {
      interviewToken
    });
  } else if (authorization) {
    headers = Object.assign({}, headers, {
      Authorization: `Bearer ${authorization}`
    });
  }
  return request.post<JoinInterviewRes, JoinInterviewRes>(`/v1/joinInterview/${interviewId}`, qs.stringify(reqData), {
    headers
  });
};

/**
 * 退出面试
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1290
 * @param data
 */
export const leaveInterview = (data: InterviewIdReq) => {
  const { interviewId, ...restData } = data;
  const { interviewToken, authorization } = getLocalStorageToken();
  let reqData = restData;
  let headers = {};
  if (interviewToken) {
    reqData = Object.assign({}, restData, {
      interviewToken
    });
  } else if (authorization) {
    headers = Object.assign({}, headers, {
      Authorization: `Bearer ${authorization}`
    });
  }
  return request.post(`/v1/leaveInterview/${interviewId}`, qs.stringify(reqData), {
    headers
  });
};

export type HeartBeatInterviewRes = {interval: number} & Pick<JoinInterviewRes, 'onlineUserList'> & {
  options: {
    showLeaveInterview: boolean
  }
}

/**
 * 面试房间内心跳
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1291
 * @param data
 */
export const heartBeatInterview = (params: InterviewIdReq) => {
  const { interviewToken, authorization } = getLocalStorageToken();
  let reqData = {};
  let headers = {};
  if (interviewToken) {
    reqData = Object.assign({}, params, {
      interviewToken
    });
  } else if (authorization) {
    headers = Object.assign({}, headers, {
      Authorization: `Bearer ${authorization}`
    });
  }
  return request.get<HeartBeatInterviewRes, HeartBeatInterviewRes>(`/v1/heartBeat/${params.interviewId}`, {
    headers,
    params: reqData
  });
};