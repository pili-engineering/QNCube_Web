import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import QNRTC, { QNLocalTrack } from 'qnweb-rtc';
import { Button } from 'antd';
import { QNMediaRecorder } from 'qnweb-rtc-ai';
import './index.scss';

export type RecorderDetectorProps = React.HTMLAttributes<HTMLDivElement>

const RecorderDetector: React.FC<RecorderDetectorProps> = (props) => {
  const { className, ...restProps } = props;
  const localCameraTrackRef = useRef<QNLocalTrack>();
  const localMicrophoneTrackRef = useRef<QNLocalTrack>();
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<QNMediaRecorder>();

  useEffect(() => {
    recorderRef.current = new QNMediaRecorder();
  }, []);

  useEffect(() => {
    QNRTC.createCameraVideoTrack().then((track) => {
      localCameraTrackRef.current = track;
      const localCameraElement = document.getElementById('local-camera');
      if (localCameraElement) {
        localCameraTrackRef.current.play(localCameraElement);
      }
    });
    QNRTC.createMicrophoneAudioTrack().then((track) => {
      localMicrophoneTrackRef.current = track;
      const localCameraElement = document.getElementById('local-camera');
      if (localCameraElement) {
        localMicrophoneTrackRef.current.play(localCameraElement);
      }
    });
    return () => {
      localCameraTrackRef.current?.destroy();
      localMicrophoneTrackRef.current?.destroy();
    };
  }, []);

  // 切换录制
  const onToggleRecording = () => {
    const nextIsRecording = !isRecording;
    if (nextIsRecording) { // 开始录制
      recorderRef.current?.start({
        videoTrack: localCameraTrackRef.current,
        audioTrack: localMicrophoneTrackRef.current,
      });
    } else { // 结束录制
      const blob = recorderRef.current?.stop();
      const replayVideoElement = document.getElementById('replay-video') as HTMLVideoElement;
      if (replayVideoElement && blob) {
        replayVideoElement.src = URL.createObjectURL(blob);
        replayVideoElement.play();
      }
    }
    setIsRecording(nextIsRecording);
  };

  return (
    <div className={classNames('recorder-detector', className)} {...restProps}>
      <div className="cameras">
        <div id="local-camera" className="local-camera" />
        <div className="replay">
          <video id="replay-video" className="replay-video" />
        </div>
      </div>
      <div className="action">
        <Button type="primary" onClick={onToggleRecording}>
          {isRecording ? '结束' : '开始'}
          录制
        </Button>
      </div>
    </div>
  );
};

export default RecorderDetector;
