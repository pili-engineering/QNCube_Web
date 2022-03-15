import { useEffect, useState } from 'react';
import { BaseUserInfo, IMConfig, Interview, joinInterview } from '@/api';
import { TrackModeSession } from 'pili-rtc-web';
import { Modal } from 'antd';

const useJoinRoom = (
  interviewId: string,
) => {
  const [roomSession, setRoomSession] = useState<TrackModeSession | null>(null);
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [interview, setInterview] = useState<Partial<Interview>>();
  const [roomToken, setRoomToken] = useState<string>();
  const [onlineUserList, setOnlineUserList] = useState<BaseUserInfo[]>();
  const [allUserList, setAllUserList] = useState<BaseUserInfo[]>();
  const [userInfo, setUserInfo] = useState<BaseUserInfo>();
  const [imConfig, setImConfig] = useState<IMConfig>();

  useEffect(() => {
    setRoomSession(new TrackModeSession());
  }, [])

  useEffect(() => {
    if (interviewId && roomSession) {
      joinInterview({ interviewId }).then(res => {
        setInterview(res.interview);
        setRoomToken(res.roomToken);
        setOnlineUserList(res.onlineUserList);
        setAllUserList(res.allUserList);
        setUserInfo(res.userInfo);
        setImConfig(res.imConfig);
        return roomSession.joinRoomWithToken(res.roomToken);
      }).then(() => {
        setIsRoomJoined(true);
      }).catch(e => {
        Modal.error({
          title: '加入房间失败',
          content: e.message
        });
      });
    }
  }, [interviewId, roomSession]);

  return {
    isRoomJoined,
    interview,
    roomToken,
    onlineUserList,
    allUserList,
    userInfo,
    roomSession,
    imConfig
  };
};

export default useJoinRoom;