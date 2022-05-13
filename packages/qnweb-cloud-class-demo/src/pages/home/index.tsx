import React, { useContext, useState } from 'react';
import { FormProps } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import {
  RoleSelectionForm,
  RoleSelectionFormValues,
  RoomCreateForm,
  RoomCreateFormValues,
  SecretKeyForm,
  SecretKeyFormValues,
  WelcomeModal,
} from '../../components';
import { baseCreateRoomApi } from '../../api';
import { UserStoreContext } from '../../store';

const Home = () => {
  const [role, setRole] = useState<RoleSelectionFormValues['role']>();
  const [roleModalVisible] = useState(true);
  const history = useHistory();
  const { state } = useContext(UserStoreContext);

  /**
   * 选择角色
   * @param data
   */
  const onFinishRole: FormProps<RoleSelectionFormValues>['onFinish'] = (data) => {
    setRole(data.role);
  };

  /**
   * 加入教室
   * @param data
   */
  const onFinishSecretKey: FormProps<SecretKeyFormValues>['onFinish'] = (
    data,
  ) => {
    history.push(`/room?roomId=${data.roomId}&role=${role}`);
  };

  /**
   * 创建并加入教室
   * @param data
   */
  const onFinishRoomCreate: FormProps<RoomCreateFormValues>['onFinish'] = (
    data,
  ) => {
    if (role) {
      baseCreateRoomApi({
        title: data.title,
        params: [
          { key: 'nickname', value: data.nickname },
          { key: 'classType', value: data.classType },
          { key: 'duration', value: 30 * 60 * 1000 },
          { key: 'role', value: role },
        ],
      }).then((response) => {
        history.push(`/room?roomId=${response.roomInfo?.roomId}&role=${role}`);
      });
    }
  };

  const mapRole = {
    student: <SecretKeyForm
      onFinish={onFinishSecretKey}
    />,
    teacher: <RoomCreateForm
      initialValues={{
        nickname: state.userInfo?.nickname,
        classType: 1,
        duration: '30分钟',
      }}
      onFinish={onFinishRoomCreate}
    />,
    default: <RoleSelectionForm onFinish={onFinishRole} />,
  };

  const renderForm = mapRole[role || 'default'];

  return (
    <div className={styles.container}>
      <WelcomeModal
        visible={roleModalVisible}
        width="600px"
        closable={false}
        picVisible={false}
      >
        {renderForm}
      </WelcomeModal>
    </div>
  );
};

export default Home;
