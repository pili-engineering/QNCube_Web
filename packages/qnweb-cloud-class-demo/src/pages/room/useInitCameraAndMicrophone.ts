import { useEffect, useState } from 'react';
import { MutableTrackRoom } from 'qnweb-high-level-rtc';

const useInitCameraAndMicrophone = (client: MutableTrackRoom | null, isJoined: boolean) => {
  const [isCameraOpen, toggleCamera] = useState(false);
  const [isMicOpen, toggleMic] = useState(false);
  /**
   * 加入房间开启摄像头和麦克风
   */
  useEffect(() => {
    if (isJoined) {
      Promise.all([
        client?.enableCamera(),
        client?.enableMicrophone(),
      ]).then(() => {
        toggleMic(true);
        toggleCamera(true);
      });
    }
  }, [client, isJoined]);

  return {
    toggleMic,
    toggleCamera,
    isCameraOpen,
    isMicOpen,
  };
};

export default useInitCameraAndMicrophone;
