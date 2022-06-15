import { request } from './request';
import { StorageApi } from './StorageApi';

const type = 'voiceChatRoom';

const makeRealData = data => {
	return Object.assign({ type }, data)
}

export class BaseRoomApi {
	/**
	 * 通用创建房间
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2283
	 * @param {Object} data
	 */
	static createRoom(data) {
		return request({
			url: "/v1/base/createRoom",
			method: "POST",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
	
	/**
	 * 通用加入房间
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2292
	 * @param {Object} data
	 */
	static joinRoom(data) {
		return request({
			url: "/v1/base/joinRoom",
			method: "POST",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		});
	}
	
	/**
	 * 通用离开房间
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2301
	 * @param {Object} data
	 */
	static leaveRoom(data) {
		return request({
			url: "/v1/base/leaveRoom",
			method: "POST",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
	
	/**
	 * 通用房间列表
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2310
	 * @param {Object} data
	 */
	static listRoom(data) {
		return request({
			url: "/v1/base/listRoom",
			method: "GET",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
	
	/**
	 * 通用心跳
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2319
	 * @param {Object} data
	 */
	static heartBeat(data) {
		return request({
			url: "/v1/base/heartBeat",
			method: "GET",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
	
	/**
	 * 通用下麦接口
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2400
	 * @param {Object} data
	 */
	static downMic(data) {
		return request({
			url: "/v1/base/downMic",
			method: "POST",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
	
	/**
	 * 通用上麦接口
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2337
	 * @param {Object} data
	 */
	static upMic(data) {
		return request({
			url: "/v1/base/upMic",
			method: "POST",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
	
	/**
	 * 通用获取房间麦位列表自定义数据接口
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2409
	 * @param {Object} data
	 */
	static getRoomMicInfo(data) {
		return request({
			url: "/v1/base/getRoomMicInfo",
			method: "GET",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
	
	/**
	 * 通用获取完整房间信息
	 * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2328
	 * @param {Object} data
	 */
	static getRoomInfo(data) {
		return request({
			url: "/v1/base/getRoomInfo",
			method: "GET",
			header: {
				Authorization: StorageApi.getAuthorization()
			},
			data: makeRealData(data)
		})
	}
}