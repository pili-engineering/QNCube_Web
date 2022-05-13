import { useCallback, useState } from 'react';
import * as BaseRoomApi from '@/api/BaseRoomApi';
import { BaseJoinRoomApiResponseData } from '@/api/BaseRoomApi';

const useRoomJoin = () => {
  const [roomInfo, setRoomInfo] = useState<BaseJoinRoomApiResponseData['roomInfo']>();
  const [rtcInfo, setRtcInfo] = useState<BaseJoinRoomApiResponseData['rtcInfo']>();
  const [allUserList, setAllUserList] = useState<BaseJoinRoomApiResponseData['allUserList']>();
  const [userInfo, setUserInfo] = useState<BaseJoinRoomApiResponseData['userInfo']>();
  const [imConfig, setImConfig] = useState<BaseJoinRoomApiResponseData['imConfig']>();

  /**
   * 创建房间
   */
  const createRoomApi = useCallback((title: string) => {
    return BaseRoomApi.baseCreateRoomApi({
      title,
    });
  }, []);

  /**
   * 加入房间
   */
  const joinRoomApi = useCallback((roomId: string) => {
    return BaseRoomApi.baseJoinRoomApi({
      roomId,
    }).then(result => {
      setRoomInfo(result.roomInfo);
      setRtcInfo(result.rtcInfo);
      setAllUserList(result.allUserList);
      setUserInfo(result.userInfo);
      setImConfig(result.imConfig);
      return result;
    });
  }, []);

  /**
   * 创建并加入房间
   */
  const createAndJoinRoomApi = useCallback((title: string) => {
    return createRoomApi(title).then(result => {
      return joinRoomApi(result.roomInfo?.roomId || '');
    });
  }, [joinRoomApi, createRoomApi]);

  return {
    roomInfo,
    rtcInfo,
    allUserList,
    userInfo,
    imConfig,
    createRoomApi,
    joinRoomApi,
    createAndJoinRoomApi,
  };
};

export default useRoomJoin;
