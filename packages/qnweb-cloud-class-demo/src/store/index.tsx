import React, { useContext, useReducer } from 'react';

import { GetAccountInfoAccountIdResult, PostSignUpOrInResult } from '@/api';

export const UserStoreContext = React.createContext({} as {
  state: State,
  dispatch: (action: Action) => void;
});

type UserInfo = Partial<GetAccountInfoAccountIdResult['data']>;

type IMConfig = Partial<Required<PostSignUpOrInResult>['data']['imConfig']>;

interface State {
  authorization: string;
  userInfo?: UserInfo;
  imConfig?: IMConfig;
}

type Action = {
  type: 'setAuthorization',
  payload: string;
} | {
  type: 'setUserInfo',
  payload: Partial<UserInfo>
} | {
  type: 'setIMConfig',
  payload: Partial<IMConfig>
}

export const useUserStore = () => {
  return useContext(UserStoreContext);
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;
  if (type === 'setAuthorization') {
    const authorization = action.payload;
    localStorage.setItem('authorization', authorization);
    return { ...state, authorization };
  }
  if (type === 'setUserInfo') {
    return {
      ...state,
      userInfo: action.payload
    };
  }
  if (type === 'setIMConfig') {
    const imConfig = action.payload;
    localStorage.setItem('imConfig', JSON.stringify(imConfig));
    return {
      ...state,
      imConfig: imConfig
    };
  }
  return state;
};

const UserStore: React.FC = (props) => {
  const { children } = props;
  const localStorageIMConfig = localStorage.getItem('imConfig');
  const [state, dispatch] = useReducer(reducer, {
    authorization: localStorage.getItem('authorization') || '',
    imConfig: localStorageIMConfig ? JSON.parse(localStorageIMConfig) : {},
  });

  return (
    <UserStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStore;
