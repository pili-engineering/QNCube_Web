import { useEffect, useRef, useState } from 'react';
import { BaseUserInfo, heartBeatInterview } from '@/api';

const useInterviewHeartBeat = (interviewId: string) => {
  const timer = useRef<NodeJS.Timer>();
  const [onlineUserList, setOnlineUserList] = useState<BaseUserInfo[]>([]);
  const [showLeaveInterview, setShowLeaveInterview] = useState(false);

  useEffect(() => {
    // 心跳监听
    async function listenHeartBeat() {
      const heartBeatRes = await heartBeatInterview({
        interviewId
      });
      setOnlineUserList(heartBeatRes.onlineUserList);
      setShowLeaveInterview(heartBeatRes.options.showLeaveInterview);
      timer.current = setTimeout(() => {
        listenHeartBeat();
      }, heartBeatRes.interval * 1000);
    }

    listenHeartBeat();
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [interviewId]);

  return {
    onlineUserList, showLeaveInterview
  };
};

export default useInterviewHeartBeat;