import {
  MicSeatListener,
  MutableTrackRoom,
  MutableTrackRoomSeat,
} from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

import { RoleValue } from '@/components';
import { useUserStore } from '@/store';

export type MtSeat = MutableTrackRoomSeat & {
  username: string;
  role: RoleValue
};

const roleMap = {
  teacher: '老师',
  student: '学生',
};

const log = (...args: unknown[]) => {
  console.log('useMutableTrackRoom', ...args);
};

/**
 * 麦位数据处理
 * @param mtSeats
 * @param currentUserId
 */
const makeSeats = (mtSeats: MutableTrackRoomSeat[], currentUserId: string) => {
  const unsortedSeats = mtSeats.map(item => {
    const uExtension = item.userExtension;
    const userExtProfile = uExtension?.userExtProfile;
    const uRole: MtSeat['role'] = <MtSeat['role']>uExtension?.userExtRoleType;
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
  return { unsortedSeats, mtSeats, teacherSeat, mySeat, sortedSeats, otherSeats };
};

export const useMutableTrackRoom = () => {
  const { state } = useUserStore();
  const [mtSeats, setMtSeats] = useState<MutableTrackRoomSeat[]>([]);
  const [client, setClient] = useState<MutableTrackRoom | null>(null);
  const [unsortedSeats, setUnsortedSeats] = useState<MtSeat[]>([]);
  const [sortedSeats, setSortedSeats] = useState<MtSeat[]>([]);
  const [mySeat, setMySeat] = useState<MtSeat>();
  const [teacherSeat, setTeacherSeat] = useState<MtSeat>();
  const [otherSeats, setOtherSeats] = useState<MtSeat[]>();
  const currentUserId = state.userInfo?.accountId || '';

  /**
   * 实例化
   */
  useEffect(() => {
    const client = new MutableTrackRoom();
    setClient(client);
  }, []);

  /**
   * 更新麦位
   */
  useEffect(() => {
    if (!client) return;
    const updateMicSeats = () => {
      setMtSeats(client.mMicSeats.slice());
    };
    const micSeatListener: MicSeatListener<MutableTrackRoomSeat> = {
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
    } = makeSeats(mtSeats, currentUserId);
    setUnsortedSeats(unsortedSeats);
    setTeacherSeat(teacherSeat);
    setMySeat(mySeat);
    setOtherSeats(otherSeats);
    setSortedSeats(
      Array.from(new Set(sortedSeats))
    );
  }, [currentUserId, mtSeats]);

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

  return {
    mtRoomClient: client,
    seats: mtSeats,
    unsortedSeats, setUnsortedSeats,
    sortedSeats, setSortedSeats,
    mySeat, setMySeat,
    teacherSeat, setTeacherSeat,
    otherSeats, setOtherSeats,
  };
};
