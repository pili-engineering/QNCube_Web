import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

import DeviceTestPanel from '@/components/device-test-panel';
import CommonHeader from '@/components/common-header';
import { signOut, updateAccountInfo } from '@/api';
import { useUserStore } from '@/store';

import styles from './index.module.scss';

const DeviceTest: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useUserStore();

  const [testCount, setTestCount] = useState(0);

  /**
   * 登出
   */
  async function onSignOut() {
    await signOut();
    localStorage.clear();
    history.push('/');
  }

  /**
   * 用户信息修改
   * @param value
   */
  async function onUpdateUsername(value: string) {
    const updatedUserInfo = await updateAccountInfo({
      accountId: state.accountId,
      nickname: value
    });
    dispatch({
      type: 'PATCH',
      payload: updatedUserInfo
    });
    message.success('用户信息更新成功~');
  }

  return <div className={styles.container}>
    <CommonHeader
      name={state.nickname}
      avatar={state.avatar}
      onSignOut={onSignOut}
      onUpdateUsername={onUpdateUsername}
    >
      <div style={{ padding: '0 132px' }}>
        <DeviceTestPanel
          className={styles.deviceTestPanel}
          onRetest={() => setTestCount(testCount + 1)}
          key={testCount}
        />
      </div>
    </CommonHeader>
  </div>;
};

export default DeviceTest;
