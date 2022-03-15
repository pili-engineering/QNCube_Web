import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import VideoRemote, { LeaveUser } from '@/components/video-remote';
import IMRemote from '@/components/im-remote';
import { endInterview, leaveInterview } from '@/api';
import { message, Spin } from 'antd';
import { TrackModeSession } from 'pili-rtc-web';
import classNames from 'classnames';
import { ClipboardButtonProps } from '@/components/clipboard-button';
import { useInterviewRoomInitialize } from '@/hooks';
import css from './index.module.scss';

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

  useEffect(() => {
    setRoomSession(new TrackModeSession());
  }, [])

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

  return <div className={css.room}>
    <div className={css.remote}>
      <div className={classNames(css.rtcModule, {
        [css.rtcModuleLoading]: !roomToken
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
        className={css.chat}
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