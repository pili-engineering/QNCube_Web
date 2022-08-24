import { useCallback, useEffect, useRef, useState } from 'react';

import { PostBaseJoinRoomResult, RoomApi } from '@/api';
import { RoleValue } from '@/components';
import { useUserStore } from '@/store';

export type JoinResultData = Required<Required<PostBaseJoinRoomResult>['data']>;

export const useRoomApi = () => {
  const { state } = useUserStore();
  const [rtcInfo, setRtcInfo] = useState<JoinResultData['rtcInfo'] | null>();
  const [imConfig, setIMConfig] = useState<JoinResultData['imConfig'] | null>();
  const [allUserList, setAllUserList] = useState<JoinResultData['allUserList'] | null>();
  const [userInfo, setUserInfo] = useState<JoinResultData['userInfo'] | null>();
  const [roomInfo, setRoomInfo] = useState<JoinResultData['roomInfo'] | null>();
  const [userExtension, setUserExtension] = useState<string | null>();

  const [heartbeatEnabled, setHeartbeatEnabled] = useState<boolean>(false);
  const mountedRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timer>();

  const roomId = roomInfo?.roomId || '';

  /**
   * 页面挂载/卸载
   */
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /**
   * 心跳
   */
  useEffect(() => {
    const run = () => {
      RoomApi.baseHeartBeatApi({
        roomId
      }).then(result => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(run, result.data?.interval || 0);
      });
    };
    if (!heartbeatEnabled) return;
    run();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [heartbeatEnabled, roomId]);

  /**
   * 加入房间
   */
  const join = useCallback((params: {
    roomId: string;
    role: RoleValue
  }) => {
    const { roomId, role } = params;
    return RoomApi.baseJoinRoomApi({
      roomId,
      params: [
        { key: 'role', value: role }
      ]
    }).then(result => {
      const { rtcInfo, imConfig: imConfigOfResult, allUserList, userInfo, roomInfo } = result.data || {};
      const imConfig = {
        ...state.imConfig,
        imGroupId: imConfigOfResult?.imGroupId,
      } as JoinResultData['imConfig'];
      const userExtension = JSON.stringify({
        uid: userInfo?.userId || '',
        userExtRoleType: role,
        userExtProfile: {
          name: userInfo?.nickname || '',
          avatar: userInfo?.avatar || ''
        },
        userExtensionMsg: '',
      });
      if (mountedRef.current) {
        setRtcInfo(rtcInfo);
        setIMConfig(imConfig);
        setAllUserList(allUserList);
        setUserInfo(userInfo);
        setRoomInfo(roomInfo);
        setUserExtension(userExtension);
      }
      return {
        rtcInfo, imConfig, allUserList,
        userInfo, roomInfo, userExtension,
      };
    });
  }, [state.imConfig]);

  /**
   * 离开房间
   */
  const leave = useCallback(() => {
    if (!roomId) {
      return Promise.reject(new Error(`roomId is ${roomId}`));
    }
    return RoomApi.baseLeaveRoomApi({
      roomId
    }).then(result => {
      if (mountedRef.current) {
        setRtcInfo(null);
        setIMConfig(null);
        setAllUserList(null);
        setUserInfo(null);
        setRoomInfo(null);
        setUserExtension(null);
      }
      return result;
    });
  }, [roomId]);

  return {
    rtcInfo, imConfig, allUserList, userInfo, roomInfo, userExtension,
    join, leave, runHeartbeat: () => setHeartbeatEnabled(true)
  };
};
