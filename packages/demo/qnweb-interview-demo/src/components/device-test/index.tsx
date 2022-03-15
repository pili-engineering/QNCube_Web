import React, { useEffect, useRef, useState } from 'react';
import { deviceManager, browserReport, Track } from 'pili-rtc-web';
import { Button, Modal, Select } from 'antd';
import classNames from 'classnames';
import Audio from '../audio';
import { useNetwork } from '../../hooks';
import './index.scss';

const { Option } = Select;

interface DeviceTestProps {
  onRetest: () => void;
}

const DeviceTest: React.FC<DeviceTestProps> = props => {
  const videoRef = useRef<HTMLDivElement>(null);
  const collectionTracks = useRef<Array<Track>>([]);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const volumeNumber = 32;

  const { onRetest } = props;

  const network = useNetwork();

  // 设备列表
  const [devices, setDevices] = useState<{
    audioinput: MediaDeviceInfo[];
    audiooutput: MediaDeviceInfo[];
    videoinput: MediaDeviceInfo[];
  }>({
    audioinput: [],
    audiooutput: [],
    videoinput: []
  });

  // 当前选择的设备
  const [curDevices, setCurDevices] = useState<{
    audioinput: string;
    audiooutput: string;
    videoinput: string;
  }>({
    audioinput: '',
    audiooutput: '',
    videoinput: ''
  });

  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [missingAuth, setMissingAuth] = useState<Array<'video' | 'audio'>>([]);

  const [reGetLocalTracksCount, setReGetLocalTracksCount] = useState(0);

  /**
   * 采集本地的媒体数据，以 Track 的形式返回
   * https://doc.qnsdk.com/rtn/web/docs/api_device_manager_track#1
   */
  const getLocalTracks = async function (): Promise<Array<Track>> {
    const videoTrack = await deviceManager.getLocalTracks({ video: { enabled: true } }).catch(() => []);
    const audioTrack = await deviceManager.getLocalTracks({ audio: { enabled: true } }).catch(() => []);
    return [
      ...videoTrack,
      ...audioTrack
    ];
  };

  /**
   * select切换
   * @param type
   * @param value
   */
  const onChange = (type: MediaDeviceKind, value: string) => {
    setReGetLocalTracksCount(reGetLocalTracksCount + 1)
    setCurDevices({
      ...curDevices,
      [type]: value
    });
  };

  /**
   * 采集媒体信息
   */
  useEffect(() => {
    const deviceInfo = deviceManager.deviceInfo || [];
    deviceInfo.forEach(device => {
      setDevices(prevDevices => {
        return {
          ...prevDevices,
          [device.kind]: prevDevices[device.kind].concat(device)
        };
      });
    });
  }, [])
  useEffect(() => {
    /**
     * 获取当前扬声器的音量
     * @param audioTrack
     */
    const getCurrentVolumeLevel = (audioTrack: Track): void => {
      const volumeLevel = audioTrack.getCurrentVolumeLevel();
      setVolumeLevel(volumeLevel);
      window.requestAnimationFrame(() => {
        getCurrentVolumeLevel(audioTrack);
      });
    };
    getLocalTracks().then(tracks => {
      collectionTracks.current = tracks || [];
      const videoTrack = collectionTracks.current.find(track => track.info.kind === 'video');
      const audioTrack = collectionTracks.current.find(track => track.info.kind === 'audio');
      if (audioTrack) {
        getCurrentVolumeLevel(audioTrack);
        audioTrack.startAudioSource();
        audioTrack.play(document.body);
      } else {
        // 缺少音频设备
        setMissingAuth(prevMissingAuth => [
          ...prevMissingAuth,
          'audio'
        ]);
      }
      if (videoRef.current) {
        if (videoTrack) {
          videoTrack.play(videoRef.current);
        } else {
          // 缺少视频设备
          setMissingAuth(prevMissingAuth => [
            ...prevMissingAuth,
            'video'
          ]);
        }
      }
    });
    return () => {
      /**
       * 释放 Track
       * https://doc.qnsdk.com/rtn/web/docs/api_track#13_0
       */
      collectionTracks.current?.forEach(track => track.release());
    };
  }, [reGetLocalTracksCount]);

  /**
   * 切换当前选中的设备
   */
  useEffect(() => {
    const getDefault = (devices: MediaDeviceInfo[]): MediaDeviceInfo | undefined => {
      return devices.find((device: MediaDeviceInfo) => device.deviceId === 'default') || devices[0];
    };
    const audioinputDefault = getDefault(devices.audioinput);
    const audiooutputDefault = getDefault(devices.audiooutput);
    const videoinputDefault = getDefault(devices.videoinput);
    setCurDevices({
      audioinput: audioinputDefault ? audioinputDefault.deviceId : '',
      audiooutput: audiooutputDefault ? audiooutputDefault.deviceId : '',
      videoinput: videoinputDefault ? videoinputDefault.deviceId : ''
    });
  }, [devices]);

  useEffect(() => {
    const visible = !!missingAuth.length;
    setAuthModalVisible(visible);
  }, [missingAuth]);

  return <div className="device-test">
    <Modal
      title="没有权限"
      closable={false}
      centered
      cancelText=""
      visible={authModalVisible}
      footer={
        <Button onClick={() => setAuthModalVisible(false)} type="primary">知道了</Button>
      }
    >
      <p>获取摄像头/麦克风权限被拒绝，请手动打开摄像头/麦克风权限后重新进入房间</p>
    </Modal>
    <h1 className="main-title">设备检测</h1>
    <div className="device-test-services">
      <div
        className={classNames('test-video', { 'test-video-mirror': !missingAuth.includes('video') })}
        ref={videoRef}
      >
        {
          missingAuth.includes('video') && <div className="test-video-error">
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
                browserReport && browserReport.support ? <>
                  <img src={require(`../../assets/images/icon-normal.svg`).default} alt=""
                       className="device-hint-icon"/>
                  <span>当前浏览器兼容性检测已通过</span>
                </> : <>
                  <img src={require(`../../assets/images/icon-abnormality.svg`).default} alt=""
                       className="device-hint-icon"/>
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
              missingAuth.includes('video') ? <div className="device-select">未授权</div> : <Select
                className="device-select"
                value={curDevices.videoinput}
                onChange={value => onChange('videoinput', value)}
              >
                {
                  devices.videoinput.map(device => <Option
                    value={device.deviceId}
                    key={device.deviceId}
                  >{device.label}</Option>)
                }
              </Select>
            }
          </div>
        </div>
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">麦克风</div>
            {
              missingAuth.includes('audio') ? <div className="device-select">未授权</div> : <>
                <Select
                  className="device-select"
                  value={curDevices.audioinput}
                  onChange={value => onChange('audioinput', value)}
                >
                  {
                    devices.audioinput.map(device => <Option
                      value={device.deviceId}
                      key={device.deviceId}
                    >{device.label}</Option>)
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
              </>
            }
          </div>
        </div>
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">扬声器</div>
            {
              missingAuth.includes('audio') ? <div className="device-select">未授权</div> : <>
                <Select
                  className="device-select"
                  value={curDevices.audiooutput}
                  onChange={value => onChange('audiooutput', value)}
                >
                  {
                    devices.audiooutput.map(device => <Option
                      value={device.deviceId}
                      key={device.deviceId}
                    >{device.label}</Option>)
                  }
                </Select>
                <Audio/>
              </>
            }
          </div>
        </div>
        <div className="device-item">
          {/*<div className="device-icon"></div>*/}
          <div className="device-info">
            <div className="device-label">网络检测</div>
            <div className="device-hint">
              <img
                src={require(`../../assets/images/${network.text === '当前网络检测已通过' ? 'icon-normal' : 'icon-abnormality'}.svg`).default}
                alt="" className="device-hint-icon"/>
              <span>{network.text}</span>
            </div>
          </div>
        </div>

        <div className="device-test-retest">
          <button className="button" onClick={onRetest}>重新检测</button>
        </div>
      </div>
    </div>
  </div>;
};

export default DeviceTest;