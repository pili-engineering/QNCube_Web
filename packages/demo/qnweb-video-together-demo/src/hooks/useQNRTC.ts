import { LazyTrackRoom, LazyTrackRoomSeat } from 'qnweb-high-level-rtc';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { UserStoreContext } from '../store/UserStore';
import { baseGetRoomMicInfoApi } from '../api/baseRoomApi';

export interface UserExtProfile {
  avatar?: string;
  name?: string;
}

export interface UserExtension {
  uid?: string;
  userExtRoleType?: 'teacher' | 'student';
  userExtProfile?: UserExtProfile;
  userExtensionMsg?: string;
}

/**
 * notIn: 未加入, entering: 加入中, joined: 已加入, failed: 加入失败
 */
export type RtcJoinState = 'notIn' | 'entering' | 'joined' | 'failed';

const log = (...data: any[]) => {
  window.console.log('useQNRTC', ...data);
};

const useQNRTC = (
  roomToken: string | null | undefined,
  roomId: string | null | undefined,
  imGroupId: string,
  enableJoin: boolean,
) => {
  const { state } = useContext(UserStoreContext);
  const [rtcClient, setRtcClient] = useState<LazyTrackRoom | null>(null);
  const [seats, setSeats] = useState<LazyTrackRoomSeat[]>([]);
  const [joinState, setJoinState] = useState<RtcJoinState>('notIn');
  const stateUserInfo = useMemo(() => state.userInfo, [state.userInfo]);

  /**
   * 实例化
   */
  useEffect(() => {
    if (!rtcClient) {
      const client = new LazyTrackRoom();
      setRtcClient(client);
    }
  }, [rtcClient]);

  /**
   * 麦位监听
   */
  useEffect(() => {
    if (rtcClient) {
      const micSeatListener = {
        onUserSitDown: (seat?: LazyTrackRoomSeat | null) => {
          log('onUserSitDown', seat);
          setSeats(rtcClient.mMicSeats);
        },
        onUserSitUp: (seat?: LazyTrackRoomSeat | null) => {
          log('onUserSitUp', seat);
          setSeats(rtcClient.mMicSeats);
        },
        onCameraStatusChanged: (seat?: LazyTrackRoomSeat | null) => {
          log('onCameraStatusChanged', seat);
          setSeats(rtcClient.mMicSeats);
        },
        onMicrophoneStatusChanged: (seat?: LazyTrackRoomSeat | null) => {
          log('onMicrophoneStatusChanged', seat);
          setSeats(rtcClient.mMicSeats);
        },
      };
      rtcClient.addMicSeatListener(micSeatListener);
      return () => {
        rtcClient.removeMicSeatListener(micSeatListener);
      }
    }
  }, [rtcClient])

  useEffect(() => {
    if (roomToken && roomId && rtcClient && stateUserInfo && enableJoin && imGroupId) {
      setJoinState('entering');
      const uExtension: UserExtension = {
        uid: stateUserInfo?.accountId,
        userExtProfile: {
          avatar: stateUserInfo.avatar,
          name: stateUserInfo?.nickname,
        },
      };
      baseGetRoomMicInfoApi({
        roomId,
      })
        .then(
          (response) => response.mics.map((mic) => ({
            uid: mic.uid,
            isOwnerOpenAudio: false,
            isOwnerOpenVideo: false,
            userExtension: JSON.parse(mic.userExtension),
          })),
        )
        .then(
          (micSeats) => rtcClient.joinRoom({
            roomToken,
            imGroupId
          }, uExtension).then(() => {
            rtcClient.mMicSeats = micSeats;
            setJoinState('joined');
          }),
        )
        .catch((err) => {
          setJoinState('failed');
          console.error(err);
        });
    }
  }, [roomId, roomToken, rtcClient, stateUserInfo, imGroupId, enableJoin]);

  return {
    rtcClient,
    seats,
    joinState,
  };
};

export default useQNRTC;
