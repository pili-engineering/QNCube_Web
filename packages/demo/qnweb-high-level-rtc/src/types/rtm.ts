/**
 * RtmManager 监听器
 */
export type RtmManagerLister = (msg: string, peerId: string) => void;

/**
 * 适配器
 */
export interface RtmAdapter {
  /**
   * TODO
   * 发送 c2c 消息
   * @param msg
   * @param peerId
   * @param isDispatchToLocal
   * @param callback
   */
  sendC2cMsg?: (msg: string, peerId: string, isDispatchToLocal: boolean, callback?: RtmCallBack) => Promise<unknown>;
  /**
   * 发送频道消息
   * @param msg
   * @param channelId
   * @param isDispatchToLocal
   * @param callback
   */
  sendChannelMsg: (msg: string, channelId: string, isDispatchToLocal: boolean, callback?: RtmCallBack) => Promise<unknown>;
  /**
   * TODO
   * 创建频道
   * @param channelId
   * @param callback
   */
  createChannel?: (channelId: string, callback?: RtmCallBack) => Promise<unknown>;
  /**
   * 加入频道
   * @param channelId
   * @param callback
   */
  joinChannel: (channelId: string, callback?: RtmCallBack) => Promise<unknown>;
  /**
   * 离开频道
   * @param channelId
   * @param callback
   */
  leaveChannel: (channelId: string, callback?: RtmCallBack) => Promise<unknown>;
  /**
   * TODO
   * 销毁频道
   * @param channelId
   * @param callBack
   */
  releaseChannel?: (channelId: string, callback?: RtmCallBack) => Promise<unknown>;
}

/**
 * im操作回调
 */
export interface RtmCallBack {
  onSuccess?: (res?: unknown) => void;
  onFailure?: (error?: unknown) => void
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