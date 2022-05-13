import { useCallback, useRef, useState } from 'react';
import { useInterval } from 'ahooks';

import * as API from '@/api';

type Result = API.JoinInterviewRes;

const useInterviewApi = (): {
  interview?: Result['interview'],
  userInfo?: Result['userInfo'],
  roomToken?: string,
  onlineUserList?: Result['onlineUserList'],
  allUserList?: Result['allUserList'],
  imConfig?: Result['imConfig'],
  showLeaveInterview: boolean,
  joinInterview: (params: API.InterviewIdReq) => Promise<Result>,
  enableHeartBeat: (interviewId: string) => Promise<void>,
  disableHeartbeat: () => void,
} => {
  const [interview, setInterview] = useState<Result['interview']>();
  const [userInfo, setUserInfo] = useState<Result['userInfo']>();
  const [roomToken, setRoomToken] = useState<string>();
  const [onlineUserList, setOnlineUserList] = useState<Result['onlineUserList']>();
  const [allUserList, setAllUserList] = useState<Result['allUserList']>();
  const [imConfig, setIMConfig] = useState<Result['imConfig']>();
  const [showLeaveInterview, setShowLeaveInterview] = useState(false);

  const [delay, setDelay] = useState<number>();

  const interviewIdRef = useRef<string>();

  /**
   * 心跳
   */
  useInterval(() => {
    const interviewId = interviewIdRef.current;
    if (interviewId) {
      enableHeartBeat(interviewId).then(() => {
        console.log('heart beat success');
      });
    } else {
      console.log(`heart beat fail: interviewId is ${interviewId}`);
    }
  }, delay && delay * 1000);

  /**
   * 开启心跳监听
   */
  const enableHeartBeat = useCallback((interviewId: string) => {
    interviewIdRef.current = interviewId;
    return API.heartBeatInterview({
      interviewId,
    }).then(result => {
      setDelay(result.interval);
      setShowLeaveInterview(result.options.showLeaveInterview);
      setOnlineUserList(result.onlineUserList);
    });
  }, []);

  /**
   * 关闭心跳监听
   */
  const disableHeartbeat = useCallback(() => {
    setDelay(undefined);
  }, []);

  /**
   * 加入面试
   */
  const joinInterview = useCallback((params: API.InterviewIdReq) => {
    return API.joinInterview(params).then(result => {
      setInterview(result.interview);
      setUserInfo(result.userInfo);
      setRoomToken(result.roomToken);
      setOnlineUserList(result.onlineUserList);
      setAllUserList(result.allUserList);
      setIMConfig(result.imConfig);
      return result;
    });
  }, []);

  return {
    interview,
    userInfo,
    roomToken,
    onlineUserList,
    allUserList,
    imConfig,
    showLeaveInterview,
    joinInterview,
    enableHeartBeat,
    disableHeartbeat,
  };
};

export default useInterviewApi;
