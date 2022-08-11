import {
  AppConfig,
  BaseUserInfo,
  request,
  Scenes,
  UpdateAccountInfoApiData,
  UserInfo
} from '@/api';

export class BaseApi {
  /**
   * APP全局配置信息
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1279
   */
  static getAppConfigApi() {
    return request.get<AppConfig, AppConfig>('/v1/appConfig');
  }

  /**
   * 获取短信验证码
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1276
   * @param params
   */
  static getSmsCodeApi(params: Pick<UserInfo, 'phone'>) {
    return request.post('/v1/getSmsCode', params);
  }

  /**
   * 注册&登录
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1275
   * @param params
   */
  static signUpOrInApi(params: Pick<UserInfo, 'phone'> & { smsCode?: string }) {
    return request.post<UserInfo, UserInfo>('/v1/signUpOrIn', params);
  }

  /**
   * token登录
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1293
   */
  static signInWithTokenApi() {
    return request.post<UserInfo, UserInfo>(
      '/v1/signInWithToken',
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 登出
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1277
   */
  static signOutApi() {
    return request.post('/v1/signOut', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    });
  }

  /**
   * 场景列表
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1280
   */
  static getScenesApi() {
    return request.get<Scenes, Scenes>('/v1/solution');
  }

  /**
   * 用户信息获取
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1278
   * @param params
   */
  static getAccountInfoApi(params?: { accountId: string }) {
    return request.get<BaseUserInfo, BaseUserInfo>('/v1/accountInfo', {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    });
  }

  /**
   * 用户信息修改
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1281
   * @param params
   */
  static updateAccountInfoApi(params: UpdateAccountInfoApiData) {
    const { accountId, ...rest } = params;
    return request.post<BaseUserInfo, BaseUserInfo>(`/v1/accountInfo/${accountId}`, rest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    });
  }
}
