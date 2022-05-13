import React, {
  useEffect, useMemo, useState,
} from 'react';
import { Select } from 'antd';
import QNRTC  from 'qnweb-rtc';
import { QNCamera, QNMicrophone } from 'qnweb-exam-sdk';
import classNames from 'classnames';

import testAudio from './test.mp3';
import './index.scss';


export type MediaDetectorProps = React.HTMLAttributes<HTMLDivElement>

type MediaStatus = 'pending' | 'fulfilled' | 'rejected';

const MediaDetector: React.FC<MediaDetectorProps> = (props) => {
  const { className, ...restProps } = props;

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [cameraId, setCameraId] = useState<string>();
  const [cameraStatus, setCameraStatus] = useState<MediaStatus>('pending');

  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [microphoneId, setMicrophoneId] = useState<string>();
  const [microphoneStatus, setMicrophoneStatus] = useState<MediaStatus>('pending');

  /**
   * 枚举媒体设备
   */
  useEffect(() => {
    // 枚举可用的视频输入设备，比如摄像头
    const getCameras = () => QNCamera.getCameras()
      .then((mediaDeviceInfos) => {
        setCameras(mediaDeviceInfos);
      });
    // 枚举可用的音频输入设备，比如麦克风
    const getMicrophones = () => QNMicrophone.getMicrophones()
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
    setCameraId(cameras[0]?.deviceId);
  }, [cameras]);

  /**
   * 初始化选择第一个麦克风
   */
  useEffect(() => {
    setMicrophoneId(microphones[0]?.deviceId);
  }, [microphones]);

  /**
   * 采集摄像头
   */
  useEffect(() => {
    if (cameraId) {
      const camera = QNCamera.create({
        elementId: 'pc-camera',
        cameraId,
      });
      camera.start().then(() => {
        setCameraStatus('fulfilled');
      });
      return () => {
        camera.stop();
      };
    }
  }, [cameraId]);

  /**
   * 采集麦克风
   */
  useEffect(() => {
    if (microphoneId) {
      const microphone = QNMicrophone.create({
        elementId: 'pc-camera',
        microphoneId,
      });
      microphone.start().then(() => {
        setMicrophoneStatus('fulfilled');
      });
      return () => {
        microphone.stop();
      };
    }
  }, [microphoneId]);

  const mapMediaStatusToText = useMemo(() => new Map<MediaStatus, string>([
    ['pending', '加载中'],
    ['fulfilled', '成功'],
    ['rejected', '失败'],
  ]), []);

  return (
    <div className={classNames('media-detector', className)} {...restProps}>
      <div className="main">
        <div id="pc-camera" className="pc-camera"/>
        <div className="media-device-select">
          <span style={{ marginRight: 10 }}>选择摄像头:</span>
          <Select style={{ width: 200, marginRight: 10 }} value={cameraId}>
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
          <Select style={{ width: 200, marginRight: 10 }} value={microphoneId}>
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
