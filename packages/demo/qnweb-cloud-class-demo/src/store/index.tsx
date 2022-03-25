import React, { useContext, useEffect, useReducer } from 'react';
import { BaseUserInfo, getAccountInfoApi } from '../api';

export const UserStoreContext = React.createContext({} as {
  state: State,
  dispatch: (action: Action) => void;
});

enum IMType {
  RongCloud = 1, // 融云 IM
  QN// 七牛 IM
}

interface IMConfig {
  imToken?: string;
  type?: IMType;
  imGroupId?: number;
  imPassword?: string;
  imUsername?: string;
  imUid?: string;
}

interface State {
  authorization: string;
  userInfo?: BaseUserInfo;
  imConfig?: IMConfig
}

interface Action {
  type: 'setAuthorization' | 'setUserInfo' | 'setIMConfig';
  payload: unknown;
}

export const useUserStore = () => {
  return useContext(UserStoreContext);
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

const UserStore: React.FC<{}> = (props) => {
  const { children } = props;
  const localStorageIMConfig = localStorage.getItem('imConfig');
  const [state, dispatch] = useReducer(reducer, {
    authorization: localStorage.getItem('authorization') || '',
    imConfig: localStorageIMConfig ? JSON.parse(localStorageIMConfig) : {},
  });

  useEffect(() => {
    if (state.authorization) {
      getAccountInfoApi().then((user) => {
        dispatch({
          type: 'setUserInfo',
          payload: user,
        });
      });
    }
  }, [state.authorization]);

  return (
    <UserStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStore;
