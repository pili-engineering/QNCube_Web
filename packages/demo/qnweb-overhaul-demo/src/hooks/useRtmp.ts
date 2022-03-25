import { useEffect, useState } from 'react';
import { QNRTPlayer } from 'qn-rtplayer-web';
import { message, Modal } from 'antd';
// eslint-disable-next-line import/no-unresolved
import { PlayerState, SDKError } from 'qn-rtplayer-web/build/types';
import { StreamType } from '../pages/room';
import { getUrlParam } from '../utils';

const useRtmp = (publishUrl?: string) => {
  const streamType = getUrlParam<StreamType>('streamType');
  const [rtPlayer, setRtPlayer] = useState<QNRTPlayer>();
  /**
   * 初始化 rtPlayer
   */
  useEffect(() => {
    const handlePlayerStateChanged = (state: PlayerState) => {
      if (state === 3) {
        message.success({
          content: '播放器初始化成功',
          key: 'rtmp-player-init',
        });
      }
    };
    if (streamType === StreamType.Rtmp && !rtPlayer) {
      const player = new QNRTPlayer();
      player.init({
        controls: false,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      });
      player.on('playerStateChanged', handlePlayerStateChanged);
      setRtPlayer(player);
    }
  }, [publishUrl, rtPlayer, streamType]);

  /**
   * 播放 rtmp 流
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const container = document.getElementById('rtPlayer');
    function handleError(error: SDKError) {
      message.error(error.msg);
    }
    if (rtPlayer && publishUrl && container) {
      Modal.info({
        title: '加入房间',
        okText: '加入',
        onOk() {
          message.loading({
            content: '播放器初始化中...',
            key: 'rtmp-player-init',
            duration: 0,
          });
          rtPlayer.play(publishUrl, container).then(() => {
            console.log('rtPlayer play successfully');
            rtPlayer.resume();
          }).catch((err) => {
            message.error({
              content: `播放器初始化失败: ${JSON.stringify(err)}`,
              key: 'rtmp-player-init',
            });
            message.error(`${err.message}`);
          });
        },
      });
      rtPlayer.on('error', handleError);
      return () => {
        rtPlayer.off('error', handleError);
      };
    }
  }, [rtPlayer, publishUrl]);

  return {
    rtPlayer,
  };
};

export default useRtmp;
