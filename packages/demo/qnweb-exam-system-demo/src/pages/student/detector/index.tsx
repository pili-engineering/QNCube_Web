import { Button, message, Steps } from 'antd';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useMount, useUnmount } from 'ahooks';
import { MutableTrackRoom, MutableTrackRoomSeat } from 'qnweb-high-level-rtc';
import { getUrlQueryParams, log, pandora } from '@/utils';
import useExamInfo from '../../../hooks/useExamInfo';
import StudentInfoCard from '../../../components/student-info-card';
import IdentityAuth, { IdentityAuthResult } from '../../../components/identity-auth';
import MobileMediaDetector from '../../../components/mobile-media-detector';
import MediaDetector from '../../../components/media-detector';
import RecorderDetector from '../../../components/recorder-detector';
import useMtTrackRoom from '../../../hooks/useMtTrackRoom';
import useBaseRoomHeartbeat from '../../../hooks/useBaseRoomHeartbeat';
import useJoinMtTrackRoom from '../../../hooks/useJoinMtTrackRoom';
import styles from './index.module.scss';

log.setPreTitle('[DeviceDetector]');

const { Step } = Steps;

export interface DeviceDetectorProps {
  mtTrackRoomMicSeats?: MutableTrackRoomSeat[];
  mtTrackRoom?: MutableTrackRoom;
  roomId?: string;
  onPass?: () => void;
}

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

  useMount(() => {
    pandora.report({
      action: 'device_detect',
      value: {
        userId: pandora.getCacheValue('userId'),
        role: pandora.getCacheValue('role'),
        pathname: pandora.getCacheValue('pathname'),
      },
    });
  });

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
  const qrCodeUrl = useMemo(() => `${window.location.origin}/mobile-camera?roomId=${roomId}`, [roomId]);
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

const steps = [
  {
    title: '设备检测',
    content: 'first',
  },
  {
    title: '身份认证',
    content: 'second',
  },
  {
    title: '完成',
    content: 'last',
  },
];

const Detector = () => {
  const history = useHistory();
  const urlQueryRef = useRef({
    examId: getUrlQueryParams('examId') || '',
    examName: getUrlQueryParams('examName') || '',
  });
  const { micSeats: mtTrackRoomMicSeats, room: mtTrackRoom } = useMtTrackRoom();
  const { createAndJoinRoom: createAndJoinMtTrackRoom, roomInfo } = useJoinMtTrackRoom();
  const [currentStep, setCurrentStep] = useState(0);
  const [identityAuthResult, setIdentityAuthResult] = useState<IdentityAuthResult>();
  const { setIsEnabled } = useBaseRoomHeartbeat({
    roomId: roomInfo?.roomId,
  });
  const { examInfo } = useExamInfo(urlQueryRef.current.examId);
  const [stepKey, setStepKey] = useState<{[key: string]: number}>({
    step1: 1,
    step2: 1,
    step3: 1,
  });

  /**
   * 进入房间
   */
  useEffect(() => {
    // 创建rtc房间 -> 加入rtc房间
    if (mtTrackRoom) {
      const hide = message.loading('初始化中...', 0);
      createAndJoinMtTrackRoom({
        room: mtTrackRoom,
        title: urlQueryRef.current.examName,
      })
        .then(() => {
          message.success('初始化完成');
          setIsEnabled(true);
        })
        .finally(() => hide());
    }
  }, [createAndJoinMtTrackRoom, mtTrackRoom, setIsEnabled]);

  /**
   * 离开房间
   */
  useUnmount(() => {
    mtTrackRoom?.leaveRoom()
      .then(() => {
        log.log('leaveRoom success');
      });
  });

  /**
   * 开始考试
   */
  const onStartExam = () => {
    localStorage.setItem('idCard', identityAuthResult?.idCard || '');
    localStorage.setItem('fullName', identityAuthResult?.fullName || '');
    history.push(`/student/room?roomId=${roomInfo?.roomId}&examId=${urlQueryRef.current.examId}`);
  };

  /**
   * 根据step渲染内容
   * @param step
   */
  const renderContentWithStep = (step: number) => {
    if (step === 0) {
      return (
        <DeviceDetector
          key={stepKey.step1}
          mtTrackRoomMicSeats={mtTrackRoomMicSeats}
          mtTrackRoom={mtTrackRoom}
          roomId={roomInfo?.roomId}
        />
      );
    }
    if (currentStep === 1) {
      return (
        <IdentityAuth
          key={stepKey.step2}
          style={{ margin: 'auto' }}
          onPass={setIdentityAuthResult}
        />
      );
    }
    if (currentStep === 2) {
      return (
        <StudentInfoCard
          key={stepKey.step3}
          style={{ margin: 'auto' }}
          fullName={identityAuthResult?.fullName || ''}
          idCard={identityAuthResult?.idCard || ''}
          examName={examInfo?.examName || ''}
          duration={examInfo?.duration || 0}
        />
      );
    }
    return null;
  };

  /**
   * 渲染底部
   */
  const renderFooter = () => (
    <div className={styles.footer}>
      {
        currentStep >= steps.length - 1
          ? <Button type="primary" onClick={onStartExam}>开始考试</Button>
          : (
            <>
              <Button
                type="primary"
                onClick={() => {
                  setStepKey({
                    ...stepKey,
                    [`step${currentStep + 1}`]: stepKey[`step${currentStep + 1}`] + 1,
                  });
                }}
                style={{ marginRight: '10px' }}
              >
                重新检测
              </Button>
              <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>下一步</Button>
            </>
          )
      }
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Steps current={currentStep} style={{ margin: '40px auto', display: 'flex', justifyContent: 'center' }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {renderContentWithStep(currentStep)}
        {renderFooter()}
      </div>
    </div>
  );
};

export default Detector;
