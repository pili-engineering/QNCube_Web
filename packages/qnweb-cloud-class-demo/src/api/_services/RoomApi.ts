import {
  GetBaseGetMicAttrParams, GetBaseGetMicAttrResult,
  GetBaseGetRoomAttrParams, GetBaseGetRoomAttrResult,
  GetBaseGetRoomInfoParams, GetBaseGetRoomInfoResult,
  GetBaseGetRoomMicInfoParams, GetBaseGetRoomMicInfoResult,
  GetBaseHeartBeatParams, GetBaseHeartBeatResult,
  PostBaseCreateRoomParams, PostBaseCreateRoomResult,
  PostBaseDownMicParams, PostBaseDownMicResult,
  PostBaseJoinRoomParams, PostBaseJoinRoomResult,
  PostBaseLeaveRoomParams, PostBaseLeaveRoomResult,
  PostBaseUpdateMicAttrParams, PostBaseUpdateMicAttrResult,
  PostBaseUpdateRoomAttrParams, PostBaseUpdateRoomAttrResult,
  PostBaseUpMicParams, PostBaseUpMicResult,
  request
} from '@/api';

export const sceneType = 'classroom';

export class RoomApi {
  /**
   * 通用创建房间
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2283
   * @param params
   */
  static baseCreateRoomApi(params: Omit<PostBaseCreateRoomParams, 'type'>) {
    return request.post<PostBaseCreateRoomResult, PostBaseCreateRoomResult>(
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
  static baseJoinRoomApi(params: Omit<PostBaseJoinRoomParams, 'type'>) {
    return request.post<PostBaseJoinRoomResult, PostBaseJoinRoomResult>(
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
  static baseLeaveRoomApi(params: Omit<PostBaseLeaveRoomParams, 'type'>) {
    return request.post<PostBaseLeaveRoomResult, PostBaseLeaveRoomResult>(
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
   * 通用心跳
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2319
   * @param params
   */
  static baseHeartBeatApi(params: Omit<GetBaseHeartBeatParams, 'type'>) {
    return request.get<GetBaseHeartBeatResult, GetBaseHeartBeatResult>(
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
  static baseGetRoomInfoApi(params: Omit<GetBaseGetRoomInfoParams, 'type'>) {
    return request.get<GetBaseGetRoomInfoResult, GetBaseGetRoomInfoResult>(
      `/v1/base/getRoomInfo`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorization')}`,
        },
        params: {
          type: sceneType,
          ...params,
        }
      },
    );
  }

  /**
   * 通用上麦接口
   * @link http://pili-yapi.aslan.qa.qiniu.io/project/51/interface/api/2337
   * @param params
   */
  static baseUpMicApi(params: Omit<PostBaseUpMicParams, 'type'>) {
    return request.post<PostBaseUpMicResult, PostBaseUpMicResult>(
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
  static baseUpdateRoomAttrApi(params: Omit<PostBaseUpdateRoomAttrParams, 'type'>) {
    return request.post<PostBaseUpdateRoomAttrResult, PostBaseUpdateRoomAttrResult>(
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
  static baseUpdateMicAttrApi(params: Omit<PostBaseUpdateMicAttrParams, 'type'>) {
    return request.post<PostBaseUpdateMicAttrResult, PostBaseUpdateMicAttrResult>(
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
  static baseDownMicApi(params: Omit<PostBaseDownMicParams, 'type'>) {
    return request.post<PostBaseDownMicResult, PostBaseDownMicResult>(
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
  static baseGetRoomMicInfoApi(params: Omit<GetBaseGetRoomMicInfoParams, 'type'>) {
    return request.get<GetBaseGetRoomMicInfoResult, GetBaseGetRoomMicInfoResult>(
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
  static baseGetRoomAttrApi(params: Omit<GetBaseGetRoomAttrParams, 'type'>) {
    return request.get<GetBaseGetRoomAttrResult, GetBaseGetRoomAttrResult>(
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
  static baseGetMicAttrApi(params: Omit<GetBaseGetMicAttrParams, 'type'>) {
    return request.get<GetBaseGetMicAttrResult, GetBaseGetMicAttrResult>(
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
