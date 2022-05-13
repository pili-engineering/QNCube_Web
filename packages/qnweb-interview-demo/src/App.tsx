import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useMount } from 'ahooks';

import { IMStoreState, useIMStore, useUserStore } from '@/store';
import { getAccountInfo } from '@/api';
import Router from './router';

/**
 * 加载im数据缓存
 */
const loadIMState = (): IMStoreState => {
  const imStore = localStorage.getItem('imStoreState') || '{}';
  try {
    return JSON.parse(imStore);
  } catch (e) {
    return {};
  }
};

function App(): ReactElement {
  const { state: userStoreState, dispatch: dispatchUserStoreState } = useUserStore();
  const { state: imStoreState, dispatch: dispatchIMStoreState } = useIMStore();

  /**
   * 初始化store
   */
  useMount(() => {
    const imStore = loadIMState();
    dispatchIMStoreState({
      type: 'PATCH',
      payload: imStore
    });
    dispatchUserStoreState({
      type: 'PATCH',
      payload: {
        loginToken: localStorage.getItem('authorization') || ''
      }
    });
  });

  /**
   * 初始化用户信息
   */
  useEffect(() => {
    window.localStorage.setItem('authorization', userStoreState.loginToken || '');
    if (userStoreState.loginToken) {
      getAccountInfo().then(result => {
        dispatchUserStoreState({
          type: 'PATCH',
          payload: result
        });
      });
    }
  }, [dispatchUserStoreState, userStoreState.loginToken]);

  /**
   * 更新缓存imState
   */
  useEffect(() => {
    localStorage.setItem('imStoreState', JSON.stringify(imStoreState));
  }, [imStoreState]);
  return <Router/>;
}

export default App;
