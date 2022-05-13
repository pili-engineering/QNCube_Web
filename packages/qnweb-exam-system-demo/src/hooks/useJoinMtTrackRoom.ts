import {
  ClientRoleType, MutableTrackRoom, RoomEntity, UserExtension,
} from 'qnweb-high-level-rtc';
import { useCallback, useState } from 'react';
import * as BaseRoomApi from '@/api/BaseRoomApi';
import { BaseJoinRoomApiResponseData } from '@/api/BaseRoomApi';

interface BaseParams extends RoomEntity {
  room?: MutableTrackRoom | null;
  clientRoleType?: ClientRoleType;
  userExtension?: UserExtension;
}

interface JoinParams extends BaseParams {
  roomId: string;
}

interface CreateParams extends BaseParams {
  title: string;
}

const useJoinMtTrackRoom = () => {
  const [roomInfo, setRoomInfo] = useState<BaseJoinRoomApiResponseData['roomInfo']>();
  const [rtcInfo, setRtcInfo] = useState<BaseJoinRoomApiResponseData['rtcInfo']>();
  const [allUserList, setAllUserList] = useState<BaseJoinRoomApiResponseData['allUserList']>();
  const [userInfo, setUserInfo] = useState<BaseJoinRoomApiResponseData['userInfo']>();
  const [imConfig, setImConfig] = useState<BaseJoinRoomApiResponseData['imConfig']>();

  /**
   * 加入房间
   */
  const joinRoom = useCallback((params: JoinParams) => {
    const {
      roomId, room, userExtension, clientRoleType,
    } = params;
    if (!room) {
      throw new Error('joinRoom: room is required');
    }
    room.setClientRoleType(clientRoleType || ClientRoleType.CLIENT_ROLE_BROADCASTER);
    return BaseRoomApi.baseJoinRoomApi({
      roomId,
    }).then((result) => {
      setRoomInfo(result.roomInfo);
      setRtcInfo(result.rtcInfo);
      setAllUserList(result.allUserList);
      setUserInfo(result.userInfo);
      setImConfig(result.imConfig);
      return room?.joinRoom({
        roomToken: result.rtcInfo?.roomToken,
        roomId: result.roomInfo?.roomId,
        pushUri: result.rtcInfo?.publishUrl,
        pullUri: result.rtcInfo?.flvPlayUrl,
        imGroupId: `${result.imConfig?.imGroupId}`,
      }, userExtension);
    });
  }, []);

  /**
   * 创建房间
   */
  const createRoom = useCallback((params: CreateParams) => {
    const { title } = params;
    return BaseRoomApi.baseCreateRoomApi({
      title,
    });
  }, []);

  /**
   * 创建并加入
   */
  const createAndJoinRoom = useCallback((params: CreateParams) => {
    const { room } = params;
    if (!room) {
      throw new Error('createAndJoinRoom: room is required');
    }
    return createRoom(params).then((result) => joinRoom({
      room: params.room,
      roomId: result.roomInfo?.roomId || '',
      clientRoleType: params.clientRoleType,
      userExtension: params.userExtension,
    }));
  }, [createRoom, joinRoom]);

  return {
    roomInfo,
    rtcInfo,
    allUserList,
    userInfo,
    imConfig,
    joinRoom,
    createRoom,
    createAndJoinRoom,
  };
};

export default useJoinMtTrackRoom;
