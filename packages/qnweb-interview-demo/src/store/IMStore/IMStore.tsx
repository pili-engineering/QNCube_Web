import React, { useContext, useEffect, useReducer } from 'react';
import { QNRTMAdapter, RtmManager } from 'qnweb-high-level-rtc';

import { IMStoreAction, IMStoreState } from './type';

export const imStoreContext = React.createContext<{
  state: IMStoreState,
  dispatch: React.Dispatch<IMStoreAction>
}>({
  state: {},
  dispatch: () => ({})
});

export const imStoreReducer: React.Reducer<IMStoreState, IMStoreAction> = (
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

export const IMStore: React.FC<{
  value?: IMStoreState
}> = (props) => {
  const { children, value } = props;
  const [state, dispatch] = useReducer(imStoreReducer, {
    ...value,
  });

  /**
   * 初始化imClient
   */
  useEffect(() => {
    const appKey = value?.appKey;
    if (appKey) {
      const imClient = RtmManager.setRtmAdapter(
        new QNRTMAdapter(appKey)
      ).getRtmAdapter<QNRTMAdapter>();
      dispatch({
        type: 'PATCH',
        payload: {
          imClient
        }
      });
    }
  }, [value?.appKey]);

  return <imStoreContext.Provider value={{ state, dispatch }}>
    {children}
  </imStoreContext.Provider>;
};

export const useIMStore = (): {
  state: IMStoreState,
  dispatch: React.Dispatch<IMStoreAction>
} => {
  return useContext(imStoreContext);
};
