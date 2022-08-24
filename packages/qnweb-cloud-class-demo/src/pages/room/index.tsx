import React, { useEffect, useRef, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { Spin } from 'antd';
import { QNRTMAdapter, RtmManager } from 'qnweb-high-level-rtc';

import { getUrlQueryParams } from '@/utils';
import { CloudClassType, RoleValue } from '@/components';
import { curConfig } from '@/config';
import { useRoomApi } from './_hooks';
import { SmallRoom } from './small';
import { OneToOneRoom } from './one-to-one';

interface RouteQuery {
  roomId: string;
  role: RoleValue;
}

export type BaseRoomProps = RouteQuery & Omit<ReturnType<typeof useRoomApi>, 'join' | 'leave' | 'runHeartbeat'> & {
  imClient: QNRTMAdapter | null
};

export const Room: React.FC = () => {
  const queryRef = useRef<RouteQuery>({
    roomId: getUrlQueryParams('roomId') || '',
    role: getUrlQueryParams('role') as RoleValue
  });
  const { roomId, role } = queryRef.current;
  const {
    rtcInfo, imConfig, allUserList, userInfo, roomInfo, userExtension,
    join, leave, runHeartbeat
  } = useRoomApi();
  const [imClient, setIMClient] = useState<QNRTMAdapter | null>(null);
  const [roomType, setRoomType] = useState<CloudClassType>();
  const [loading, setLoading] = useState<boolean>(true);

  const baseRoomProps = {
    roomId,
    role,
    rtcInfo,
    imConfig,
    allUserList,
    userInfo,
    roomInfo,
    userExtension,
    loading,
    imClient
  };


  /**
   * 实例化imClient
   */
  useEffect(() => {
    const appKey = curConfig.imConfig.appKey;
    if (!appKey) return;
    const imAdapter = RtmManager.setRtmAdapter(
      new QNRTMAdapter(appKey),
    ).getRtmAdapter<QNRTMAdapter>();
    setIMClient(imAdapter);
  }, [imConfig]);

  useMount(() => {
    join({
      roomId,
      role
    }).then(result => {
      const roomInfoParams = result.roomInfo?.params || [];
      const roomType = roomInfoParams.find(
        item => item.key === 'classType'
      )?.value as CloudClassType;
      setRoomType(roomType);
      runHeartbeat();
    }).finally(() => {
      setLoading(false);
    });
  });

  useUnmount(() => {
    leave();
  });

  if (roomType === CloudClassType.Small) {
    return <SmallRoom {...baseRoomProps}/>;
  }
  if (roomType === CloudClassType.OneToOne) {
    return <OneToOneRoom {...baseRoomProps}/>;
  }
  return <Spin
    spinning={true}
    style={{ position: 'fixed', left: '50%', top: '50%', transform: `translate(-50%, -50%)` }}
    tip="房间初始化中..."
  />;
};

