import * as RongIMLib from '@rongcloud/imlib-v4';
import RtmManager from '../event-bus/RtmManager';
import { RtmCallBack, RtmAdapter } from '../types';

/**
 * 融云 IM 适配器
 */
class RongCloudRTMAdapter implements RtmAdapter {
  public im: RongIMLib.IMClient;

  constructor(appkey: string) {
    this.im = RongIMLib.init({
      appkey
    });
    this.addIMEventListener();
  }

  /**
   * 设置监听
   */
  addIMEventListener() {
    this.im.watch({
      message: (event) => {
        console.log('收到消息', event);
        const mapListeners = new Map([
          [1, RtmManager.mRtmC2cListeners], // 单聊
          [4, RtmManager.mRtmChannelListeners], // 聊天室
        ]);
        const listeners = mapListeners.get(event.message.type) || [];
        const messageContent: any = event.message.content;
        listeners.forEach(listener => {
          listener(
            messageContent.content as string,
            event.message.targetId,
          );
        });
      },
    });
  }

  /**
   * 连接融云服务器
   * @link https://doc.rongcloud.cn/im/Web/4.X/guide/connection/connect/web
   * @param token
   * @param callback
   */
  connect(token: string, callback?: RtmCallBack) {
    return this.im.connect({
      token
    }).then(user => {
      if (callback?.onSuccess) callback.onSuccess(user);
      console.log('链接成功, 链接用户 id 为: ', user.id);
    }).catch(error => {
      console.log('链接失败: ', error.code, error.msg);
      if (callback?.onFailure) callback.onFailure(error);
      return Promise.reject(error);
    });
  }

  /**
   * 加入聊天室
   * @link https://doc.rongcloud.cn/im/Web/4.X/guide/chatroom/manage/basic/join/web
   * @param channelId
   * @param callback
   */
  joinChannel(channelId: string, callback?: RtmCallBack) {
    return this.im.ChatRoom.get({
      id: channelId
    }).join({
      count: -1
    }).then(() => {
      if (callback?.onSuccess) callback.onSuccess(true);
      console.log('加入聊天室成功');
    }).catch(error => {
      if (callback?.onFailure) callback.onFailure(error);
      console.log('加入聊天室失败');
      return Promise.reject(error);
    });
  }

  /**
   * 退出聊天室
   * @link https://doc.rongcloud.cn/im/Web/4.X/guide/chatroom/manage/basic/quit/web
   * @param channelId
   * @param callback
   */
  leaveChannel(channelId: string, callback?: RtmCallBack) {
    return this.im.ChatRoom.get({
      id: channelId
    }).quit().then(() => {
      console.log('退出聊天室成功');
      if (callback?.onSuccess) callback.onSuccess();
    }).catch(error => {
      if (callback?.onFailure) callback.onFailure(error);
      console.log('退出聊天室失败');
      return Promise.reject(error);
    });
  }

  /**
   * 发送消息
   * @param msg
   * @param channelId
   * @param isDispatchToLocal
   * @param callback
   */
  sendChannelMsg(msg: string, channelId: string, isDispatchToLocal: boolean, callback?: RtmCallBack) {
    return this.im.ChatRoom.get({
      id: channelId
    }).send({
      messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
      content: {
        content: msg // 文本内容
      }
    }).then(function (message) {
      console.log('message', message);
      const messageContent: any = message.content;
      if (callback?.onSuccess) {
        callback.onSuccess(messageContent.content as string);
      }
      if (isDispatchToLocal) {
        RtmManager.mRtmChannelListeners.forEach(listener => {
          listener(msg, channelId);
        })
      }
    }).catch(function (error) {
      console.log('发送文字消息失败', error);
      if (callback?.onFailure) callback.onFailure(error);
      return Promise.reject(error);
    });
  }
}

export default RongCloudRTMAdapter;