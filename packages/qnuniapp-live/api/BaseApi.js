import { request } from './request';

export class BaseApi {
	/**
	 * 注册&登录
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1275
	 * @param {Object} data
	 */
	static signUpOrIn(data) {
		return request({
			url: "/v1/signUpOrIn",
			method: "POST",
			data
		})
	}
	
	/**
	 * 获取短信验证码
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/1276
	 * @param {Object} data
	 */
	static getSmsCode(data) {
		return request({
			url: "/v1/getSmsCode",
			method: "POST",
			data
		})
	}
}