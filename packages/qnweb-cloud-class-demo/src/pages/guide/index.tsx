import React, { ReactNode, useState } from 'react';
import { Form, FormProps } from 'antd';

import { useUserStore } from '@/store';
import { RoomApi } from '@/api';
import { usePushHistory } from '@/hooks';
import {
  FormResult,
  GuideCard,
  RippleGroup,
  RoleSelectPanel,
  RoleValue,
  RoomCreateForm,
  RoomJoinForm
} from '@/components';

import styles from './index.module.scss';

type FormType = 'roleSelect' | 'roomCreate' | 'roomJoin';

const Guide: React.FC = () => {
  const pushHistory = usePushHistory();
  const { state: userState } = useUserStore();
  const [form] = Form.useForm();

  const [selectedRole, setSelectedRole] = useState<RoleValue>();
  const [formType, setFormType] = useState<FormType>('roleSelect');
  const [secretKey, setSecretKey] = useState<string>('');

  /**
   * 表单字段变化
   * @param changedFields
   */
  const onFieldsChange: FormProps['onFieldsChange'] = (changedFields) => {
    const [field] = changedFields;
    const fieldName = field.name;
    if (!Array.isArray(fieldName)) return;
    const validateFieldName = fieldName[0];
    if (validateFieldName === 'title') {
      form.setFieldsValue({
        title: field.value.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/, ''),
      });
    }
  };

  /**
   * 创建房间，提交表单
   * @param result
   */
  const onCreateRoom = (result: FormResult): void => {
    const mapClassType = {
      smallClass: 1,
      oneToOne: 2
    };
    const classTypeValue = mapClassType[result.classType];
    RoomApi.baseCreateRoomApi({
      title: result.title,
      params: [
        { key: 'nickname', value: result.nickname },
        { key: 'classType', value: classTypeValue },
        { key: 'duration', value: 30 * 60 * 1000 },
        { key: 'role', value: selectedRole },
      ],
    }).then((response) => {
      const roomId = response.roomInfo?.roomId;
      if (!roomId) {
        return Promise.reject(new TypeError(`roomId is ${roomId}`));
      }
      onJoinRoom(roomId);
    });
  };

  /**
   * 确认选择角色
   */
  const onSubmitRole = (): void => {
    if (selectedRole === 'teacher') {
      setFormType('roomCreate');
    }
    if (selectedRole === 'student') {
      setFormType('roomJoin');
    }
  };

  /**
   * 加入房间
   * @param roomId
   */
  const onJoinRoom = (roomId: string): void => {
    pushHistory('/room', {
      query: {
        roomId,
        role: selectedRole,
      }
    });
  };

  /**
   * 渲染相应的表单
   * @param type
   */
  const renderForm = (type: FormType): ReactNode => {
    if (type === 'roleSelect') {
      return <RoleSelectPanel
        title="欢迎来到牛课堂!"
        tipTitle="选择您的角色"
        value={selectedRole}
        onChange={(value) => setSelectedRole(value)}
        onSubmit={onSubmitRole}
      />;
    }
    if (type === 'roomCreate') {
      return <RoomCreateForm
        title="创建教室"
        form={form}
        initialValues={{
          nickname: userState.userInfo?.nickname,
          classType: 'smallClass',
        }}
        onFinish={onCreateRoom}
        onFieldsChange={onFieldsChange}
      />;
    }
    if (type === 'roomJoin') {
      return <RoomJoinForm
        title="进入教室"
        value={secretKey}
        onChange={event => setSecretKey(event.target.value)}
        onOk={() => onJoinRoom(secretKey)}
      />;
    }
  };

  return (
    <div className={styles.container}>
      <GuideCard
        className={styles.card}
      >
        <div className={styles.step}>{renderForm(formType)}</div>
      </GuideCard>
      <RippleGroup
        className={styles.rippleGroupTopLeft}
      />
      <RippleGroup
        className={styles.rippleGroupRightBottom}
      />
    </div>
  );
};

export default Guide;
