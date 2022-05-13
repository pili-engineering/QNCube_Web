import { useEffect, useState } from 'react';
import { LazyTrackRoom, LazyTrackRoomSeat } from 'qnweb-high-level-rtc';
import { Modal } from 'antd';
import { BaseUserInfo } from '@/api/baseApi';

/**
 * notIn: 未加入, entering: 加入中, joined: 已加入, failed: 加入失败
 */
type RtcJoinState = 'notIn' | 'entering' | 'joined' | 'failed';

const log = (...data: any[]) => {
  console.log('debugger', ...data);
};

/**
 * 渲染座位
 * @param client
 * @param seat
 */
const renderSeat = (client: LazyTrackRoom | null, seat: LazyTrackRoomSeat) => {
  const elementId = `uid-${seat.uid}`;
  const userContainer = document.getElementById(elementId);
  const isMicPlaying = userContainer?.querySelector('audio');
  const isCameraPlaying = userContainer?.querySelector('video');
  if (!seat || !client || !userContainer) return;
  log('renderSeat seat', seat);
  if (seat.isOwnerOpenVideo && !isCameraPlaying) {
    log('renderSeat setUserCameraWindowView', seat);
    client.setUserCameraWindowView(
      seat.uid, elementId,
    )?.catch((err) => {
      console.error(err);
      Modal.error({
        title: 'RTC视频流播放视频失败',
        content: '请点击确认重新播放',
        onOk() {
          client.setUserCameraWindowView(seat.uid, elementId);
        },
      });
    });
  }
  if (seat.isOwnerOpenAudio && !isMicPlaying) {
    log('renderSeat setUserMicrophoneWindowView', seat);
    Promise.resolve(
      client.setUserMicrophoneWindowView(
        seat.uid, elementId,
      ),
    ).catch((err) => {
      console.error(err);
      Modal.error({
        title: 'RTC音频流播放视频失败',
        content: '请点击确认重新播放',
        onOk() {
          client.setUserMicrophoneWindowView(
            seat.uid, elementId,
          );
        },
      });
    });
  }
};

const useRenderAvatarSeats = (
  rtcClient: LazyTrackRoom | null,
  rtcJoinState: RtcJoinState,
  seats: LazyTrackRoomSeat[],
  stateUserInfo: BaseUserInfo | undefined,
  creatorUserId: string | null | undefined,
) => {
  const [leftAvatarSeat, setLeftAvatarSeat] = useState<LazyTrackRoomSeat>();
  const [rightAvatarSeat, setRightAvatarSeat] = useState<LazyTrackRoomSeat>();

  /**
   * 渲染avatar座位
   */
  useEffect(() => {
    if (rtcClient && rtcJoinState === 'joined') {
      const lSeat = seats.find((seat) => seat.uid === creatorUserId);
      const rSeat = seats.find((seat) => seat.uid !== creatorUserId);
      setLeftAvatarSeat(lSeat);
      setRightAvatarSeat(rSeat);
    }
  }, [seats, stateUserInfo, rtcClient, rtcJoinState, creatorUserId]);

  /**
   * 渲染左边avatar座位
   */
  useEffect(() => {
    if (leftAvatarSeat && rtcClient) {
      log('render leftAvatarSeat');
      renderSeat(rtcClient, leftAvatarSeat);
    }
  }, [rtcClient, leftAvatarSeat]);

  /**
   * 渲染右边avatar座位
   */
  useEffect(() => {
    if (rightAvatarSeat && rtcClient) {
      log('render rightAvatarSeat');
      renderSeat(rtcClient, rightAvatarSeat);
    }
  }, [rtcClient, rightAvatarSeat]);

  return {
    leftAvatarSeat,
    rightAvatarSeat,
  };
};

export default useRenderAvatarSeats;
