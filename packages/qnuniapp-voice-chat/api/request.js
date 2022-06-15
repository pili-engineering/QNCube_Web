import { uniNavigateTo, uniShowModal } from '@/utils';
import { StorageApi } from './StorageApi';

// 多环境配置
export const config = {
	dev: {
		title: '测试环境',
		baseURL: "http://10.200.20.28:5080"
	},
	prod: {
		title: '生产环境',
		baseURL: "https://niucube-api.qiniu.com"
	}
}

/**
 * 请求封装
 * @param {*} options 
 */
export function request(options) {
	const { success, fail, url, ...restOptions } = options;
	const baseURL = config[StorageApi.getEnv()].baseURL;
	return new Promise((resolve, reject) => {
		const wholeUrl = baseURL + url;
		uni.request({
			url: wholeUrl,
			success(result) {
				console.log(`uni.request ${wholeUrl} success`, result)
				if (result.data.code === 0) {
					resolve(result.data);	
				} else {
					if ([401001, 401003].includes(result.data.code)) {
						uniShowModal({
							content: '登录态失效，点击确认重新登录',
							showCancel: false,
							success() {
								StorageApi.clear();
								uniNavigateTo({
									url: '/pages/login/login'
								})
							},
						})
					} else {
						uniShowModal({
							content: result.data.message,
							showCancel: false,
						})
					}
					reject(new TypeError(result.data.message))
				}
				success && success(result);
			},
			fail(error) {
				console.log(`uni.request ${wholeUrl} fail`, error)
				fail && fail(error);
				reject(error);
			},
			...restOptions
		})
	})
}