import * as RongIMLib from '@rongcloud/imlib-v4';

import { RtmManager } from '../event-bus';
import { RtmCallBack, RtmAdapter } from '../types';
import { LogModel } from '../util';

const log = new LogModel('log');
log.setPreTitle('RongCloudRTMAdapter');

/**
 * 融云 IM 适配器
 */
class RongCloudRTMAdapter extends RtmAdapter {
  public im: RongIMLib.IMClient;

  constructor(appkey: string) {
    super();
    this.im = RongIMLib.init({
      appkey
    });
    this.addListener();
  }

  /**
   * 设置监听
   */
  private addListener() {
    this.im.watch({
      message: (event) => {
        log.log('收到消息', event);
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
      log.log('链接成功, 链接用户 id 为: ', user.id);
    }).catch(error => {
      log.log('链接失败: ', error.code, error.msg);
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
      log.log('加入聊天室成功');
    }).catch(error => {
      if (callback?.onFailure) callback.onFailure(error);
      log.log('加入聊天室失败');
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
      log.log('退出聊天室成功');
      if (callback?.onSuccess) callback.onSuccess();
    }).catch(error => {
      if (callback?.onFailure) callback.onFailure(error);
      log.log('退出聊天室失败');
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
  sendChannelMsg(
    msg: string, channelId: string, isDispatchToLocal: boolean,
    callback?: RtmCallBack
  ) {
    return this.im.ChatRoom.get({
      id: channelId
    }).send({
      messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
      content: {
        content: msg // 文本内容
      }
    }).then(function (message) {
      log.log('message', message);
      const messageContent: any = message.content;
      if (callback?.onSuccess) {
        callback.onSuccess(messageContent.content as string);
      }
      if (isDispatchToLocal) {
        RtmManager.mRtmChannelListeners.forEach(listener => {
          listener(msg, channelId);
        });
      }
    }).catch(function (error) {
      log.log('发送文字消息失败', error);
      if (callback?.onFailure) callback.onFailure(error);
      return Promise.reject(error);
    });
  }

  /**
   * TODO
   * @param channelId
   * @param callback
   */
  createChannel(channelId: string, callback?: RtmCallBack): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  /**
   * TODO
   * @param channelId
   * @param callback
   */
  releaseChannel(channelId: string, callback?: RtmCallBack): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  /**
   * TODO
   * @param msg
   * @param peerId
   * @param isDispatchToLocal
   * @param callback
   */
  sendC2cMsg(
    msg: string, peerId: string, isDispatchToLocal: boolean,
    callback?: RtmCallBack
  ): Promise<unknown> {
    return Promise.resolve(undefined);
  }
}

export default RongCloudRTMAdapter;
