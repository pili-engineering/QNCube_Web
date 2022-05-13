import { Button, message, Modal, Steps } from 'antd';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { MutableTrackRoom, MutableTrackRoomSeat } from 'qnweb-high-level-rtc';
import { QNExamClient } from 'qnweb-exam-sdk';

import { getUrlQueryParams, log } from '@/utils';
import useExamInfo from '@/hooks/useExamInfo';
import StudentInfoCard from '@/components/student-info-card';
import IdentityAuth, { IdentityAuthResult } from '@/components/identity-auth';
import useMtTrackRoom from '@/hooks/useMtTrackRoom';
import DeviceDetector from '@/pages/student/detector/device-detector';
import useRoomJoin from '@/hooks/useRoomJoin';

import styles from './index.module.scss';
import useRoomHeart from '@/hooks/useRoomHeart';
import { QNRemoteAudioTrack, QNRemoteVideoTrack } from 'qnweb-rtc';

log.setPreTitle('[DeviceDetector]');

const { Step } = Steps;

export interface DeviceDetectorProps {
  mtTrackRoomMicSeats?: MutableTrackRoomSeat[];
  mtTrackRoom?: MutableTrackRoom;
  roomId?: string;
  onPass?: () => void;
}

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

  const { createAndJoinRoomApi, roomInfo } = useRoomJoin();
  const { enableHeart } = useRoomHeart();

  const { micSeats: mtTrackRoomMicSeats, room: mtTrackRoom } = useMtTrackRoom();
  const [currentStep, setCurrentStep] = useState(0);
  const [identityAuthResult, setIdentityAuthResult] = useState<IdentityAuthResult>();
  const { examInfo } = useExamInfo(urlQueryRef.current.examId);
  const [stepKey, setStepKey] = useState<{ [key: string]: number }>({
    step1: 1,
    step2: 1,
    step3: 1,
  });

  /**
   * 进入房间
   */
  useEffect(() => {
    const examClient = QNExamClient.create();
    const userPublished = async (userID: string, tracks: (QNRemoteAudioTrack | QNRemoteVideoTrack)[]) => {
      await examClient.rtcClient.subscribe(tracks);
      const track = tracks.find((track) => track.tag === 'camera');
      const element = document.getElementById('mobile-camera');
      if (element && track) {
        Modal.info({
          title: '检测到副摄像头接入，点击确认播放视频',
          onOk() {
            track.play(element);
          }
        });
      }
    };
    examClient.rtcClient.on('user-published', userPublished);
    const hide = message.loading('初始化中...', 0);
    createAndJoinRoomApi(urlQueryRef.current.examName).then(result => {
      const roomToken = result.rtcInfo?.roomToken;
      if (roomToken) {
        return examClient.start({
          rtcToken: roomToken
        }).then(() => {
          return result.roomInfo?.roomId;
        });
      }
      return Promise.reject(new TypeError('roomToken is empty'));
    }).then((roomId) => {
      if (roomId) {
        return enableHeart(roomId);
      }
      return Promise.reject(new TypeError('roomId is empty'));
    }).finally(() => {
      hide();
      message.success('初始化成功');
    });
    return () => {
      hide();
      message.destroy();
      examClient.rtcClient.off('user-published', userPublished);
      examClient.stop();
    };
  }, []);

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
      <Steps current={currentStep} style={{ margin: '40px auto', display: 'flex', justifyContent: 'center' }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      {renderContentWithStep(currentStep)}
      {renderFooter()}
    </div>
  );
};

export default Detector;
