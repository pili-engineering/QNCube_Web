import { useEffect, useMemo, useState } from 'react';
import { message, Modal } from 'antd';
import { ClientRoleType } from 'qnweb-high-level-rtc';

import useInterviewApi from '@/hooks/useInterviewApi';
import { useIMStore, useRoomStore } from '@/store';

export const useJoinRoom = (interviewId?: string): {
  isJoined: boolean,
} & ReturnType<typeof useInterviewApi> => {
  const { state: imStoreState } = useIMStore();
  const imClient = useMemo(() => imStoreState.imClient, [imStoreState.imClient]);
  const { state: roomStoreState } = useRoomStore();
  const roomClient = useMemo(() => roomStoreState.roomClient, [roomStoreState.roomClient]);

  const { joinInterview, enableHeartBeat, ...restFromUseInterviewApi } = useInterviewApi();
  const [isJoined, setIsJoined] = useState(false);

  /**
   * 1. 加入面试房间
   * 2. im connect
   * 3. 设置角色，并加入rtc房间
   */
  useEffect(() => {
    const imUsername = imStoreState.imUsername;
    const imPassword = imStoreState.imPassword;
    if (interviewId && imUsername && imPassword && roomClient && imClient) {
      const hide = message.loading('房间初始化中', 0);
      joinInterview({
        interviewId,
      }).then(result => {
        const imGroupId = `${result.imConfig?.imGroupId || ''}`;
        roomClient.setClientRoleType(ClientRoleType.CLIENT_ROLE_BROADCASTER);
        return imClient.connect({
          name: imUsername,
          password: imPassword
        }).then(() => {
          return roomClient.joinRoom({
            roomToken: result.roomToken,
            imGroupId,
          });
        });
      }).then(() => {
        console.log('useJoinRoom joinIMAndRTC after');
        setIsJoined(true);
      }).then(() => {
        message.success(`房间初始化成功`);
      }).catch((error => {
        message.error(`房间初始化失败：${JSON.stringify(error)}`);
      })).finally(() => {
        hide();
      });
      return () => {
        hide();
      };
    }
  }, [
    imClient, roomClient,
    imStoreState.imPassword,
    imStoreState.imUsername,
    interviewId, joinInterview
  ]);

  /**
   * 心跳监听
   */
  useEffect(() => {
    if (isJoined && interviewId) {
      enableHeartBeat(interviewId).then(() => {
        console.log('heart beat enabled');
      }).catch(error => {
        Modal.error({
          title: '心跳启动失败',
          content: `错误信息：${JSON.stringify(error)}`,
        });
      });
    }
  }, [enableHeartBeat, interviewId, isJoined]);

  return {
    joinInterview, enableHeartBeat,
    ...restFromUseInterviewApi,
    isJoined,
  };
};
