import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { message, Modal } from 'antd';
import { MicSeatListener, MutableTrackRoomSeat, PubSignaling } from 'qnweb-high-level-rtc';

import * as API from '@/api';
import { useIMStore, useRoomStore } from '@/store';
import { VideoPanel } from './video-panel';
import { ChatPanel } from './chat-panel';
import { UserRtcPlayer } from './user-rtc-player';
import { useJoinRoom } from './utils/useJoinRoom';
import { usePlayer } from './utils/usePlayer';
import { useIM } from './utils/useIM';
import { useMixStream } from './utils/useMixStream';

import styles from './index.module.scss';

enum PlayerElementId {
  Small = 'small-player',
  Large = 'large-player',
  Microphone = 'audios',
}

const Room: React.FC = () => {
  const params = useParams<{ interviewId: string }>();
  const history = useHistory();
  const { state: imStoreState } = useIMStore();
  const imClient = useMemo(() => imStoreState.imClient, [imStoreState.imClient]);
  const { state: roomStoreState } = useRoomStore();
  const roomClient = useMemo(() => roomStoreState.roomClient, [roomStoreState.roomClient]);

  const [inputMessage, setInputMessage] = useState<string>('');

  const [isSwitched, setIsSwitched] = useState(false);
  const [isLocalCameraOn, setIsLocalCameraOn] = useState(false);
  const [isLocalMicrophoneOn, setIsLocalMicrophoneOn] = useState(false);
  const [isLocalScreenOn, setIsLocalScreenOn] = useState(false);

  const { allUserList, interview, showLeaveInterview, isJoined, userInfo, imConfig } = useJoinRoom(params.interviewId);

  const { playerQueue, dispatchPlayerQueue } = usePlayer();

  const largePlayer = useMemo(() => playerQueue[0], [playerQueue[0]]);
  const smallPlayer = useMemo(() => playerQueue[1], [playerQueue[1]]);

  const { messages: imMessages } = useIM({
    initMessage: isJoined,
    imGroupId: `${imConfig?.imGroupId || ''}`,
    username: userInfo?.nickname
  });

  useMixStream({
    enabled: isJoined && interview?.roleCode === 1,
    queue: playerQueue,
    isNeedStart: false
  });

  /**
   * ?????????
   */
  useEffect(() => {
    console.log('largePlayer', largePlayer);
    if (!largePlayer) return;
    if (!largePlayer.isOpen) return;
    if (!largePlayer.uid) return;
    if (!roomClient) return;
    document.querySelector(
      `#${PlayerElementId.Large} video`
    )?.remove();
    if (largePlayer.type === 'camera') {
      roomClient.setUserCameraWindowView(
        largePlayer.uid,
        PlayerElementId.Large
      );
    }
    if (largePlayer.type === 'screen') {
      roomClient.screenTrackTool.setUserScreenWindowView(
        largePlayer.uid,
        PlayerElementId.Large
      );
    }
  }, [roomClient, largePlayer]);

  /**
   * ?????????
   */
  useEffect(() => {
    console.log('smallPlayer', smallPlayer);
    if (!smallPlayer) return;
    if (!smallPlayer.isOpen) return;
    if (!smallPlayer.uid) return;
    if (!roomClient) return;
    document.querySelector(
      `#${PlayerElementId.Small} video`
    )?.remove();
    if (smallPlayer.type === 'camera') {
      roomClient.setUserCameraWindowView(
        smallPlayer.uid,
        PlayerElementId.Small
      );
    }
    if (smallPlayer.type === 'screen') {
      roomClient.screenTrackTool.setUserScreenWindowView(
        smallPlayer.uid,
        PlayerElementId.Small
      );
    }
  }, [roomClient, smallPlayer]);

  /**
   * ?????????????????????
   */
  useEffect(() => {
    const listener: MicSeatListener<MutableTrackRoomSeat> = {
      onMicrophoneStatusChanged: (seat) => {
        if (!seat.isMySeat && seat.isOwnerOpenAudio) { // ??????????????????
          document.querySelector(`#audios audio`)?.remove();
          roomClient?.setUserMicrophoneWindowView(seat.uid, PlayerElementId.Microphone);
        }
      }
    };
    if (roomClient) {
      roomClient.addMicSeatListener(listener);
      return () => {
        roomClient.removeMicSeatListener(listener);
      };
    }
  }, [roomClient]);

  /**
   * ????????????
   * @param uid
   */
  const getUser = useCallback((uid?: string) => {
    return (allUserList || []).find(
      user => user.accountId === uid
    );
  }, [allUserList]);

  /**
   * ???/??????????????????
   */
  useEffect(() => {
    if (playerQueue.length > 2) {
      setIsSwitched(true);
    } else {
      setIsSwitched(false);
    }
  }, [playerQueue.length]);

  /**
   * ???????????????????????????
   */
  useEffect(() => {
    if (isJoined && roomClient) {
      const hide = message.loading('?????????????????????????????????', 0);
      Promise.all([
        roomClient.enableCamera(),
        roomClient.enableMicrophone(),
      ]).then(() => {
        setIsLocalCameraOn(true);
        setIsLocalMicrophoneOn(true);
        message.success('??????????????????????????????');
      }).catch(error => {
        message.error(`????????????????????????????????????${error.message}`);
      }).finally(() => {
        hide();
      });
      return () => {
        hide();
        roomClient.leaveRoom().then(() => {
          console.log('rtc??????');
        });
      };
    }
  }, [isJoined, roomClient]);

  /**
   * mute???????????????
   * @param value
   */
  const onLocalCameraChange = (value: boolean) => {
    if (!roomClient) return;
    setIsLocalCameraOn(value);
    roomClient.muteLocalCamera(!value);
  };

  /**
   * mute???????????????
   * @param value
   */
  const onLocalMicrophoneChange = (value: boolean) => {
    if (!roomClient) return;
    setIsLocalMicrophoneOn(value);
    roomClient.muteLocalMicrophone(!value);
  };

  /**
   * ???/?????????????????????
   * @param value
   */
  const onLocalScreenChange = async (value: boolean) => {
    if (playerQueue.length >= 3) {
      Modal.info({
        title: '??????????????????',
        content: '??????????????????????????????????????????',
      });
      return;
    }
    if (!roomClient) return;
    if (value) {
      await roomClient.screenTrackTool.enableScreen();
    } else {
      await roomClient.screenTrackTool.disableScreen();
    }
    setIsLocalScreenOn(value);
  };

  /**
   * ???/????????????
   * @param value
   */
  const onSwitchedChange = (value: boolean) => {
    if (playerQueue.length < 3) {
      Modal.info({
        title: '?????????????????????',
        content: '??????????????????????????????????????????????????????',
      });
      return;
    }
    dispatchPlayerQueue({ type: 'SWITCH_CHANGED' });
    setIsSwitched(value);
  };

  /**
   * ????????????????????????
   * @param e
   */
  const onChatInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  /**
   * ??????????????????
   */
  const onChatInputSubmit = () => {
    if (!userInfo) return;
    if (!roomClient) return;
    if (!imClient) return;
    const pubSignalingMessage: PubSignaling = {
      action: 'quit_room',
      data: {
        timestamp: Date.now(),
        senderId: roomClient.currentUserId || '',
        senderName: userInfo?.nickname,
        msgContent: inputMessage,
      }
    };
    imClient.sendChannelMsg(
      JSON.stringify(pubSignalingMessage),
      `${imConfig?.imGroupId}`,
      true
    ).then(() => {
      setInputMessage('');
    });
  };

  /**
   * ???????????????
   */
  const onPlayerClick = () => {
    dispatchPlayerQueue({ type: 'LARGE_SMALL_TOGGLED' });
  };

  /**
   * ????????????
   */
  const leave = () => {
    API.leaveInterview({
      interviewId: params.interviewId
    }).then(() => {
      history.push('/meeting-list');
    });
  };

  /**
   * ????????????
   */
  const end = () => {
    API.endInterview({
      interviewId: params.interviewId
    }).then(() => {
      history.push('/meeting-list');
    });
  };

  return <div className={styles.container}>
    <VideoPanel
      className={styles.videoPanelBody}
      title={interview?.title}
      isSwitched={isSwitched}
      onSwitchedChange={onSwitchedChange}
      isLocalCameraOn={isLocalCameraOn}
      onLocalCameraChange={onLocalCameraChange}
      isLocalMicrophoneOn={isLocalMicrophoneOn}
      onLocalMicrophoneChange={onLocalMicrophoneChange}
      isLocalScreenOn={isLocalScreenOn}
      onLocalScreenChange={onLocalScreenChange}
      showEndButton={showLeaveInterview}
      showLeaveButton={true}
      onLeaveClick={leave}
      onEndClick={end}
      onHangupClick={leave}
    >
      <div id="audios"/>
      {
        largePlayer && <UserRtcPlayer
          playerId="large-player"
          className={styles.fullVideoPlayer}
          isVideoOpen={largePlayer.isOpen}
          cover={getUser(largePlayer.uid)?.avatar}
          footer={null}
        />
      }
      {
        smallPlayer && <UserRtcPlayer
          playerId="small-player"
          className={styles.smallVideoPlayer}
          isVideoOpen={smallPlayer.isOpen}
          cover={getUser(smallPlayer.uid)?.avatar}
          username={getUser(smallPlayer.uid)?.nickname}
          style={{ backgroundColor: 'transparent' }}
          onClick={onPlayerClick}
        />
      }
    </VideoPanel>
    <ChatPanel
      className={styles.chatPanelBody}
      messages={imMessages}
      infoProps={{
        candidate: interview?.candidateName,
        job: interview?.career
      }}
      inputProps={{
        value: inputMessage,
        onChange: onChatInputChange,
        onSubmit: onChatInputSubmit
      }}
    />
  </div>;
};

export default Room;
