import { useCallback, useRef } from 'react';
import { QNRTCClient, QNTranscodingLiveStreamingConfig, QNTranscodingLiveStreamingTrack } from 'qnweb-rtc';

/**
 * 合流转推
 * @param rtcClient
 */
const useMixStreamJob = (rtcClient: QNRTCClient) => {
  const enabled = useRef<boolean>(false);
  const taskQueue = useRef<Function[]>([]);

  const startMixStreamJob = useCallback((config: QNTranscodingLiveStreamingConfig) => {
    return rtcClient.startTranscodingLiveStreaming(config).then(() => {
      enabled.current = true;
      taskQueue.current.forEach(task => task());
    });
  }, [rtcClient]);

  const updateMixStreamJob = useCallback((streamID: string, transcodingTracks: QNTranscodingLiveStreamingTrack[]) => {
    const updateJob = () => {
      return rtcClient.setTranscodingLiveStreamingTracks(
        streamID,
        transcodingTracks
      ).then(() => {
        console.log('合流成功: ', transcodingTracks)
      });
    };
    if (enabled.current) {
      return updateJob();
    }
    taskQueue.current?.push(updateJob);
  }, [rtcClient]);

  const stopMixStreamJob = useCallback((streamID: string) => {
    return rtcClient.stopTranscodingLiveStreaming(streamID);
  }, [rtcClient]);

  return {
    startMixStreamJob,
    updateMixStreamJob,
    stopMixStreamJob
  };
};

export default useMixStreamJob;
