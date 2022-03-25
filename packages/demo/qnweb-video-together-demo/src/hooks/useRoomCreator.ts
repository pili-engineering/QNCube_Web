import { LazyTrackRoom, MicSeat, MicSeatListener } from 'qnweb-high-level-rtc';
import { useEffect, useState } from 'react';

const useRoomCreator = (client: LazyTrackRoom | null, creator?: string) => {
  const [isSitUp, setIsSitUp] = useState<boolean>(false);
  useEffect(() => {
    const handleMicSeatListener: MicSeatListener = {
      onUserSitUp(micSeat: MicSeat | null | undefined) {
        if (micSeat?.uid === creator) {
          setIsSitUp(true);
        }
      },
    };
    if (client) {
      client.addMicSeatListener(handleMicSeatListener);
      return () => {
        client.removeMicSeatListener(handleMicSeatListener);
      };
    }
  }, [client, creator]);

  return { isSitUp };
};

export default useRoomCreator;
