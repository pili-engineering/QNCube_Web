import React, { useEffect, useMemo, useReducer } from 'react';
import { MicSeatListener, MutableTrackRoomSeat, ScreenMicSeatListener } from 'qnweb-high-level-rtc';

import { useRoomStore } from '@/store';

interface Player {
  uid: string,
  type: 'screen' | 'camera',
  isOpen: boolean,
}

type Action = {
  /**
   * 有用户进入房间、
   */
  type: 'USER_IN',
  /**
   * 用户id
   */
  payload: string
} | {
  /**
   * 用户离开房间
   */
  type: 'USER_OUT',
  /**
   * 用户id
   */
  payload: string
} | {
  /**
   * 用户摄像头状态改变
   */
  type: 'USER_CAMERA_CHANGED',
  /**
   * uid: 用户id
   * isOpen: 是否开启摄像头
   */
  payload: { uid: string, isOpen: boolean }
} | {
  /**
   * 用户屏幕开启共享
   */
  type: 'USER_SCREEN_IN',
  /**
   * 用户id
   */
  payload: string
} | {
  /**
   * 用户关闭屏幕共享
   */
  type: 'USER_SCREEN_OUT',
  /**
   * 用户id
   */
  payload: string
} | {
  /**
   * 大小屏切换
   */
  type: 'LARGE_SMALL_TOGGLED'
} | {
  /**
   * 前后屏切换
   */
  type: 'SWITCH_CHANGED'
}

const playerQueueReducer: React.Reducer<Player[], Action> = (state, action) => {
  const lastIndex = state.length - 1;
  const first = state[0];
  const second = state[1];
  const last = state[lastIndex];
  switch (action.type) {
    case 'USER_IN':
      return [{ uid: action.payload, isOpen: false, type: 'camera' }, ...state];
    case 'USER_OUT':
      return state.filter(item => action.payload !== item.uid);
    case 'USER_CAMERA_CHANGED':
      return state.map(item => {
        if (item.uid === action.payload.uid && item.type === 'camera') {
          return { ...item, isOpen: action.payload.isOpen };
        }
        return item;
      });
    case 'USER_SCREEN_IN':
      return [{ uid: action.payload, isOpen: true, type: 'screen' }, ...state];
    case 'USER_SCREEN_OUT':
      return state.filter(item => {
        return !(item.uid === action.payload && item.type === 'screen');
      });
    case 'LARGE_SMALL_TOGGLED':
      return [second, first, ...state.slice(2)];
    case 'SWITCH_CHANGED':
      return [last, ...state.slice(1, lastIndex), first];
    default:
      throw new Error();
  }
};

export const usePlayer = (): {
  playerQueue: Player[],
  dispatchPlayerQueue: React.Dispatch<Action>
} => {
  const { state: roomStoreState } = useRoomStore();
  const roomClient = useMemo(() => roomStoreState.roomClient, [roomStoreState.roomClient]);
  const screenShareClient = useMemo(() => roomStoreState.roomClient?.screenTrackTool, [roomStoreState.roomClient?.screenTrackTool]);

  const [playerQueue, dispatchPlayerQueue] = useReducer(playerQueueReducer, []);

  /**
   * 麦位监听
   */
  useEffect(() => {
    const listener: MicSeatListener<MutableTrackRoomSeat> = {
      onUserSitUp: (seat) => {
        console.log(`订阅成功 listener onUserSitUp`, seat);
        dispatchPlayerQueue({ type: 'USER_OUT', payload: seat.uid });
      },
      onUserSitDown: (seat) => {
        console.log(`订阅成功 listener onUserSitDown`, seat);
        dispatchPlayerQueue({ type: 'USER_IN', payload: seat.uid });
      },
      onCameraStatusChanged: (seat) => {
        console.log(`订阅成功 listener onCameraStatusChanged`, seat);
        dispatchPlayerQueue({
          type: 'USER_CAMERA_CHANGED',
          payload: { uid: seat.uid, isOpen: seat.isOwnerOpenVideo }
        });
      }
    };
    if (roomClient) {
      roomClient.addMicSeatListener(listener);
      return () => {
        roomClient.removeMicSeatListener(
          listener
        );
      };
    }
  }, [roomClient]);

  /**
   * 屏幕共享监听
   */
  useEffect(() => {
    const listener: ScreenMicSeatListener = {
      onScreenMicSeatAdd: (seat) => {
        console.log(`listener onScreenMicSeatAdd`, seat);
        if (!seat.isMySeat) {
          dispatchPlayerQueue({ type: 'USER_SCREEN_IN', payload: seat.uid });
        }
      },
      onScreenMicSeatRemove(seat) {
        console.log(`listener onScreenMicSeatRemove`, seat);
        dispatchPlayerQueue({ type: 'USER_SCREEN_OUT', payload: seat.uid });
      }
    };
    if (screenShareClient) {
      screenShareClient.addScreenMicSeatListener(listener);
      return () => {
        screenShareClient.removeScreenMicSeatListener(
          listener
        );
      };
    }
  }, [screenShareClient]);

  return {
    playerQueue,
    dispatchPlayerQueue,
  };
};
