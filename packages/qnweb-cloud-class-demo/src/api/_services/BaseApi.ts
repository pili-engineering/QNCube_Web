import {
  GetAccountInfoAccountIdParams, GetAccountInfoAccountIdResult,
  PostGetSmsCodeParams, PostGetSmsCodeResult,
  PostSignUpOrInParams, PostSignUpOrInResult,
  request,
} from '@/api';

export class BaseApi {
  /**
   * 获取短信验证码
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1276
   * @param params
   */
  static getSmsCodeApi(params: PostGetSmsCodeParams) {
    return request.post<PostGetSmsCodeResult, PostGetSmsCodeResult>('/v1/getSmsCode', params);
  }

  /**
   * 注册&登录
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1275
   * @param params
   */
  static signUpOrInApi(params: PostSignUpOrInParams) {
    return request.post<PostSignUpOrInResult, PostSignUpOrInResult>('/v1/signUpOrIn', params);
  }

  /**
   * 用户信息获取
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1278
   * @param params
   */
  static getAccountInfoApi(params?: GetAccountInfoAccountIdParams) {
    return request.get<GetAccountInfoAccountIdResult, GetAccountInfoAccountIdResult>('/v1/accountInfo', {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization')}`,
      },
    });
  }
}
