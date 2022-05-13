import React, { useEffect, useRef, useState } from 'react';
import QNRTC, { QNCameraVideoTrack, QNMicrophoneAudioTrack } from 'qnweb-rtc';
import { Modal, Select } from 'antd';
import classNames from 'classnames';
import { useNetwork } from 'ahooks';
import { NetworkState } from 'ahooks/es/useNetwork';

import Audio from '../audio';
import iconNormal from './icon-normal.svg';
import iconAbnormality from './icon-abnormality.svg';

import './index.scss';

interface DeviceTestPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  onRetest: () => void;
}


const volumeNumber = 32;

/**
 * 渲染网络状态
 * @param state
 */
const renderNetworkState = (state: NetworkState) => {
  const { effectiveType, downlink } = state;
  if (effectiveType && downlink) {
    const icon = <img className="device-hint-icon" src={iconNormal} alt={iconNormal}/>;
    if (['wifi', '4g', '3g'].includes(effectiveType)) {
      return {
        icon,
        text: '当前网络检测已通过'
      };
    }
    if (effectiveType === '2g') {
      return { icon, text: '当前信号差，建议切换网络环境' };
    }
  }
  return {
    icon: <img className="device-hint-icon" src={iconAbnormality} alt={iconAbnormality}/>,
    text: '当前无网络，请检查后重新尝试'
  };
};

/**
 * 获取默认设备id
 * 优先获取deviceId为default为默认设备id，其次获取第一个设备的deviceId
 * @param devices
 */
const getDefaultDeviceId = (devices: MediaDeviceInfo[]): string => {
  return devices.find(device => device.deviceId === 'default')?.deviceId ||
    devices[0]?.deviceId || '';
};

