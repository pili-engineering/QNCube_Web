import { useEffect, useState } from 'react';
import {
  ClientRoleType, MutableTrackRoom, MutableTrackRoomSeat, RoomEntity,
} from 'qnweb-high-level-rtc';
import { message } from 'antd';
import { getUrlParam } from '../utils';
import { Role } from '../api';
import { StreamType } from '../pages/room';

const useMutableRoomInit = (
  serverRoomJoined: boolean,
  roomEntity?: RoomEntity,
) => {
  const [mtRoom, setMtRoom] = useState<MutableTrackRoom>();
  const [mtRoomJoined, setMtRoomJoined] = useState(false);
  const [seats, setSeats] = useState<MutableTrackRoomSeat[]>([]);
  const role = getUrlParam<Role>('role');
  const streamType = getUrlParam<StreamType>('streamType');

  useEffect(() => {
    if (serverRoomJoined && !mtRoom && streamType === StreamType.Rtc) {
      const room = new MutableTrackRoom();
      setMtRoom(room);
    }
  }, [serverRoomJoined, mtRoom, role, streamType]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const micSeatListener = {
      onUserSitDown: () => {
        setSeats(mtRoom?.mMicSeats || []);
      },
      onUserSitUp: () => {
        setSeats(mtRoom?.mMicSeats || []);
      },
      onCameraStatusChanged: () => {
        setSeats(mtRoom?.mMicSeats || []);
      },
      onMicrophoneStatusChanged: () => {
        setSeats(mtRoom?.mMicSeats || []);
      },
    };
    if (mtRoom) {
      mtRoom.addMicSeatListener(micSeatListener);
      return () => {
        mtRoom.removeMicSeatListener(micSeatListener);
      };
    }
  }, [mtRoom]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (mtRoom && roomEntity) {
      message.loading({
        key: 'rtc',
        content: 'rtc房间加入中...',
        duration: 0,
      });
      const userExtension = { userExtRoleType: role };
      mtRoom.setClientRoleType(ClientRoleType.CLIENT_ROLE_BROADCASTER);
      mtRoom.joinRoom(
        roomEntity,
        userExtension,
      ).then(() => {
        message.success({
          key: 'rtc',
          content: 'rtc房间加入成功',
        });
        setMtRoomJoined(true);
      }).catch((err) => {
        message.error({
          key: 'rtc',
          content: `rtc房间加入失败: ${JSON.stringify(err)}`,
        });
      });
    }
  }, [mtRoom, roomEntity, role]);

  return {
    mtRoomJoined,
    mtRoom,
    seats,
  };
};

export default useMutableRoomInit;
