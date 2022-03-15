import * as QNIM from 'qnweb-im';
import { RtmAdapter, RtmCallBack } from '../types';
import RtmManager from '../event-bus/RtmManager';
import { LogModel } from '../util';

const log = new LogModel('log');
log.setPreTitle('QNRTMAdapter');

class QNRTMAdapter implements RtmAdapter {
  public appKey: string;
  public im: any;
  public loginCallback?: RtmCallBack | null;
  public sendChannelMsgCallback?: RtmCallBack | null;
  public maxInitCount: number;
  public initCount: number;
  // 本地消息暂存队列
  public localMessageQueue: {
    clientMId: number;
    callback?: RtmCallBack;
    isDispatchToLocal: boolean,
    msg: string,
    channelId: string
  }[] = [];
  public tag: string = 'QNRTMAdapter';
  private joinChannelSuccessCallback: ((res?: unknown) => void) | undefined;

  constructor(appKey: string) {
    this.appKey = appKey;
    this.maxInitCount = 20;
    this.initCount = 0;
    this.im = QNIM.init({
      autoLogin: false,
      appid: this.appKey,
    });
    this.addIMEventListener();
  }

  /**
   * 获取IM实例
   * 因为im实例过程中，是个异步任务，所以需要定时实例，直到实例成功
   */
  getIM(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.initCount > this.maxInitCount) {
        // 超出最大实例化次数
        return reject('Instantiation failed');
      }
      if (!this.im) {
        this.im = QNIM.init({
          autoLogin: false,
          appid: this.appKey,
        });
      }
      if (this.im && this.im.isReady && this.im.isReady()) {
        resolve(this.im);
      } else {
        setTimeout(() => {
          this.initCount++;
          resolve(this.getIM());
        }, 1000);
      }
    });
  }

  /**
   * 设置监听
   */
  addIMEventListener() {
    this.im.on({
      imGroupJoined: (data: unknown) => {
        /**
         * 聊天室加入成功
         */
        if (this.joinChannelSuccessCallback) {
          this.joinChannelSuccessCallback(data)
        }
      },
      /**
       * 监听群聊消息
       * 能接受到本地发送的消息
       * 通过 isDispatchToLocal 来控制本地发送的消息是否接收
       * @param message
       */
      onGroupMessage: (message: QNIM.IGroupMessage) => {
        const cuid = this.im.userManage.getUid() + '';
        const isRemoteMessage = cuid !== message.from;
        if (isRemoteMessage) { // 收到远端消息，触发消息接收回调
          RtmManager.mRtmChannelListeners.forEach(listener => {
            listener(
              message.content || '',
              message.to || ''
            );
          });
        }
      },
      /**
       * 监听消息发送状态改变
       * @param res
       */
      onSendingMessageStatusChanged: (res: QNIM.ISendingMessageStatusChangedRes) => {
        log.log('onSendingMessageStatusChanged res', res);
        const task = this.localMessageQueue.find(
          item => item.clientMId === res.mid
        );
        if (res.status === 'sent' && task?.callback?.onSuccess) {
          // 发送成功, 触发本地消息发送回收
          task.callback.onSuccess(res);
          this.localMessageQueue = this.localMessageQueue.filter(
            item => item.clientMId !== res.mid
          );
          // 需要将本地消息回调给消息接收监听器
          if (task.isDispatchToLocal) {
            RtmManager.mRtmChannelListeners.forEach(listener => {
              listener(
                task.msg,
                task.channelId
              );
            });
          }
        }
        if (res.status === 'failed' && task?.callback?.onFailure) {
          // 发送失败, 触发本地消息发送回收
          task.callback.onFailure(res);
          this.localMessageQueue = this.localMessageQueue.filter(
            item => item.clientMId !== res.mid
          );
        }
      },
      /**
       * 登录成功
       * @param res
       */
      loginSuccess: (res: any) => {
        if (this.loginCallback?.onSuccess) {
          this.loginCallback?.onSuccess(res);
        }
      },
      /**
       * 登录失败
       * @param error
       */
      loginFail: (error: any) => {
        if (this.loginCallback?.onFailure) {
          this.loginCallback?.onFailure(error);
        }
      },
    });
  }

  /**
   * 初始化 im 内部实现
   * @param config
   * @param callback
   */
  _connect(config: { name: string; password: string }, callback?: RtmCallBack) {
    const { name, password } = config;
    this.loginCallback = callback;
    this.getIM().then(() => {
      this.im.login({
        name,
        password
      });
    });
  }

  /**
   * 初始化 im
   */
  connect(config: { name: string; password: string }, callback?: RtmCallBack) {
    return new Promise((resolve, reject) => {
      this._connect(config, {
        onSuccess: (res: any) => {
          if (callback?.onSuccess) callback?.onSuccess(res);
          resolve(res);
        },
        onFailure: (error: any) => {
          if (callback?.onFailure) callback?.onFailure(error);
          reject(error);
        }
      });
    });
  }

  /**
   * 加入聊天室
   * @param channelId
   * @param callback
   */
  joinChannel(channelId: string, callback?: RtmCallBack) {
    return this.im.chatroomManage.join(channelId).then(() => {
      return new Promise(resolve => {
        this.joinChannelSuccessCallback = (data: unknown) => {
          if (callback?.onSuccess) callback?.onSuccess(data);
          resolve(data);
        }
      })
    }).catch((error: any) => {
      if (error.code === 20017) {
        if (callback?.onSuccess) return callback.onSuccess(error);
        return Promise.resolve(error);
      }
      if (callback?.onFailure) callback.onFailure(error);
      return Promise.reject(error);
    });
  }

  /**
   * 退出聊天室
   * @param channelId
   * @param callback
   */
  leaveChannel(channelId: string, callback?: RtmCallBack) {
    return this.im.chatroomManage.leave(Number(channelId)).then((res: any) => {
      if (callback?.onSuccess) callback.onSuccess(res);
      log.log('退出聊天室成功', res);
    }).catch((error: any) => {
      if (callback?.onFailure) callback.onFailure(error);
      log.log('退出聊天室失败', error);
      return Promise.reject(error);
    });
  }

  /**
   * 发送频道消息内部消息
   * @param msg
   * @param channelId
   * @param isDispatchToLocal
   * @param callback
   */
  _sendChannelMsg(msg: string, channelId: string, isDispatchToLocal: boolean, callback?: RtmCallBack) {
    const clientMId = this.im.sysManage.sendGroupMessage({
      content: msg,
      gid: channelId,
    });
    // 本地发送消息暂存队列
    this.localMessageQueue.push({
      clientMId,
      callback,
      isDispatchToLocal,
      msg,
      channelId
    });
  }

  /**
   * 发送频道消息
   * 发送消息
   * @param msg
   * @param channelId
   * @param isDispatchToLocal
   * @param callback
   */
  sendChannelMsg(msg: string, channelId: string, isDispatchToLocal: boolean, callback?: RtmCallBack) {
    return new Promise((resolve, reject) => {
      this._sendChannelMsg(msg, channelId, isDispatchToLocal, {
        onSuccess(res) {
          if (callback?.onSuccess) callback.onSuccess(res);
          resolve(res);
        },
        onFailure(error) {
          if (callback?.onFailure) callback.onFailure(error);
          reject(error);
        }
      });
    });
  }
}

export default QNRTMAdapter;
