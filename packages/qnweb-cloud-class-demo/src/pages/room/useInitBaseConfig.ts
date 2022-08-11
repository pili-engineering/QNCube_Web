import { useContext, useState } from 'react';
import { useMount } from 'ahooks';

import {
  RoomApi,
  BaseJoinRoomApiResponseData,
  BaseRoomClassType,
  BaseRoomRole,
} from '@/api';
import { getUrlQueryParams } from '@/utils';
import { UserStoreContext } from '@/store';

const useInitBaseConfig = () => {
  const [roomId] = useState(() => getUrlQueryParams<string>('roomId'));
  const [role] = useState(() => getUrlQueryParams<BaseRoomRole>('role'));
  const [baseRoomJoined, setBaseRoomJoined] = useState(false);
  const [baseRoomInfo, setBaseRoomInfo] = useState<BaseJoinRoomApiResponseData['roomInfo']>();
  const [baseUserInfo, setBaseUserInfo] = useState<BaseJoinRoomApiResponseData['userInfo']>();
  const [baseRtcInfo, setBaseRtcInfo] = useState<BaseJoinRoomApiResponseData['rtcInfo']>();
  const [baseAllUserList, setBaseAllUserList] = useState<BaseJoinRoomApiResponseData['allUserList']>([]);
  const [baseImConfig, setBaseImConfig] = useState<BaseJoinRoomApiResponseData['imConfig']>();
  // 1: 小班课，2: 1v1
  const [classType, setClassType] = useState<BaseRoomClassType>();
  const [roomToken, setRoomToken] = useState<string>();
  const [userExtension, setUserExtension] = useState<string>();
  const [imConfig, setImConfig] = useState<{
    appKey: string;
    loginAccount: {
      name: string;
      password: string;
    };
    chatRoomId: string
  }>();
  const { state } = useContext(UserStoreContext);
  /**
   * 初始化
   */
  useMount(() => {
    if (roomId) {
      RoomApi.baseJoinRoomApi({
        roomId,
        params: [
          { key: 'role', value: role },
        ],
      }).then((response) => {
        setBaseRoomJoined(true);
        setBaseRoomInfo(response.roomInfo);
        setBaseUserInfo(response.userInfo);
        setBaseRtcInfo(response.rtcInfo);
        setBaseAllUserList(response.allUserList);
        setBaseImConfig(response.imConfig);
        setClassType(response.roomInfo?.params?.find(
          (p) => p.key === 'classType',
        )?.value as BaseRoomClassType);
        setRoomToken(response.rtcInfo?.roomToken);
        setUserExtension(JSON.stringify({
          uid: state.userInfo?.accountId,
          userExtRoleType: role,
          userExtProfile: {
            name: response.userInfo?.nickname,
            avatar: response.userInfo?.avatar,
          },
          userExtensionMsg: '',
        }));
        setImConfig({
          appKey: 'cigzypnhoyno',
          loginAccount: {
            name: state.imConfig?.imUsername || '',
            password: state.imConfig?.imPassword || '',
          },
          chatRoomId: `${response.imConfig?.imGroupId}`,
        });
      });
    }
  });

  return {
    roomId,
    role,
    baseRoomJoined,
    classType,
    roomToken,
    userExtension,
    imConfig,
    baseRoomInfo,
    baseUserInfo,
    baseRtcInfo,
    baseAllUserList,
    baseImConfig,
    stateImConfig: state.imConfig,
    stateUserInfo: state.userInfo,
    stateAuthorization: state.authorization,
  };
};

export default useInitBaseConfig;
