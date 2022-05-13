import React, { useContext, useEffect, useReducer } from 'react';
import { MutableTrackRoom } from 'qnweb-high-level-rtc';

import { RoomStoreState, RoomStoreAction } from './type';

export const roomStoreContext = React.createContext<{
  state: RoomStoreState,
  dispatch: React.Dispatch<RoomStoreAction>
}>({
  state: {},
  dispatch: () => ({})
});

export const roomStoreReducer: React.Reducer<RoomStoreState, RoomStoreAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'PATCH':
      return {
        ...state,
        ...action.payload
      };
    default:
      throw new Error();
  }
};

export const RoomStore: React.FC<{
  value?: RoomStoreState
}> = (props) => {
  const { children, value } = props;
  const [state, dispatch] = useReducer(roomStoreReducer, { ...value });

  /**
   * 初始化client
   */
  useEffect(() => {
    const roomClient = new MutableTrackRoom();
    dispatch({
      type: 'PATCH',
      payload: {
        roomClient,
      }
    });
  }, []);

  return <roomStoreContext.Provider value={{ state, dispatch }}>
    {children}
  </roomStoreContext.Provider>;
};

export const useRoomStore = (): {
  state: RoomStoreState,
  dispatch: React.Dispatch<RoomStoreAction>
} => {
  return useContext(roomStoreContext);
};
