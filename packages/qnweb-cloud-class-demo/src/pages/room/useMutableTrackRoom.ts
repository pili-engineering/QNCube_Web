import {
  ClientRoleType, MutableTrackRoom, MutableTrackRoomSeat, RoomEntity,
} from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

type JoinStatus = 'notIn' | 'entering' | 'joined' | 'failed';

const log = (...data: any[]) => {
  window.console.log('useMutableTrackRoom', ...data);
};

const useMutableTrackRoom = (
  roomEntity: RoomEntity,
  userData: string,
  imJoinStatus: JoinStatus,
) => {
  const [seats, setSeats] = useState<MutableTrackRoomSeat[]>([]);
  const [mtRoom, setMtRoom] = useState<MutableTrackRoom | null>(null);
  const [joinState, setJoinState] = useState<JoinStatus>('notIn');

  /**
   * 实例化
   */
  useEffect(() => {
    if (!mtRoom) {
      setMtRoom(
        new MutableTrackRoom(),
      );
    }
  }, [mtRoom]);

  /**
   * 加入房间
   */
  useEffect(() => {
    if (
      mtRoom && imJoinStatus === 'joined' && roomEntity && userData
    ) {
      const micSeatListener = {
        onUserSitDown: (seat?: MutableTrackRoomSeat | null) => {
          log('onUserSitDown', seat);
          setSeats(mtRoom.mMicSeats.slice());
        },
        onUserSitUp: (seat: MutableTrackRoomSeat) => {
          log('onUserSitUp', seat);
          setSeats(mtRoom.mMicSeats.slice());
        },
        onCameraStatusChanged: (seat: MutableTrackRoomSeat) => {
          log('onCameraStatusChanged', seat);
          setSeats(mtRoom.mMicSeats.slice());
        },
        onMicrophoneStatusChanged: (seat: MutableTrackRoomSeat) => {
          log('onMicrophoneStatusChanged', seat);
          setSeats(mtRoom.mMicSeats.slice());
        },
      };
      mtRoom.addMicSeatListener(micSeatListener);
      mtRoom.setClientRoleType(
        ClientRoleType.CLIENT_ROLE_BROADCASTER,
      );
      mtRoom.joinRoom(roomEntity, JSON.parse(userData)).then(() => {
        setJoinState('joined');
      });
    }
  }, [mtRoom, imJoinStatus, JSON.stringify(roomEntity), userData, imJoinStatus]);

  return {
    mtRoom,
    seats,
    joinState,
  };
};

export default useMutableTrackRoom;
