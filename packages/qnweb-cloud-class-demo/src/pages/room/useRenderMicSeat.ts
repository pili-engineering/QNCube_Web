import { useEffect, useState } from 'react';
import { MutableTrackRoomSeat, MutableTrackRoom } from 'qnweb-high-level-rtc';

import { BaseRoomRole, BaseUserInfo } from '@/api';
import { ICloudClassSeat } from '@/components';

export type Seat = ICloudClassSeat & { userId: string; role: BaseRoomRole };

const useRenderMicSeat = (
  client: MutableTrackRoom | null,
  isJoined: boolean,
  rtcSeats: MutableTrackRoomSeat[],
  userInfo?: BaseUserInfo,
) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  /**
   * 渲染麦位
   */
  useEffect(() => {
    const zhCNMap = {
      teacher: '老师',
      student: '学生',
    };
    const tops = rtcSeats.reduce<(Seat & { level: number })[]>(
      (prev, cur) => {
        const uExtension = cur.userExtension;
        const userExtProfile = uExtension?.userExtProfile;
        const uRole: BaseRoomRole = <BaseRoomRole>uExtension?.userExtRoleType;
        const uExtProfile = typeof userExtProfile === 'string'
          ? JSON.parse(userExtProfile)
          : userExtProfile;
        const prefix = zhCNMap[uRole];
        const mSeat = {
          isMicOpen: cur.isOwnerOpenAudio,
          isCameraOpen: cur.isOwnerOpenVideo,
          userId: cur.uid,
          username: `${prefix}: ${uExtProfile.name}`,
          role: uRole,
        };
        if (mSeat.role === 'teacher') {
          prev.push({
            ...mSeat,
            level: 0,
          });
        } else if (mSeat.userId === userInfo?.accountId) {
          prev.push({
            ...mSeat,
            level: 1,
          });
        } else {
          prev.push({
            ...mSeat,
            level: 2,
          });
        }
        return prev;
      }, []);
    return setSeats(
      tops.sort((a, b) => a.level - b.level),
    );
  }, [rtcSeats, userInfo]);

  /**
   * 渲染好麦位播放对应的音视频
   */
  useEffect(() => {
    if (client && isJoined) {
      seats.forEach((s) => {
        const elementId = s.userId;
        const element = document.getElementById(elementId);
        const isMicPlaying = element?.querySelector('audio');
        const isCameraPlaying = element?.querySelector('video');
        const isSelf = s.userId === userInfo?.accountId;
        const isPlayMic = s.isMicOpen && element && !isMicPlaying;
        const isPlayCamera = s.isCameraOpen && element && !isCameraPlaying;
        if (isPlayMic && !isSelf) {
          client.setUserMicrophoneWindowView(s.userId, s.userId);
        }
        if (isPlayCamera) {
          if (isSelf) {
            client.setLocalCameraWindowView(elementId);
          } else {
            client.setUserCameraWindowView(s.userId, elementId);
          }
        }
      });
    }
  }, [seats, client, isJoined, userInfo]);

  return {
    seats,
  };
};

export default useRenderMicSeat;
