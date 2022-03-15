import { RtmAdapter, RtmManagerLister } from '../types';

class RtmManager {
  public mRtmC2cListeners: RtmManagerLister[] = [];
  public mRtmChannelListeners: RtmManagerLister[] = [];
  public rtmClient: unknown;

  /**
   * 设置适配器
   * @param adapter
   */
  setRtmAdapter<T extends RtmAdapter = RtmAdapter>(adapter: T): RtmManager {
    this.rtmClient = adapter;
    return this;
  }

  /**
   * 获取到适配器
   */
  getRtmAdapter<T extends RtmAdapter = RtmAdapter>(): T {
    return this.rtmClient as T;
  }

  /**
   * 添加点对点消息监听
   * @param listener
   */
  addRtmC2cListener(listener: RtmManagerLister) {
    this.mRtmC2cListeners.push(listener)
  }

  /**
   * 移除点对点消息监听
   * @param listener
   */
  removeRtmC2cListener(listener: RtmManagerLister) {
    this.mRtmC2cListeners = this.mRtmC2cListeners.filter(
      item => item !== listener
    )
  }

  /**
   * 添加频道消息监听
   * @param listener
   */
  addRtmChannelListener(listener: RtmManagerLister) {
    this.mRtmChannelListeners.push(listener)
  }

  /**
   * 移除频道消息监听
   * @param listener
   */
  removeRtmChannelListener(listener: RtmManagerLister) {
    this.mRtmChannelListeners = this.mRtmChannelListeners.filter(
      item => item !== listener
    )
  }
}

export default new RtmManager();