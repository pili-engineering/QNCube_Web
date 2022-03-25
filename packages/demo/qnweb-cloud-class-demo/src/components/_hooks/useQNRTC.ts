import {
  ClientRoleType, MutableTrackRoom, MutableTrackRoomSeat, RoomEntity,
} from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

export interface UserExtProfile {
  avatar?: string;
  name?: string;
}

export interface UserExtension {
  uid?: string;
  userExtRoleType?: 'teacher' | 'student';
  userExtProfile?:UserExtProfile;
  userExtensionMsg?: string;
}

/**
 * notIn: 未加入, entering: 加入中, joined: 已加入, failed: 加入失败
 */
export type RtcJoinState = 'notIn' | 'entering' | 'joined' | 'failed';

const useQNRTC = (config: RoomEntity, userExtension?: UserExtension) => {
  const [rtcClient, setRtcClient] = useState<MutableTrackRoom | null>(null);
  const [seats, setSeats] = useState<MutableTrackRoomSeat[]>([]);
  const [joinState, setJoinState] = useState<RtcJoinState>('notIn');

  /**
   * 实例化
   */
  useEffect(() => {
    if (!rtcClient) {
      const client = new MutableTrackRoom();
      client.setClientRoleType(
        ClientRoleType.CLIENT_ROLE_BROADCASTER,
      );
      setRtcClient(client);
    }
  }, [rtcClient]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (config.roomToken && rtcClient && userExtension) {
      setJoinState('entering');
      const micSeatListener = {
        onUserSitDown: (seat?: MutableTrackRoomSeat | null) => {
          console.log('onUserSitDown', seat);
          setSeats((prevSeats) => prevSeats.concat(seat || []));
        },
        onUserSitUp: (seat: MutableTrackRoomSeat) => {
          console.log('onUserSitUp', seat);
          setSeats(
            (prevSeats) => prevSeats.filter(
              (s) => s.uid !== seat?.uid,
            ),
          );
        },
        onCameraStatusChanged: (seat: MutableTrackRoomSeat) => {
          console.log('onCameraStatusChanged', seat);
          setSeats(
            (prevSeats) => prevSeats.map(
              (s) => (
                s.uid === seat?.uid ? seat : s
              ),
            ),
          );
        },
        onMicrophoneStatusChanged: (seat: MutableTrackRoomSeat) => {
          console.log('onMicrophoneStatusChanged', seat);
          setSeats(
            (prevSeats) => prevSeats.map(
              (s) => (
                s.uid === seat?.uid ? seat : s
              ),
            ),
          );
        },
      };
      rtcClient.addMicSeatListener(micSeatListener);
      rtcClient.joinRoom({
        roomToken: config.roomToken,
      }, userExtension).then(() => {
        setJoinState('joined');
      }).catch(() => {
        setJoinState('failed');
      });
      return () => {
        rtcClient.removeMicSeatListener(micSeatListener);
      };
    }
  }, [config.roomToken, rtcClient, JSON.stringify(userExtension)]);

  return {
    rtcClient,
    seats,
    joinState,
  };
};

export default useQNRTC;
