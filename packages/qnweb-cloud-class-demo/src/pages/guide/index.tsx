import React, { ReactNode, useState } from 'react';
import { Form, FormProps } from 'antd';
import { useHistory } from 'react-router-dom';

import { useUserStore } from '@/store';
import { RoomApi } from '@/api';
import {
  CloudClassType,
  FormResult,
  GuideCard,
  RippleGroup,
  RoleSelectPanel,
  RoleValue,
  RoomCreateForm,
  RoomJoinForm
} from '@/components';
import { RoutePath } from '@/router';

import styles from './index.module.scss';

enum FormType {
  Select = 'select',
  Create = 'create',
  Join = 'join',
}

export const Guide: React.FC = () => {
  const history = useHistory();
  const { state: userState } = useUserStore();
  const [form] = Form.useForm();

  const [selectedRole, setSelectedRole] = useState<RoleValue>();
  const [formType, setFormType] = useState<FormType>(FormType.Select);
  const [secretKey, setSecretKey] = useState<string>('');
  const [createLoading, setCreateLoading] = useState(false);

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
    setCreateLoading(true);
    RoomApi.baseCreateRoomApi({
      title: result.title,
      params: [
        { key: 'nickname', value: result.nickname },
        { key: 'classType', value: result.classType },
        { key: 'duration', value: `${30 * 60 * 1000}` },
        { key: 'role', value: selectedRole },
      ],
    }).then((result) => {
      const data = result.data;
      const roomId = data?.roomInfo?.roomId;
      if (!roomId) {
        return Promise.reject(new TypeError(`roomId is ${roomId}`));
      }
      setCreateLoading(false);
      pushRoute(roomId);
    });
  };

  /**
   * 确认选择角色
   */
  const onSubmitRole = (): void => {
    if (selectedRole === 'teacher') {
      setFormType(FormType.Create);
    }
    if (selectedRole === 'student') {
      setFormType(FormType.Join);
    }
  };

  /**
   * 加入房间
   * @param roomId
   */
  const pushRoute = (roomId: string): void => {
    history.push(`${RoutePath.Room}?roomId=${roomId}&role=${selectedRole}`);
  };

  /**
   * 渲染相应的表单
   * @param type
   */
  const renderForm = (type: FormType): ReactNode => {
    if (type === FormType.Select) {
      return <RoleSelectPanel
        title="欢迎来到牛课堂!"
        tipTitle="选择您的角色"
        value={selectedRole}
        onChange={(value) => setSelectedRole(value)}
        onSubmit={onSubmitRole}
      />;
    }
    if (type === FormType.Create) {
      return <RoomCreateForm
        title="创建教室"
        form={form}
        initialValues={{
          nickname: userState.userInfo?.nickname,
          classType: CloudClassType.Small,
        }}
        onFinish={onCreateRoom}
        onFieldsChange={onFieldsChange}
        loading={createLoading}
      />;
    }
    if (type === FormType.Join) {
      return <RoomJoinForm
        title="进入教室"
        value={secretKey}
        onChange={event => setSecretKey(event.target.value)}
        onOk={() => pushRoute(secretKey)}
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
