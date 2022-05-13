import { useEffect, useRef, useState } from 'react';
import { BaseUserInfo, heartBeatInterview, IMConfig, Interview, joinInterview } from '@/api';

export const useInterviewRoomInitialize = (interviewId?: string) => {
  const [interview, setInterview] = useState<Partial<Interview>>();
  const [roomToken, setRoomToken] = useState<string>();
  const [onlineUserList, setOnlineUserList] = useState<BaseUserInfo[]>();
  const [allUserList, setAllUserList] = useState<BaseUserInfo[]>();
  const [curUser, setCurUser] = useState<BaseUserInfo>();
  const [showLeaveInterview, setShowLeaveInterview] = useState(false);
  const [imConfig, setImConfig] = useState<IMConfig>();
  const heartBeatTimer = useRef<NodeJS.Timer | null>(null);
  const [interviewRoomJoined, setInterviewRoomJoined] = useState<boolean>(false);

  useEffect(() => {
    // 心跳监听
    async function listenHeartBeat(interviewId: string) {
      const heartBeatRes = await heartBeatInterview({
        interviewId
      });
      setOnlineUserList(heartBeatRes.onlineUserList);
      setShowLeaveInterview(heartBeatRes.options.showLeaveInterview);
      heartBeatTimer.current = setTimeout(() => {
        listenHeartBeat(interviewId);
      }, heartBeatRes.interval * 1000);
    }
    if (interviewId) {
      joinInterview({
        interviewId
      }).then(res => {
        setInterview(res.interview);
        setRoomToken(res.roomToken);
        setOnlineUserList(res.onlineUserList);
        setAllUserList(res.allUserList);
        setCurUser(res.userInfo);
        setInterviewRoomJoined(true);
        setImConfig(res.imConfig);
        return listenHeartBeat(interviewId);
      })
    }
    return () => {
      if (heartBeatTimer.current) clearTimeout(heartBeatTimer.current);
    };
  }, [interviewId]);
  return {
    interview,
    roomToken,
    onlineUserList,
    allUserList,
    curUser,
    showLeaveInterview,
    interviewRoomJoined,
    imConfig
  }
}
