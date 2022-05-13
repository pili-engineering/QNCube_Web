import { useContext, useEffect, useState } from 'react';
import QNWhiteboard, { JoinRoomCallbackResult } from 'qnweb-whiteboard';
import { QNWhiteBoardStoreContext } from '../_store';

export const log = (...args: any[]) => {
  console.log('useQNWhiteBoard', ...args);
};

/**
 * notIn: 未加入, entering: 加入中, joined: 已加入, failed: 加入失败
 */
export type WhiteboardJoinState = 'notIn' | 'entering' | 'joined' | 'failed';

const useQNWhiteBoard = (roomToken?: string | null) => {
  const { state, dispatch } = useContext(QNWhiteBoardStoreContext);
  const [documentChangeWidgetId, setDocumentChangeWidgetId] = useState<string>();
  const [webassemblyReady, setWebassemblyReady] = useState(false);
  const [joinState, setJoinState] = useState<WhiteboardJoinState>('notIn');

  /**
   * 实例化 store 的白板
   */
  useEffect(() => {
    const client = state.whiteboard;
    if (!client) {
      dispatch({
        type: 'updateWhiteboard',
        payload: new QNWhiteboard(),
      });
    }
  }, [dispatch, state.whiteboard]);

  /**
   * 加入白板房间
   */
  useEffect(() => {
    const client = state.whiteboard;
    if (client && roomToken) {
      setJoinState('entering');
      client.joinRoom(roomToken, (res: JoinRoomCallbackResult) => {
        if (res.status === 'open') {
          setJoinState('joined');
        } else {
          setJoinState('failed');
        }
      }, {
        aspectRatio: 1.5,
      });
    }
  }, [state.whiteboard, roomToken]);

  /**
   * WebassemblyReady
   * DocumentChange
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const client = state.whiteboard;
    const handleWebassemblyReady = (event: number, params: boolean) => {
      log('handleWebassemblyReady', event);
      log('handleWebassemblyReady', params);
      setWebassemblyReady(params);
    };
    const handleDocumentChange = (event: number, params: { widgetId: string } | string) => {
      log('handleDocumentChange', event);
      log('handleDocumentChange', params);
      if (typeof params === 'object' && params !== null) {
        log('handleDocumentChange widgetId', params.widgetId);
        setDocumentChangeWidgetId(params.widgetId);
      }
    };
    if (client) {
      client.registerEvent(client.controller.Event.WebassemblyReady, handleWebassemblyReady);
      client.registerEvent(client.controller.Event.DocumentChange, handleDocumentChange);
      return () => {
        client.unregisterEvent(client.controller.Event.WebassemblyReady, handleWebassemblyReady);
        client.unregisterEvent(client.controller.Event.DocumentChange, handleDocumentChange);
      };
    }
  }, [state.whiteboard]);

  /**
   * 更新状态管理中的 documentLoaded 和 webassemblyReady 值
   */
  useEffect(() => {
    dispatch({
      type: 'updateDocumentLoaded',
      payload: !!documentChangeWidgetId,
    });
    dispatch({
      type: 'updateWebassemblyReady',
      payload: webassemblyReady,
    });
  }, [dispatch, documentChangeWidgetId, webassemblyReady]);

  /**
   * 白板文档加载完全
   */
  useEffect(() => {
    if (state.documentLoaded) {
      const container = document.getElementById('canvasBox');
      const { width } = container?.getBoundingClientRect() || {};
      if (width) {
        state.whiteboard?.setCanvasStyle({
          width,
          height: width / 1.5,
        });
      }
    }
  }, [state.documentLoaded, state.whiteboard]);

  /**
   * 浏览器窗口大小改变时，调整白板大小
   */
  useEffect(() => {
    const handleResizeWhiteBoard = () => {
      const container = document.getElementById('canvasBox');
      const { width } = container?.getBoundingClientRect() || {};
      if (width) {
        state.whiteboard?.setCanvasStyle({
          width,
          height: width / 1.5,
        });
      }
    };
    window.addEventListener('resize', handleResizeWhiteBoard);
    return () => {
      window.removeEventListener('resize', handleResizeWhiteBoard);
    };
  }, [state.whiteboard]);

  return {
    whiteboard: state.whiteboard,
    joinState,
  };
};

export default useQNWhiteBoard;
