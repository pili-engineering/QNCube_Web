import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import { TrackModeSession } from 'pili-rtc-web';
import classNames from 'classnames';

import VideoRemote, { LeaveUser } from '@/components/video-remote';
import IMRemote from '@/components/im-remote';
import { endInterview, leaveInterview } from '@/api';
import { ClipboardButtonProps } from '@/components/clipboard-button';
import { useInterviewRoomInitialize } from '@/hooks';

import styles from './index.module.scss';

const Room: React.FC = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const history = useHistory();
  const [leaveUser, setLeaveUser] = useState<LeaveUser>();
  const [roomSession, setRoomSession] = useState<TrackModeSession | null>(null);
  const {
    interview, roomToken, onlineUserList,
    allUserList, curUser, showLeaveInterview,
    interviewRoomJoined, imConfig
  } = useInterviewRoomInitialize(interviewId);

  useEffect(() => {
    setRoomSession(new TrackModeSession());
  }, [])

  // 离开面试房间
  const leaveRoom = () => {
    history.goBack();
    return leaveInterview({
      interviewId
    });
  }

  // 结束本轮面试
  const endRoom = () => {
    history.goBack();
    return endInterview({
      interviewId
    });
  }

  /**
   * 复制文本配置
   */
  const copyConfig: ClipboardButtonProps = {
    text: window.location.href,
    type: 'text',
    onCopy(text: string, result: boolean) {
      if (result) {
        message.success('复制成功');
      } else {
        message.error('复制失败');
      }
    }
  };

  return <div className={styles.container}>
    <div className={styles.body}>
      <div className={classNames(styles.rtcModule, {
        [styles.rtcModuleLoading]: !roomToken
      })}>
        {
          roomToken ? <VideoRemote
            roomSession={roomSession}
            title={`${interview?.candidateName}的面试房间`}
            interviewId={interviewId}
            roomToken={roomToken}
            onlineUserList={onlineUserList}
            allUserList={allUserList}
            userInfo={curUser}
            showLeaveInterview={showLeaveInterview}
            onBroadcastUserLeave={user => setLeaveUser(user)}
            leaveRoom={leaveRoom}
            endRoom={endRoom}
            roleCode={interview?.roleCode}
          /> : <Spin tip='房间数据加载中...' />
        }
      </div>
      <IMRemote
        copyConfig={copyConfig}
        interviewId={interviewId}
        className={styles.chat}
        candidateName={interview?.candidateName}
        career={interview?.career}
        onlineUserList={onlineUserList}
        allUserList={allUserList}
        userInfo={curUser}
        leaveUser={leaveUser}
        imConfig={imConfig}
        interviewRoomJoined={interviewRoomJoined}
      />
    </div>
  </div>;
};

export default Room;
