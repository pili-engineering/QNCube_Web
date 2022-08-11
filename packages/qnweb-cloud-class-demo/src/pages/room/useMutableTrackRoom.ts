import {
  MutableTrackRoom,
  MutableTrackRoomSeat,
} from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

const log = (...data: unknown[]) => {
  window.console.log('useMutableTrackRoom', ...data);
};

const useMutableTrackRoom = () => {
  const [seats, setSeats] = useState<MutableTrackRoomSeat[]>([]);
  const [mtRoom, setMtRoom] = useState<MutableTrackRoom | null>(null);

  /**
   * 实例化并监听
   */
  useEffect(() => {
    const client = new MutableTrackRoom();
    const micSeatListener = {
      onUserSitDown: (seat?: MutableTrackRoomSeat | null) => {
        log('onUserSitDown', seat);
        setSeats(client.mMicSeats.slice());
      },
      onUserSitUp: (seat: MutableTrackRoomSeat) => {
        log('onUserSitUp', seat);
        setSeats(client.mMicSeats.slice());
      },
      onCameraStatusChanged: (seat: MutableTrackRoomSeat) => {
        log('onCameraStatusChanged', seat);
        setSeats(client.mMicSeats.slice());
      },
      onMicrophoneStatusChanged: (seat: MutableTrackRoomSeat) => {
        log('onMicrophoneStatusChanged', seat);
        setSeats(client.mMicSeats.slice());
      },
    };
    client.addMicSeatListener(micSeatListener);
    setMtRoom(client);
    return () => {
      client.removeMicSeatListener(micSeatListener);
    };
  }, []);

  return {
    mtRoom,
    seats,
  };
};

export default useMutableTrackRoom;
