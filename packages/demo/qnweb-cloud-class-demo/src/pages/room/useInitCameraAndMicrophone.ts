import { useEffect, useState } from 'react';
import { MutableTrackRoom } from 'qnweb-high-level-rtc';
import { RtcJoinState } from '../../components';

const useInitCameraAndMicrophone = (client: MutableTrackRoom | null, joinState: RtcJoinState) => {
  const [isCameraOpen, toggleCamera] = useState(false);
  const [isMicOpen, toggleMic] = useState(false);
  /**
   * 加入房间开启摄像头和麦克风
   */
  useEffect(() => {
    if (joinState === 'joined') {
      Promise.all([
        client?.enableCamera(),
        client?.enableMicrophone(),
      ]).then(() => {
        toggleMic(true);
        toggleCamera(true);
      });
    }
  }, [client, joinState]);

  return {
    toggleMic,
    toggleCamera,
    isCameraOpen,
    isMicOpen,
  };
};

export default useInitCameraAndMicrophone;
