import {
  LazyTrackRoom,
  LazyTrackRoomSeat,
  MicSeatListener,
} from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

import { RoomApi } from '@/api';
import { useUserStore } from '@/store';
import { RoleValue } from '@/components';

export type LazySeat = LazyTrackRoomSeat & {
  username: string;
  role: RoleValue
};

const roleMap = {
  teacher: '老师',
  student: '学生',
};

const log = (...args: unknown[]) => {
  console.log('useLazyTrackRoom', ...args);
};

/**
 * 麦位数据处理
 * @param lazySeats
 * @param currentUserId
 */
const makeSeats = (lazySeats: LazyTrackRoomSeat[], currentUserId: string) => {
  const unsortedSeats = lazySeats.map(item => {
    const uExtension = item.userExtension;
    const userExtProfile = uExtension?.userExtProfile;
    const uRole: LazySeat['role'] = <LazySeat['role']>uExtension?.userExtRoleType;
    const uExtProfile = typeof userExtProfile === 'string' ? JSON.parse(userExtProfile) : userExtProfile;
    const role = roleMap[uRole];
    return { ...item, username: `${role}: ${uExtProfile.name}`, role: uRole, };
  });
  const teacherSeat = unsortedSeats.find(item => item.role === 'teacher');
  const mySeat = unsortedSeats.find(item => item.uid === currentUserId);
  const otherSeats = unsortedSeats.filter(item => {
    return item !== teacherSeat && item !== mySeat;
  });
  let sortedSeats = [];
  if (teacherSeat) {
    sortedSeats.push(teacherSeat);
  }
  if (mySeat) {
    sortedSeats.push(mySeat);
  }
  sortedSeats.push(...otherSeats);
  sortedSeats = Array.from(new Set(sortedSeats));
  return { unsortedSeats, lazySeats, teacherSeat, mySeat, sortedSeats, otherSeats };
};

export const useLazyTrackRoom = (roomId?: string) => {
  const { state } = useUserStore();
  const [lazySeats, setLazySeats] = useState<LazyTrackRoomSeat[]>([]);
  const [client, setClient] = useState<LazyTrackRoom | null>(null);
  const [unsortedSeats, setUnsortedSeats] = useState<LazySeat[]>([]);
  const [sortedSeats, setSortedSeats] = useState<LazySeat[]>([]);
  const [mySeat, setMySeat] = useState<LazySeat>();
  const [teacherSeat, setTeacherSeat] = useState<LazySeat>();
  const [otherSeats, setOtherSeats] = useState<LazySeat[]>();
  const currentUserId = state.userInfo?.accountId || '';

  /**
   * 实例化
   */
  useEffect(() => {
    const client = new LazyTrackRoom();
    setClient(client);
  }, []);

  /**
   * 更新麦位
   */
  useEffect(() => {
    if (!client) return;
    const updateMicSeats = () => {
      log('updateMicSeats', client.mMicSeats.slice());
      setLazySeats(client.mMicSeats.slice());
    };
    const micSeatListener: MicSeatListener<LazyTrackRoomSeat> = {
      onUserSitDown: updateMicSeats,
      onUserSitUp: updateMicSeats,
      onMicrophoneStatusChanged: updateMicSeats,
      onCameraStatusChanged: updateMicSeats,
      onAudioForbiddenStatusChanged: updateMicSeats,
      onVideoForbiddenStatusChanged: updateMicSeats,
    };
    client.addMicSeatListener(micSeatListener);
    return () => {
      client.removeMicSeatListener(micSeatListener);
    };
  }, [client]);

  /**
   * 麦位数据处理
   */
  useEffect(() => {
    const {
      unsortedSeats, teacherSeat, mySeat, otherSeats, sortedSeats
    } = makeSeats(lazySeats, currentUserId);
    setUnsortedSeats(unsortedSeats);
    setTeacherSeat(teacherSeat);
    setMySeat(mySeat);
    setOtherSeats(otherSeats);
    setSortedSeats(sortedSeats);
  }, [currentUserId, lazySeats]);

  /**
   * 上麦：开启音视频
   * 下麦：关闭音视频
   */
  useEffect(() => {
    if (!client) return;
    const micSeatListener: MicSeatListener<LazyTrackRoomSeat> = {
      onUserSitDown(seat) {
        log('渲染音视频逻辑处理=>onUserSitDown', seat);
        if (seat.isMySeat) {
          client.enableCamera();
          client.enableMicrophone();
        }
      },
      onUserSitUp(seat) {
        log('渲染音视频逻辑处理=>onUserSitUp', seat);
        if (seat.isMySeat) {
          client.disableCamera();
          client.disableMicrophone();
        }
      },
    };
    client.addMicSeatListener(micSeatListener);
    return () => {
      client.removeMicSeatListener(micSeatListener);
    };
  }, [client]);

  /**
   * 音视频渲染
   */
  useEffect(() => {
    if (!client) return;
    sortedSeats.map(sortedSeatItem => {
      if (!sortedSeatItem.isMySeat && sortedSeatItem.isOwnerOpenAudio) {
        const element = document.getElementById(sortedSeatItem.uid);
        const hasAudio = element?.querySelector('audio');
        if (!hasAudio) {
          client.setUserMicrophoneWindowView(
            sortedSeatItem.uid,
            sortedSeatItem.uid,
          );
        }
        log('渲染音视频逻辑处理=>setUserMicrophoneWindowView', sortedSeatItem, element, hasAudio);
      }
      if (sortedSeatItem.isOwnerOpenVideo) {
        const element = document.getElementById(sortedSeatItem.uid);
        const hasVideo = element?.querySelector('video');
        if (!hasVideo) {
          client.setUserCameraWindowView(
            sortedSeatItem.uid,
            sortedSeatItem.uid,
          );
        }
        log('渲染音视频逻辑处理=>setUserCameraWindowView', sortedSeatItem, element, hasVideo);
      }
    });
  }, [client, sortedSeats]);

  /**
   * 接口同步麦位
   */
  useEffect(() => {
    if (!client) return;
    if (!roomId) return;
    /**
     * 上麦同步
     * @param seat
     */
    const sitDownMic = (seat: LazyTrackRoomSeat) => {
      if (!seat.isMySeat) return;
      log('接口同步麦位=>sitDownMic', seat);
      return RoomApi.baseUpMicApi({
        roomId,
        attrs: [
          { key: 'seat', value: JSON.stringify(seat) }
        ]
      });
    };
    /**
     * 下麦同步
     * @param seat
     */
    const sitUpMic = (seat: LazyTrackRoomSeat) => {
      if (!seat.isMySeat) return;
      log('接口同步麦位=>sitUpMic', seat);
      return RoomApi.baseDownMicApi({
        roomId,
        uid: seat.uid,
      });
    };
    const micSeatListener: MicSeatListener<LazyTrackRoomSeat> = {
      onUserSitDown: sitDownMic,
      onUserSitUp: sitUpMic,
    };
    client.addMicSeatListener(micSeatListener);
    return () => {
      client.removeMicSeatListener(micSeatListener);
    };
  }, [client, roomId]);

  return {
    lazyRoomClient: client,
    lazySeats, setLazySeats,
    unsortedSeats, setUnsortedSeats,
    sortedSeats, setSortedSeats,
    mySeat, setMySeat,
    teacherSeat, setTeacherSeat,
    otherSeats, setOtherSeats,
  };
};
