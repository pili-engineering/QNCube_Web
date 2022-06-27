/**
 * uni跳转封装
 * 解决模拟器上无效问题:
 * @link https://ask.dcloud.net.cn/question/94616
 * @param {*} options 
 */
export function uniNavigateTo(options) {
	const { success, fail, ...restOptions } = options;
	return new Promise((resolve, reject) => {
		uni.navigateTo({
			success(result) {
				success && success(result);
				resolve(result);
			},
			fail(error) {
				fail && fail(error);
				reject(error);
			},
			...restOptions,
		})
	})
}

/**
 * uni modal弹窗
 * @param {*} options 
 */
export function uniShowModal(options) {
	const { success, fail, ...restOptions } = options;
	return new Promise((resolve, reject) => {
		uni.showModal({
			success(result) {
				success && success(result);
				resolve(result);
			},
			fail(error) {
				fail && fail(error);
				reject(error);
			},
			confirmText: '确定',
			cancelText: '取消',
			...restOptions,
		})
	})
}

/**
 * uni modal弹窗
 * @param {*} options 
 */
export function uniShowToast(options) {
	const { success, fail, ...restOptions } = options;
	return new Promise((resolve, reject) => {
		uni.showToast({
			success(result) {
				success && success(result);
				resolve(result);
			},
			fail(error) {
				fail && fail(error);
				reject(error);
			},
			icon: 'none',
			...restOptions,
		})
	})
}