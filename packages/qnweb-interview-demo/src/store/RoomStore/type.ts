import { MutableTrackRoom } from 'qnweb-high-level-rtc';

export interface RoomStoreState {
  roomClient?: MutableTrackRoom | null;
}

export type RoomStoreAction = {
  type: 'PATCH';
  payload: RoomStoreState;
}
