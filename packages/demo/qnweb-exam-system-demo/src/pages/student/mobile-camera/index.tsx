import React, { useEffect, useRef } from 'react';
import { message, Modal } from 'antd';
import { ClientRoleType } from 'qnweb-high-level-rtc';
import styles from './index.module.scss';
import useMtTrackRoom from '../../../hooks/useMtTrackRoom';
import ExamApi from '@/api/ExamApi';
import { getUrlQueryParams } from '@/utils';

const MobileCamera = () => {
  const urlQueryRef = useRef({
    roomId: getUrlQueryParams('roomId') || '',
  });
  const { room: mtTrackRoom } = useMtTrackRoom();

  /**
   * 加入rtc房间
   */
  useEffect(() => {
    if (mtTrackRoom) {
      const hide = message.loading('加入房间中...', 0);
      mtTrackRoom.setClientRoleType(ClientRoleType.CLIENT_ROLE_BROADCASTER);
      mtTrackRoom.setUpLocalCameraParams({
        facingMode: 'user',
      });
      ExamApi.examRoomToken({
        roomId: urlQueryRef.current.roomId,
      }).then((result) => {
        return mtTrackRoom.joinRoom({
          roomToken: result.roomToken,
        }, {
          userExtRoleType: 'mobile',
        });
      }).then(() => mtTrackRoom.enableCamera())
        .then(() => {
          return new Promise((resolve, reject) => {
            Modal.info({
              title: '加入房间',
              okText: '加入',
              onOk() {
                resolve(
                  mtTrackRoom.setLocalCameraWindowView('mobile-camera')
                )
              },
              onCancel() {
                reject(new Error('cancel'))
              }
            })
          })
        })
        .then(() => {
          message.success('加入成功')
        })
        .catch((error) => {
          Modal.error({
            title: '开启摄像头失败',
            content: JSON.stringify(error),
          });
        })
        .finally(() => hide());
    }
  }, [mtTrackRoom]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      mtTrackRoom.leaveRoom()
    };
    if (mtTrackRoom) {
      window.addEventListener('beforeunload', handler);
      return () => {
        mtTrackRoom.leaveRoom();
        window.removeEventListener('beforeunload', handler);
      };
    }
  }, [mtTrackRoom])

  return (
    <div className={styles.container} id="mobile-camera"/>
  );
};

export default MobileCamera;
