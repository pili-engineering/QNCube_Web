export class StorageApi {
	/**
	 * authorization存入缓存
	 * @param {Object} value
	 */
	static setAuthorization(value) {
		return uni.setStorageSync('authorization', value)
	}
	
	/**
	 * 缓存中读取authorization
	 */
	static getAuthorization() {
		const authorization = uni.getStorageSync('authorization');
		return authorization ? `Bearer ${authorization}` : "";
	}
	
	/**
	 * imConfig存入缓存
	 * @param {Object} value
	 */
	static setIMConfig(value) {
		return uni.setStorageSync('imConfig', value);
	}
	
	/**
	 * 缓存中读取imConfig
	 */
	static getIMConfig() {
		return uni.getStorageSync('imConfig');
	}
	
	/**
	 * 缓存中读取env
	 */
	static getEnv() {
		return uni.getStorageSync('env') || 'prod';
	}
	
	/**
	 * env存入缓存中
	 */
	static setEnv(value) {
		return uni.setStorageSync('env', value);
	}
	
	/**
	 * 缓存清空
	 */
	static clear() {
		return uni.clearStorageSync();
	}
}
