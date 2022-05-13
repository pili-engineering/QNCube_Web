import { MicSeatListener, MutableTrackRoom, MutableTrackRoomSeat } from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

const log = (...data: unknown[]) => {
  console.log('[useMtTrackRoom]', ...data);
};

const useMtTrackRoom = () => {
  const [room, setRoom] = useState<MutableTrackRoom>(() => new MutableTrackRoom());
  const [micSeats, setMicSeats] = useState<MutableTrackRoomSeat[]>([]);

  /**
   * 麦位监听
   */
  useEffect(() => {
    const handler: MicSeatListener<MutableTrackRoomSeat> = {
      onUserSitDown() {
        log('onUserSitDown');
        setMicSeats(room?.mMicSeats || []);
      },
      onUserSitUp() {
        log('onUserSitUp');
        setMicSeats(room?.mMicSeats || []);
      },
      onCameraStatusChanged() {
        log('onCameraStatusChanged');
        setMicSeats(room?.mMicSeats || []);
      },
      onMicrophoneStatusChanged() {
        log('onMicrophoneStatusChanged');
        setMicSeats(room?.mMicSeats || []);
      },
    };
    room.addMicSeatListener(handler);
    return () => {
      room.removeMicSeatListener(handler);
    };
  }, [room]);

  return {
    room,
    micSeats,
    setRoom,
    setMicSeats,
  };
};

export default useMtTrackRoom;
