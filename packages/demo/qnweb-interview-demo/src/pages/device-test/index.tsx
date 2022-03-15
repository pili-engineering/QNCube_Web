import React, { useContext, useState } from 'react';
import { default as DeviceTestCmp } from '../../components/device-test';
import CommonHeader from '../../components/common-header';
import { signOut, updateAccountInfo } from '../../api';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import css from './index.module.scss';
import { UserStoreContext } from '@/store';

const DeviceTest: React.FC = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserStoreContext);
  const [testCount, setTestCount] = useState(0);

  // 登出
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
      accountId: state.userInfo?.accountId,
      nickname: value
    });
    dispatch({
      type: 'setUserInfo',
      payload: {
        ...state.userInfo,
        ...updatedUserInfo
      }
    });
    message.success('用户信息更新成功~');
  }
  return <div className={css.test}>
    <CommonHeader
      name={state.userInfo?.nickname}
      avatar={state.userInfo?.avatar}
      onSignOut={onSignOut}
      onUpdateUsername={onUpdateUsername}
    >
      <div style={{padding: '0 132px'}}>
        <DeviceTestCmp
          onRetest={() => setTestCount(testCount + 1)}
          key={testCount}
        />
      </div>
    </CommonHeader>
  </div>;
};

export default DeviceTest;