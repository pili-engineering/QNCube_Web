import request from './request';
import qs from 'qs';

export interface IMConfig {
  imGroupId?: number;
  imPassword?: string;
  imToken?: string;
  imUid?: string;
  imUsername?: string;
  type?: number;
}

export interface UserInfo {
  accountId: string;
  nickname: string;
  avatar: string;
  phone: string;
  loginToken: string;
  imConfig: {
    /**
     * IM TOKEN
     */
    imToken: string
    /**
     * IM类型枚举：https://cf.qiniu.io/pages/viewpage.action?pageId=63570443
     */
    type: number
    /**
     * 七牛IM登录用用户名
     */
    imUsername: string
    /**
     * 七牛IM登录用密码
     */
    imPassword: string
    /**
     * 七牛IM的UID
     */
    imUid: string
  }
}

export type BaseUserInfo = Omit<UserInfo, 'imConfig' | 'loginToken'> & {profile: string};

export interface AppConfig {
  welcome?: { image?: string; url?: string; extra: {[k: string]: string}}
}

export interface Scenes {
  total: number;
  nextId?: string;
  cnt: number;
  list: Array<{id: string; title: string; url: string; desc: string; icon: string;}>
}

/**
 * APP全局配置信息
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1279
 */
export const getAppConfig = () => {
  return request.get<AppConfig, AppConfig>('/v1/appConfig');
};

/**
 * 获取短信验证码
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1276
 * @param data
 */
export const getSmsCode = (data: Pick<UserInfo, 'phone'>) => {
  return request.post('/v1/getSmsCode', qs.stringify(data));
};

/**
 * 注册&登录
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1275
 * @param data
 */
export const signUpOrIn = (data: Pick<UserInfo, 'phone'> & {smsCode?: string}) => {
  return request.post<UserInfo, UserInfo>('/v1/signUpOrIn', qs.stringify(data));
};

/**
 * token登录
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1293
 */
export const signInWithToken = () => {
  return request.post<UserInfo, UserInfo>('/v1/signInWithToken', null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};

/**
 * 登出
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1277
 */
export const signOut = () => {
  return request.post('/v1/signOut', null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};

/**
 * 场景列表
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1280
 */
export const getScenes = () => {
  return request.get<Scenes, Scenes>('/v1/solution');
};

/**
 * 用户信息获取
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1278
 * @param params
 */
export const getAccountInfo = (params?: {accountId: string}) => {
  return request.get<BaseUserInfo, BaseUserInfo>('/v1/accountInfo', {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};

/**
 * 用户信息修改
 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1281
 * @param data
 */
export const updateAccountInfo = (data: {accountId?: string; nickname: string;}) => {
  const { accountId, ...reqData } = data;
  return request.post<BaseUserInfo, BaseUserInfo>(`/v1/accountInfo/${accountId}`, qs.stringify(reqData), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authorization')}`
    }
  });
};
