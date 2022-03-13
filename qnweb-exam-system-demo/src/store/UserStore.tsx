import React, { useEffect, useMemo, useReducer } from 'react';
import { BaseUserInfo, getAccountInfoApi } from '@/api/BaseCommonApi';
import { IMConfig } from '@/api/types';

export interface IUserStoreState {
  authorization: string,
  userInfo?: BaseUserInfo,
  imConfig?: IMConfig,
}

export interface IUserStoreAction {
  type: 'setAuthorization' | 'setUserInfo' | 'setIMConfig';
  payload: unknown;
}

export interface IUserStoreProps {
  excludeRoutes?: string[];
}

export const userStoreContext = React.createContext({} as {
  state: IUserStoreState,
  dispatch: React.Dispatch<IUserStoreAction>
});

export const userStoreReducer = (state: IUserStoreState, action: IUserStoreAction): IUserStoreState => {
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

const localStorageIMConfig = localStorage.getItem('imConfig');

export const defaultUserStoreState: IUserStoreState = {
  authorization: localStorage.getItem('authorization') || '',
  imConfig: localStorageIMConfig ? JSON.parse(localStorageIMConfig) : {},
};

const UserStore: React.FC<IUserStoreProps> = (props) => {
  const { children, excludeRoutes = [] } = props;
  const [state, dispatch] = useReducer(userStoreReducer, defaultUserStoreState);
  const isExcludeRoute = useMemo(() => {
    return excludeRoutes.includes(window.location.pathname);
  }, [excludeRoutes]);

  /**
   * 初始化用户信息
   */
  useEffect(() => {
    if (state.authorization && !isExcludeRoute) {
      getAccountInfoApi().then((user) => {
        dispatch({
          type: 'setUserInfo',
          payload: user,
        });
      });
    }
  }, [isExcludeRoute, state.authorization]);

  return (
    <userStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </userStoreContext.Provider>
  );
};

export default UserStore;