const DeviceTestPanel: React.FC<DeviceTestPanelProps> = props => {
  const { onRetest, className, ...restProps } = props;

  const videoRef = useRef<HTMLDivElement>(null);

  const [volumeLevel, setVolumeLevel] = useState<number>(0);

  const [currentCameraDeviceId, setCurrentCameraDeviceId] = useState<string>();
  const [currentMicrophoneDeviceId, setCurrentMicrophoneDeviceId] = useState<string>();
  const [currentPlaybackDeviceId, setCurrentPlaybackDeviceId] = useState<string>();

  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [microphoneDevices, setMicrophoneDevices] = useState<MediaDeviceInfo[]>([]);
  const [playbackDevices, setPlaybackDevices] = useState<MediaDeviceInfo[]>([]);

  const [currentCameraTrack, setCurrentCameraTrack] = useState<QNCameraVideoTrack>();
  const [currentMicrophoneTrack, setCurrentMicrophoneTrack] = useState<QNMicrophoneAudioTrack>();

  const networkState = useNetwork();

  /**
   * 摄像头采集并预览
   * 当摄像头设备id发生变化时，重新采集并预览摄像头
   */
  useEffect(() => {
    if (currentCameraDeviceId) {
      QNRTC.createCameraVideoTrack({
        tag: 'camera',
        cameraId: currentCameraDeviceId,
      }).then(track => {
        setCurrentCameraTrack(track);
      }).catch(error => {
        Modal.error({
          title: '获取摄像头失败',
          content: `摄像头采集失败，请检查摄像头权限是否开启，错误信息：${error.message}`,
        });
      });
    }
  }, [currentCameraDeviceId]);
  useEffect(() => {
    const container = videoRef.current;
    if (container) {
      currentCameraTrack?.play(container).catch(error => {
        Modal.error({
          title: '播放摄像头失败',
          content: `摄像头视频播放失败，请点击确认重试，错误信息：${error.message}`,
          okText: '确认',
        });
      });
    }
    return () => {
      currentCameraTrack?.destroy();
    };
  }, [currentCameraTrack]);

  /**
   * 麦克风采集并预览
   * 当摄麦克风设备id发生变化时，重新采集并预览麦克风
   */
  useEffect(() => {
    if (currentMicrophoneDeviceId) {
      QNRTC.createMicrophoneAudioTrack({
        tag: 'microphone',
        microphoneId: currentMicrophoneDeviceId,
      }).then(track => {
        setCurrentMicrophoneTrack(track);
      }).catch(error => {
        Modal.error({
          title: '获取麦克风失败',
          content: `麦克风采集失败，请检查摄像头权限是否开启，错误信息：${error.message}`,
        });
      });
    }
  }, [currentMicrophoneDeviceId]);
  useEffect(() => {
    const updateVolumeLevel = (track: QNMicrophoneAudioTrack) => {
      const volumeLevel = track?.getVolumeLevel() || 0;
      setVolumeLevel(volumeLevel);
      window.requestAnimationFrame(() => {
        updateVolumeLevel(track);
      });
    };
    if (currentMicrophoneTrack) {
      updateVolumeLevel(currentMicrophoneTrack);
    }
    return () => {
      currentMicrophoneTrack?.destroy();
    };
  }, [currentMicrophoneTrack]);

  /**
   * 获取枚举设备
   */
  useEffect(() => {
    QNRTC.getCameras(true).then(cameras => setCameraDevices(cameras));
    QNRTC.getMicrophones(true).then(microphones => setMicrophoneDevices(microphones));
    QNRTC.getPlaybackDevices(true).then(playbackDevices => setPlaybackDevices(playbackDevices));

    QNRTC.onCameraChanged = () => {
      QNRTC.getCameras(true).then(cameras => setCameraDevices(cameras));
    };
    QNRTC.onMicrophoneChanged = () => {
      QNRTC.getMicrophones(true).then(microphones => setMicrophoneDevices(microphones));
    };
    QNRTC.onPlaybackDeviceChanged = () => {
      QNRTC.getPlaybackDevices(true).then(playbackDevices => setPlaybackDevices(playbackDevices));
    };

    return () => {
      QNRTC.onCameraChanged = undefined;
      QNRTC.onMicrophoneChanged = undefined;
      QNRTC.onPlaybackDeviceChanged = undefined;
    };
  }, []);

  /**
   * 设置选中的摄像头
   */
  useEffect(() => {
    setCurrentCameraDeviceId(
      getDefaultDeviceId(cameraDevices)
    );
  }, [cameraDevices]);
  /**
   * 设置选中的麦克风
   */
  useEffect(() => {
    setCurrentMicrophoneDeviceId(
      getDefaultDeviceId(microphoneDevices)
    );
  }, [microphoneDevices]);
  /**
   * 设置选中的扬声器
   * TODO: 由于qnweb-rtc未对选择指定扬声器进行播放的功能，所以扬声器相关的功能只支持枚举，暂不支持切换
   */
  useEffect(() => {
    setCurrentPlaybackDeviceId(
      getDefaultDeviceId(playbackDevices)
    );
  }, [playbackDevices]);


  const onCameraDeviceChange = (value: string) => {
    setCurrentCameraDeviceId(value);
  };
  const onMicrophoneDeviceChange = (value: string) => {
    setCurrentMicrophoneDeviceId(value);
  };
  const onPlaybackDeviceChange = (value: string) => {
    setCurrentPlaybackDeviceId(value);
  };

  return <div className={classNames('device-test-panel', className)} {...restProps}>
    <h1 className="main-title">设备检测</h1>
    <div className="device-test-panel-services">
      <div
        className={classNames('test-video', { 'test-video-mirror': currentCameraDeviceId })}
        ref={videoRef}
      >
        {
          currentCameraDeviceId ? null : <div className="test-video-error">
            <div className="test-video-error-hint">摄像头未授权</div>
          </div>
        }
      </div>
      <div className="device-manager">
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">浏览器兼容性</div>
            <div className="device-hint">
              {
                QNRTC.isBrowserSupported() ? <>
                  <img
                    src={iconNormal}
                    alt=""
                    className="device-hint-icon"
                  />
                  <span>当前浏览器兼容性检测已通过</span>
                </> : <>
                  <img
                    src={iconAbnormality}
                    alt=""
                    className="device-hint-icon"
                  />
                  <span>当前浏览器兼容性检测未通过</span>
                </>
              }
            </div>
          </div>
        </div>
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">摄像头</div>
            {
              currentCameraDeviceId ? <Select
                className="device-select"
                value={currentCameraDeviceId}
                onChange={onCameraDeviceChange}
              >
                {
                  cameraDevices.map(device => <Select.Option
                    value={device.deviceId}
                    key={device.deviceId}
                  >{device.label}</Select.Option>)
                }
              </Select> : <div className="device-select">未授权</div>
            }
          </div>
        </div>
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">麦克风</div>
            {
              currentMicrophoneDeviceId ? <>
                <Select
                  className="device-select"
                  value={currentMicrophoneDeviceId}
                  onChange={onMicrophoneDeviceChange}
                >
                  {
                    microphoneDevices.map(device => <Select.Option
                      value={device.deviceId}
                      key={device.deviceId}
                    >{device.label}</Select.Option>)
                  }
                </Select>
                <div className="volume-graph">
                  {
                    Array.from(Array(volumeNumber)).map((item, index) => {
                      const isActive = index <= volumeLevel * volumeNumber;
                      return <div
                        key={index}
                        className={classNames('volume-bar', { 'green-volume': isActive })}
                      ></div>;
                    })
                  }
                </div>
              </> : <div className="device-select">未授权</div>
            }
          </div>
        </div>
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">扬声器</div>
            {
              playbackDevices.length ? <>
                <Select
                  className="device-select"
                  value={currentPlaybackDeviceId}
                  onChange={onPlaybackDeviceChange}
                  disabled
                >
                  {
                    playbackDevices.map(device => <Select.Option
                      value={device.deviceId}
                      key={device.deviceId}
                    >{device.label}</Select.Option>)
                  }
                </Select>
                <Audio/>
              </> : <div className="device-select">未授权</div>
            }
          </div>
        </div>
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">网络检测</div>
            <div className="device-hint">
              {renderNetworkState(networkState).icon}
              <span>{renderNetworkState(networkState).text}</span>
            </div>
          </div>
        </div>

        <div className="device-test-panel-retest">
          <button className="button" onClick={onRetest}>重新检测</button>
        </div>
      </div>
    </div>
  </div>;
};

export default DeviceTestPanel;
