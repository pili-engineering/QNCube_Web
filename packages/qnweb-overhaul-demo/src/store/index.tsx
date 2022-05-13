import React, { useEffect, useReducer } from 'react';
import { MutableTrackRoom } from 'qnweb-high-level-rtc';
import { BaseUserInfo, getAccountInfo } from '../api';

export const StoreContext = React.createContext({} as {
  state: State,
  dispatch: (action: Action) => void;
});

interface IMConfig {
  imGroupId?: number;
  imPassword?: string;
  imToken?: string;
  imUid?: string;
  imUsername?: string;
  type?: number;
}

interface State {
  authorization: string;
  userInfo?: BaseUserInfo;
  mtRoom?: MutableTrackRoom;
  whiteBoard?: any;
  imConfig?: IMConfig
}

interface Action {
  type: 'setAuthorization' | 'setUserInfo' | 'setMtRoom' | 'setWhiteBoard' | 'setIMConfig';
  payload: unknown;
}

const reducer = (state: State, action: Action): State => {
  const { type } = action;
  if (type === 'setAuthorization') {
    const authorization = action.payload as string;
    localStorage.setItem('authorization', authorization);
    return { ...state, authorization };
  }
  if (type === 'setUserInfo') {
    return {
      ...state,
      userInfo: action.payload as BaseUserInfo,
    };
  }
  if (type === 'setMtRoom') {
    return {
      ...state,
      mtRoom: action.payload as MutableTrackRoom,
    };
  }
  if (type === 'setWhiteBoard') {
    return {
      ...state,
      whiteBoard: action.payload,
    };
  }
  if (type === 'setIMConfig') {
    const imConfig = action.payload;
    localStorage.setItem('imConfig', JSON.stringify(imConfig));
    return {
      ...state,
      imConfig: imConfig as IMConfig,
    };
  }
  return state;
};

const Store: React.FC<{}> = (props) => {
  const { children } = props;
  const localStorageIMConfig = localStorage.getItem('imConfig');
  const [state, dispatch] = useReducer(reducer, {
    authorization: localStorage.getItem('authorization') || '',
    imConfig: localStorageIMConfig ? JSON.parse(localStorageIMConfig) : {},
  });

  useEffect(() => {
    if (state.authorization) {
      getAccountInfo().then((user) => {
        dispatch({
          type: 'setUserInfo',
          payload: user,
        });
      });
    }
  }, [state.authorization]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
