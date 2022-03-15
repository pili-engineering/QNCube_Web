import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { Select } from 'antd';
import QNRTC, { QNLocalTrack } from 'qnweb-rtc';
import classNames from 'classnames';
import testAudio from './test.mp3';
import './index.scss';

export type MediaDetectorProps = React.HTMLAttributes<HTMLDivElement>

type MediaStatus = 'pending' | 'fulfilled' | 'rejected';

const MediaDetector: React.FC<MediaDetectorProps> = (props) => {
  const { className, ...restProps } = props;

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCamera, setCurrentCamera] = useState<string>();
  const [cameraStatus, setCameraStatus] = useState<MediaStatus>('pending');

  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [currentMicrophone, setCurrentMicrophone] = useState<string>();
  const [microphoneStatus, setMicrophoneStatus] = useState<MediaStatus>('pending');

  const localCameraTrackRef = useRef<QNLocalTrack>();
  const localMicrophoneTrackRef = useRef<QNLocalTrack>();

  /**
   * 枚举媒体设备
   */
  useEffect(() => {
    // 枚举可用的视频输入设备，比如摄像头
    const getCameras = () => QNRTC.getCameras()
      .then((mediaDeviceInfos) => {
        setCameras(mediaDeviceInfos);
      });
    // 枚举可用的音频输入设备，比如麦克风
    const getMicrophones = () => QNRTC.getMicrophones()
      .then((mediaDeviceInfos) => {
        setMicrophones(mediaDeviceInfos);
      });

    getCameras().catch(() => setCameraStatus('rejected'));
    getMicrophones().catch(() => setMicrophoneStatus('rejected'));
    QNRTC.onCameraChanged = () => {
      getCameras().catch(() => setCameraStatus('rejected'));
    };
    QNRTC.onMicrophoneChanged = () => {
      getMicrophones().catch(() => setMicrophoneStatus('rejected'));
    };
  }, []);

  /**
   * 初始化选择第一个摄像头
   */
  useEffect(() => {
    setCurrentCamera(cameras[0]?.deviceId);
  }, [cameras]);

  /**
   * 初始化选择第一个麦克风
   */
  useEffect(() => {
    setCurrentMicrophone(microphones[0]?.deviceId);
  }, [microphones]);

  /**
   * 采集pc端摄像头
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const pcCameraContainer = document.querySelector<HTMLDivElement>('#pc-camera');
    if (currentCamera) {
      QNRTC.createCameraVideoTrack({
        tag: 'pc-camera',
        cameraId: currentCamera,
      }).then((track) => {
        localCameraTrackRef.current = track;
        if (pcCameraContainer) {
          track.play(pcCameraContainer).then(() => setCameraStatus('fulfilled'));
        }
      }).catch(() => setCameraStatus('rejected'));
      return () => {
        localCameraTrackRef.current?.destroy();
      };
    }
  }, [currentCamera]);

  /**
   * 采集pc端麦克风
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const pcCameraContainer = document.querySelector<HTMLDivElement>('#pc-camera');
    if (currentMicrophone) {
      QNRTC.createMicrophoneAudioTrack({
        tag: 'pc-microphone',
        microphoneId: currentMicrophone,
      }).then((track) => {
        localMicrophoneTrackRef.current = track;
        if (pcCameraContainer) {
          track.play(pcCameraContainer).then(() => setMicrophoneStatus('fulfilled'));
        }
      }).catch(() => setMicrophoneStatus('rejected'));
      return () => {
        localMicrophoneTrackRef.current?.destroy();
      };
    }
  }, [currentMicrophone]);

  const mapMediaStatusToText = useMemo(() => new Map<MediaStatus, string>([
    ['pending', '加载中'],
    ['fulfilled', '成功'],
    ['rejected', '失败'],
  ]), []);

  return (
    <div className={classNames('media-detector', className)} {...restProps}>
      <div className="main">
        <div id="pc-camera" className="pc-camera" />
        <div className="media-device-select">
          <span style={{ marginRight: 10 }}>选择摄像头:</span>
          <Select style={{ width: 200, marginRight: 10 }} value={currentCamera}>
            {
              cameras.map((camera) => (
                <Select.Option
                  key={camera.deviceId}
                  value={camera.deviceId}
                >
                  {camera.label}
                </Select.Option>
              ))
            }
          </Select>
          <span>
            摄像头检测
            {mapMediaStatusToText.get(cameraStatus)}
          </span>
        </div>
        <div className="media-device-select">
          <span style={{ marginRight: 10 }}>选择麦克风:</span>
          <Select style={{ width: 200, marginRight: 10 }} value={currentMicrophone}>
            {
              microphones.map((microphone) => (
                <Select.Option
                  key={microphone.deviceId}
                  value={microphone.deviceId}
                >
                  {microphone.label}
                </Select.Option>
              ))
            }
          </Select>
          <span>
            麦克风检测
            {mapMediaStatusToText.get(microphoneStatus)}
          </span>
        </div>
        {/* <div className="media-device-select"> */}
        {/*  <span style={{ marginRight: 10 }}>选择扬声器:</span> */}
        {/*  <Select style={{ width: 200, marginRight: 10 }} value={currentPlaybackDevice}> */}
        {/*    { */}
        {/*      playbackDevices.map((playbackDevice) => ( */}
        {/*        <Select.Option */}
        {/*          key={playbackDevice.deviceId} */}
        {/*          value={playbackDevice.deviceId} */}
        {/*        > */}
        {/*          {playbackDevice.label} */}
        {/*        </Select.Option> */}
        {/*      )) */}
        {/*    } */}
        {/*  </Select> */}
        {/*  <span> */}
        {/*    扬声器检测 */}
        {/*    {isPlaybackDeviceEnabled ? '通过' : '失败'} */}
        {/*  </span> */}
        {/* </div> */}
      </div>
      <div className="secondary">
        <div className="button-play-text">点击播放音频:</div>
        <audio
          src={testAudio}
          controls
        />
      </div>
    </div>
  );
};

export default MediaDetector;
