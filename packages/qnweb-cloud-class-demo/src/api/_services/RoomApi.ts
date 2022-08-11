import {
  request,
  BaseCreateRoomApiResponseData,
  BaseCreateRoomApiRequestData,
  BaseJoinRoomApiRequestData,
  BaseJoinRoomApiResponseData,
  BaseListRoomApiRequestData,
  BaseListRoomApiResponseData,
  BaseHeartBeatApiRequestData,
  BaseHeartBeatApiResponseData,
  BaseGetRoomInfoApiRequestData,
  BaseGetRoomInfoApiResponseData,
  BaseUpMicApiRequestData,
  BaseUpMicApiResponseData,
  BaseUpdateRoomAttrApiRequestData,
  BaseUpdateRoomAttrApiResponseData,
  BaseUpdateMicAttrApiRequestData,
  BaseDownMicApiRequestData,
  BaseGetRoomMicInfoApiResponseData,
  BaseGetRoomMicInfoApiRequestData,
  BaseGetRoomAttrApiRequestData,
  BaseGetRoomAttrApiResponseData,
  BaseGetMicAttrApiRequestData,
  BaseGetMicAttrApiResponseData,
  BaseLeaveRoomApiRequestData
} from '@/api';

export const sceneType = 'classroom';

export class RoomApi {
  /**
   * 通用创建房间
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2283
   * @param params
   */
  static baseCreateRoomApi(params: Omit<BaseCreateRoomApiRequestData, 'type'>) {
    return request.post<BaseCreateRoomApiResponseData, BaseCreateRoomApiResponseData>(
      '/v1/base/createRoom',
      {
        ...params,
        type: sceneType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用加入房间
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2292
   * @param params
   */
  static baseJoinRoomApi(params: Omit<BaseJoinRoomApiRequestData, 'type'>) {
    return request.post<BaseJoinRoomApiResponseData, BaseJoinRoomApiResponseData>(
      '/v1/base/joinRoom',
      {
        ...params,
        type: sceneType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用离开房间
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2301
   * @param params
   */
  static baseLeaveRoomApi(params: Omit<BaseLeaveRoomApiRequestData, 'type'>) {
    return request.post(
      '/v1/base/leaveRoom',
      {
        ...params,
        type: sceneType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用房间列表
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2310
   * @param params
   */
  static baseListRoomApi(params: Omit<BaseListRoomApiRequestData, 'type'>) {
    return request.get<BaseListRoomApiResponseData, BaseListRoomApiResponseData>(
      '/v1/base/listRoom',
      {
        params: {
          ...params,
          type: sceneType,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用心跳
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2319
   * @param params
   */
  static baseHeartBeatApi(params: Omit<BaseHeartBeatApiRequestData, 'type'>) {
    return request.get<BaseHeartBeatApiResponseData, BaseHeartBeatApiResponseData>(
      '/v1/base/heartBeat',
      {
        params: {
          ...params,
          type: sceneType,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用获取完整房间信息
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2328
   * @param params
   */
  static baseGetRoomInfoApi(params: Omit<BaseGetRoomInfoApiRequestData, 'type'>) {
    const { roomId } = params;
    return request.get<BaseGetRoomInfoApiResponseData, BaseGetRoomInfoApiResponseData>(
      `/v1/base/getRoomInfo/${sceneType}/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用上麦接口
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2337
   * @param params
   */
  static baseUpMicApi(params: Omit<BaseUpMicApiRequestData, 'type'>) {
    return request.post<BaseUpMicApiResponseData, BaseUpMicApiResponseData>(
      '/v1/base/upMic',
      {
        ...params,
        type: sceneType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用更新房间属性
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2346
   * @param params
   */
  static baseUpdateRoomAttrApi(params: Omit<BaseUpdateRoomAttrApiRequestData, 'type'>) {
    return request.post<BaseUpdateRoomAttrApiResponseData, BaseUpdateRoomAttrApiResponseData>(
      '/v1/base/updateRoomAttr',
      {
        ...params,
        type: sceneType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用更新麦位属性
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2355
   * @param params
   */
  static baseUpdateMicAttrApi(params: Omit<BaseUpdateMicAttrApiRequestData, 'type'>) {
    return request.post(
      '/v1/base/updateMicAttr',
      {
        ...params,
        type: sceneType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用下麦接口
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2400
   * @param params
   */
  static baseDownMicApi(params: Omit<BaseDownMicApiRequestData, 'type'>) {
    return request.post(
      '/v1/base/downMic',
      {
        ...params,
        type: sceneType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用获取房间麦位列表自定义数据接口
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2409
   * @param params
   */
  static baseGetRoomMicInfoApi(params: Omit<BaseGetRoomMicInfoApiRequestData, 'type'>) {
    return request.get<BaseGetRoomMicInfoApiResponseData, BaseGetRoomMicInfoApiResponseData>(
      '/v1/base/getRoomMicInfo',
      {
        params: {
          ...params,
          type: sceneType,
        },
      },
    );
  }

  /**
   * 通用查询房间自定义属性值
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2418
   * @param params
   */
  static baseGetRoomAttrApi(params: Omit<BaseGetRoomAttrApiRequestData, 'type'>) {
    return request.get<BaseGetRoomAttrApiResponseData, BaseGetRoomAttrApiResponseData>(
      '/v1/base/getRoomAttr',
      {
        params: {
          ...params,
          type: sceneType,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }

  /**
   * 通用查询麦位自定义属性值
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2427
   * @param params
   */
  static baseGetMicAttrApi(params: Omit<BaseGetMicAttrApiRequestData, 'type'>) {
    return request.get<BaseGetMicAttrApiResponseData, BaseGetMicAttrApiResponseData>(
      '/v1/base/getMicAttr',
      {
        params: {
          ...params,
          type: sceneType,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
      },
    );
  }
}
