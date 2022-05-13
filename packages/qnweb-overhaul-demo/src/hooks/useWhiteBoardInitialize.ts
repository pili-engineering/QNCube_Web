import { useContext, useEffect, useState } from 'react';
import { RoomEntity } from 'qnweb-high-level-rtc';
import { message } from 'antd';
import { StoreContext } from '../store';

const useWhiteBoardInitialize = (roomEntity?: RoomEntity) => {
  const { state, dispatch } = useContext(StoreContext);
  const [whiteBoardJoined, setWhiteBoardJoined] = useState(false);
  const [documentChanged, setDocumentChange] = useState(false);

  /**
   * 创建白板实例并加入房间
   */
  useEffect(() => {
    const roomToken = roomEntity?.roomToken;
    if (state.whiteBoard) {
      if (roomToken) {
        message.loading({
          content: '白板房间加入中...',
          key: 'whiteboard',
          duration: 0,
        });
        state.whiteBoard.joinRoom(
          roomToken,
          (res: any) => {
            if (res.status === 'open') {
              message.success({
                content: '白板房间加入成功',
                key: 'whiteboard',
              });
              setWhiteBoardJoined(true);
            }
          },
        );
      }
    } else {
      // eslint-disable-next-line new-cap
      const whiteBoard = new window.QNWhiteboard.default();
      dispatch({
        type: 'setWhiteBoard',
        payload: whiteBoard,
      });
    }
  }, [state.whiteBoard, roomEntity?.roomToken, dispatch]);

  /**
   * 监听白板 DocumentChange 事件
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function handleDocumentChange() {
      console.log('whiteBoard log handleDocumentChange');
      state.whiteBoard.setWhiteboardBack('#00000000');
      setDocumentChange(true);
    }
    function handleWindowResize() {
      // 960 * 540
      const container = document.getElementById('rtcModuleBody');
      const width = container?.offsetWidth || 0;
      const aspectRatio = 960 / 540;
      state.whiteBoard.setCanvasStyle({
        width,
        height: width / aspectRatio,
      });
    }
    function handleJoinRoomError(error: any) {
      message.error({
        content: `白板房间加入失败: ${JSON.stringify(error)}`,
        key: 'whiteboard',
      });
    }
    if (state.whiteBoard && whiteBoardJoined) {
      state.whiteBoard.registerEvent(
        state.whiteBoard.controller.Event.DocumentChange,
        handleDocumentChange,
      );
      state.whiteBoard.registerEvent(
        state.whiteBoard.controller.Event.JoinRoomError,
        handleJoinRoomError,
      );
      window.addEventListener('resize', handleWindowResize);
      return () => {
        state.whiteBoard.unregisterEvent(
          state.whiteBoard.controller.Event.PageListChanged,
          handleDocumentChange,
        );
        state.whiteBoard.unregisterEvent(
          state.whiteBoard.controller.Event.JoinRoomError,
          handleJoinRoomError,
        );
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, [state.whiteBoard, whiteBoardJoined]);

  /**
   * 设置白板尺寸
   */
  useEffect(() => {
    if (documentChanged) {
      // 960 * 540
      const container = document.getElementById('rtcModuleBody');
      const width = container?.offsetWidth || 0;
      const aspectRatio = 960 / 540;
      state.whiteBoard.setCanvasStyle({
        width,
        height: width / aspectRatio,
      });
    }
  }, [documentChanged, state.whiteBoard]);

  return {
    whiteBoardJoined,
    documentChanged,
  };
};

export default useWhiteBoardInitialize;
