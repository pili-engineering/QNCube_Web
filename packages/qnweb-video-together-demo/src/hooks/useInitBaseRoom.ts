import { useContext, useEffect, useState } from 'react';
import { baseJoinRoomApi, BaseJoinRoomApiResponseData } from '@/api/baseRoomApi';
import { QNIMConfig } from '@/hooks/useQNIM';
import { UserStoreContext } from '@/store/UserStore';

const useInitBaseRoom = (invitationCode?: string | null) => {
  const [baseRoomJoined, setBaseRoomJoined] = useState(false);
  const [baseRoomInfo, setBaseRoomInfo] = useState<BaseJoinRoomApiResponseData['roomInfo']>();
  const [baseUserInfo, setBaseUserInfo] = useState<BaseJoinRoomApiResponseData['userInfo']>();
  const [baseRtcInfo, setBaseRtcInfo] = useState<BaseJoinRoomApiResponseData['rtcInfo']>();
  const [baseAllUserList, setBaseAllUserList] = useState<BaseJoinRoomApiResponseData['allUserList']>([]);
  const [baseImConfig, setBaseImConfig] = useState<BaseJoinRoomApiResponseData['imConfig']>();
  const [roomToken, setRoomToken] = useState<string>();
  const [imConfig, setImConfig] = useState<QNIMConfig>();
  const [movieValue, setMovieValue] = useState<string | null | undefined>();
  const { state } = useContext(UserStoreContext);
  /**
   * 初始化
   */
  useEffect(() => {
    if (invitationCode) {
      baseJoinRoomApi({
        params: [
          { key: 'invitationCode', value: invitationCode },
        ],
      }).then((response) => {
        const movie = response.roomInfo?.attrs?.find(
          (attr) => attr.key === 'watch_movie_together',
        );
        const movieResult = movie?.value as string;
        setBaseRoomInfo(response.roomInfo);
        setBaseUserInfo(response.userInfo);
        setBaseRtcInfo(response.rtcInfo);
        setBaseAllUserList(response.allUserList);
        setBaseImConfig(response.imConfig);
        setRoomToken(response.rtcInfo?.roomToken);
        setMovieValue(movieResult);
        setBaseRoomJoined(true);
      });
    }
  }, [invitationCode]);

  useEffect(() => {
    setImConfig({
      appKey: 'cigzypnhoyno',
      loginAccount: {
        name: state.imConfig?.imUsername,
        password: state.imConfig?.imPassword,
      },
      chatRoomId: `${baseImConfig?.imGroupId}`,
    });
  }, [baseImConfig, state.imConfig]);

  return {
    invitationCode,
    baseRoomJoined,
    roomToken,
    imConfig,
    baseRoomInfo,
    baseUserInfo,
    baseRtcInfo,
    baseAllUserList,
    baseImConfig,
    stateImConfig: state.imConfig,
    stateUserInfo: state.userInfo,
    stateAuthorization: state.authorization,
    movieValue,
  };
};

export default useInitBaseRoom;
