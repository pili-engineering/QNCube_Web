import { useContext, useEffect, useState } from 'react';
import QNWhiteboard, { JoinRoomCallbackResult } from 'qnweb-whiteboard';
import { message } from 'antd';

import { QNWhiteBoardStoreContext } from '@/components';

const log = (...args: unknown[]): void => {
  console.log('useQNWhiteBoard', ...args);
};

export const useQNWhiteBoard = (roomToken?: string | null) => {
  const { state, dispatch } = useContext(QNWhiteBoardStoreContext);
  const [documentChangeWidgetId, setDocumentChangeWidgetId] = useState<string>();
  const [webassemblyReady, setWebassemblyReady] = useState(false);

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
      const hide = message.loading('加入白板房间中...', 0);
      client.joinRoom(roomToken, (res: JoinRoomCallbackResult) => {
        if (res.status === 'open') {
          message.success('加入白板房间成功');
          hide();
          return;
        }
        if (res.status === 'error') {
          message.error(`加入白板房间失败: ${JSON.stringify(res)}`);
          hide();
          return;
        }
      }, {
        aspectRatio: 1.5,
      });
      return () => {
        hide();
      };
    }
  }, [state.whiteboard, roomToken]);

  /**
   * WebassemblyReady
   * DocumentChange
   */
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
  };
};

