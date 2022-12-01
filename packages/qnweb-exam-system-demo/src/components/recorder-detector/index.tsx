import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { QNLocalTrack } from 'qnweb-rtc';
import { Button, Modal } from 'antd';
import RecordRTC from 'recordrtc';
import { QNCamera, QNMicrophone } from 'qnweb-exam-sdk';

import './index.scss';

export type RecorderDetectorProps = React.HTMLAttributes<HTMLDivElement>

const RecorderDetector: React.FC<RecorderDetectorProps> = (props) => {
  const { className, ...restProps } = props;
  const localCameraTrackRef = useRef<QNLocalTrack>();
  const localMicrophoneTrackRef = useRef<QNLocalTrack>();
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<RecordRTC | null>(null);

  /**
   * 摄像头
   */
  useEffect(() => {
    const camera = QNCamera.create({
      elementId: 'local-camera',
    });
    camera.start().then(() => {
      localCameraTrackRef.current = camera.cameraVideoTrack;
    });
    return () => {
      camera.stop().then(() => {
        localCameraTrackRef.current = undefined;
      });
    };
  }, []);

  /**
   * 麦克风
   */
  useEffect(() => {
    const microphone = QNMicrophone.create({
      elementId: 'local-camera',
    });
    microphone.start().then(() => {
      localMicrophoneTrackRef.current = microphone.microphoneAudioTrack;
    });
    return () => {
      microphone.stop().then(() => {
        localMicrophoneTrackRef.current = undefined;
      });
    };
  }, []);

  // 切换录制
  const onToggleRecording = () => {
    const nextIsRecording = !isRecording;
    if (nextIsRecording) { // 开始录制
      const tracks = [
        localCameraTrackRef.current?.getMediaStreamTrack(),
        localMicrophoneTrackRef.current?.getMediaStreamTrack(),
      ].filter(Boolean) as MediaStreamTrack[];
      const stream = new MediaStream(tracks);

      recorderRef.current = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/mp4',
      });
      recorderRef.current.startRecording();
    } else { // 结束录制
      recorderRef.current?.stopRecording(() => {
        const blob = recorderRef.current?.getBlob();
        const replayVideoElement = document.getElementById('replay-video') as HTMLVideoElement;
        if (replayVideoElement && blob) {
          replayVideoElement.src = URL.createObjectURL(blob);
          replayVideoElement.play().catch((error) => {
            console.error(error);
            Modal.error({
              title: '播放失败',
              content: error.message,
            });
          });
        }
      });
    }
    setIsRecording(nextIsRecording);
  };

  return (
    <div className={classNames('recorder-detector', className)} {...restProps}>
      <div className="cameras">
        <div id="local-camera" className="local-camera"/>
        <div className="replay">
          <video id="replay-video" className="replay-video"/>
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
