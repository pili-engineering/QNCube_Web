import { RtmManager } from '../event-bus';

/**
 * RtmManager 监听器
 */
export type RtmManagerLister = (msg: string, peerId: string) => void;

/**
 * 适配器
 */
export abstract class RtmAdapter {
  /**
   * 发送 c2c 消息
   * @param msg
   * @param peerId
   * @param isDispatchToLocal
   * @param callback
   */
  abstract sendC2cMsg(msg: string, peerId: string, isDispatchToLocal: boolean, callback?: RtmCallBack): Promise<unknown>;

  /**
   * 发送频道消息
   * @param msg
   * @param channelId
   * @param isDispatchToLocal
   * @param callback
   */
  abstract sendChannelMsg(msg: string, channelId: string, isDispatchToLocal: boolean, callback?: RtmCallBack): Promise<unknown>;

  /**
   * 创建频道
   * @param channelId
   * @param callback
   */
  abstract createChannel(channelId: string, callback?: RtmCallBack): Promise<unknown>;

  /**
   * 加入频道
   * @param channelId
   * @param callback
   */
  abstract joinChannel(channelId: string, callback?: RtmCallBack): Promise<unknown>;

  /**
   * 离开频道
   * @param channelId
   * @param callback
   */
  abstract leaveChannel(channelId: string, callback?: RtmCallBack): Promise<unknown>;

  /**
   * 销毁频道
   * @param channelId
   * @param callBack
   */
  abstract releaseChannel(channelId: string, callback?: RtmCallBack): Promise<unknown>;

  /**
   * 添加点对点消息监听
   * @param listener
   */
  addRtmC2cListener(listener: RtmManagerLister) {
    RtmManager.addRtmC2cListener(listener);
  }

  /**
   * 移除点对点消息监听
   * @param listener
   */
  removeRtmC2cListener(listener: RtmManagerLister) {
    RtmManager.removeRtmC2cListener(listener);
  }

  /**
   * 添加频道消息监听
   * @param listener
   */
  addRtmChannelListener(listener: RtmManagerLister) {
    RtmManager.addRtmChannelListener(listener);
  }

  /**
   * 移除频道消息监听
   * @param listener
   */
  removeRtmChannelListener(listener: RtmManagerLister) {
    RtmManager.removeRtmChannelListener(listener);
  }
}

/**
 * im操作回调
 */
export interface RtmCallBack {
  onSuccess?: (res?: unknown) => void;
  onFailure?: (error?: unknown) => void;
}

/**
 * 基础通用消息格式
 * 消息内容
 */
export interface BaseMessageJsonData {
  senderId: string;
  senderName: string;
  msgContent: string;

  [key: string]: any;
}

/**
 * 基础通用消息格式
 */
export interface BaseMessageJson {
  /**
   * 基础通用消息格式
   * 消息类型
   * 'pub_chat_text' | 'welcome' | 'quit_room' | 'living_danmu'
   */
  action: string;
  data: BaseMessageJsonData;
}

export interface ChannelAttributesChangeValueJson<T> {
  // 电影ID
  videoId: string;
  // 电影控制者ID
  videoUid: string;
  // 开始播放的时间戳
  startTimeMillis: number;
  // 当前进度对应的时间戳
  currentTimeMillis: number;
  // 当前播放进度
  currentPosition: number;
  // 播放状态: 0-暂停, 1-播放, 2-出错
  playStatus: number;
  // 当前电影实体 （服务器端定义的结构）
  movieInfo: T;
}
