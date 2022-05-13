import { FunctionType } from '../types';

export type ExtQNClientEventName = 'localPublished' | 'localUnPublished' | 'roomLeft';

class ExtQNClientEventListener {
  public eventMap: Map<ExtQNClientEventName, FunctionType[]>;

  constructor() {
    this.eventMap = new Map();
  }

  /**
   * 注册额外的事件监听
   * @param eventName
   * @param listener
   */
  addExtEventListener(eventName: ExtQNClientEventName, listener: FunctionType) {
    const listeners = this.eventMap.get(eventName) || [];
    this.eventMap.set(
      eventName,
      listeners.concat(listener),
    );
  }

  /**
   * 移除额外的事件监听
   * @param eventName
   * @param listener
   */
  removeExtEventListener(eventName: ExtQNClientEventName, listener: FunctionType) {
    const listeners = (this.eventMap.get(eventName) || []).filter(
      l => l !== listener
    );
    this.eventMap.set(
      eventName,
      listeners,
    );
  }

  /**
   * 派发指定的额外事件
   * @param eventName
   * @param args
   */
  dispatchExtEventListener(eventName: ExtQNClientEventName, ...args: unknown[]) {
    const listeners = this.eventMap.get(eventName) || [];
    listeners.forEach(listener => {
      listener(...args);
    });
  }
}

export default new ExtQNClientEventListener();
