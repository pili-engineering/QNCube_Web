import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { log } from '@/utils';
import MediaDetector from '@/components/media-detector';
import MobileMediaDetector from '@/components/mobile-media-detector';
import RecorderDetector from '@/components/recorder-detector';
import { DeviceDetectorProps } from '@/pages/student/detector';

import styles from './index.module.scss';

/**
 * 设备检测
 * @param props
 * @constructor
 */
const DeviceDetector: React.FC<DeviceDetectorProps> = (props) => {
  const {
    mtTrackRoomMicSeats = [], mtTrackRoom, roomId,
  } = props;
  const [mediaMenus] = useState([
    { title: '摄像头和麦克风检测', value: 0 },
    { title: '副摄像头检测', value: 1 },
    { title: 'pc端录屏功能检测', value: 2 },
  ]);
  const [currentMediaMenu, setCurrentMediaMenu] = useState(0);
  const latestMobileSeat = useMemo(
    () => mtTrackRoomMicSeats.slice().reverse().find(
      (s) => s.userExtension?.userExtRoleType === 'mobile',
    ),
    [mtTrackRoomMicSeats],
  );

  /**
   * 移动端摄像头预览
   */
  useEffect(() => {
    if (
      currentMediaMenu === 1
      && mtTrackRoom
      && latestMobileSeat
    ) {
      log.log('latestMobileSeat', latestMobileSeat);
      mtTrackRoom.setUserCameraWindowView(
        latestMobileSeat.uid,
        'mobile-camera',
      );
    }
  }, [currentMediaMenu, latestMobileSeat, mtTrackRoom]);

  const qrCodeUrl = useMemo(() => {
    return `${window.location.origin}/mobile-camera?roomId=${roomId}`
  }, [roomId]);

  return (
    <div className={styles.deviceDetector}>
      <div className={styles.deviceMenu}>
        {
          mediaMenus.map((menuItem) => (
            <div
              key={menuItem.value}
              className={classNames(styles.deviceItem, {
                [styles.deviceActive]: currentMediaMenu === menuItem.value,
              })}
              onClick={() => {
                setCurrentMediaMenu(menuItem.value);
              }}
            >
              {menuItem.title}
            </div>
          ))
        }
      </div>
      <div className={styles.frame}>
        {currentMediaMenu === 0 ? <MediaDetector /> : null}
        {currentMediaMenu === 1 ? <MobileMediaDetector qrCodeUrl={qrCodeUrl} /> : null}
        {currentMediaMenu === 2 ? <RecorderDetector /> : null}
      </div>
    </div>
  );
};

export default DeviceDetector;
