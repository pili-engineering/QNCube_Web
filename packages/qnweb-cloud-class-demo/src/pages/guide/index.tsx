import React, { ReactElement, useState } from 'react';
import GuideCard from '@/ui-kit/guide-card';
import RoleSelectPanel, { RoleValue } from '@/ui-kit/guide-card/role-select-panel';
import RippleGroup from '@/ui-kit/guide-card/ripple-group';
import RoomCreateForm, { FormResult } from '@/ui-kit/guide-card/room-create-form';
import RoomJoinForm from '@/ui-kit/guide-card/room-join-form';
import { useUserStore } from '@/store';
import { baseCreateRoomApi } from '@/api';
import styles from './index.module.scss';
import usePushHistory from '@/hooks/usePushHistory';
import { Form, FormProps } from 'antd';

type Step = 'role-select' | 'room-create' | 'room-join';

const Guide = () => {
  const pushHistory = usePushHistory();
  const [selectedRole, setSelectedRole] = useState<RoleValue>();
  const [step, setStep] = useState<Step>('role-select');
  const { state: userState } = useUserStore();
  const [secretKey, setSecretKey] = useState<string>('');
  const [form] = Form.useForm();

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
  // 老师创建房间，提交表单
  const onCreateRoom = (result: FormResult): void => {
    const mapClassType = {
      'small-class': 1,
      '1v1': 2
    };
    const classTypeValue = mapClassType[result.classType];
    baseCreateRoomApi({
      title: result.title,
      params: [
        { key: 'nickname', value: result.nickname },
        { key: 'classType', value: classTypeValue },
        { key: 'duration', value: 30 * 60 * 1000 },
        { key: 'role', value: selectedRole },
      ],
    }).then((response) => {
      const roomId = response.roomInfo?.roomId;
      pushHistory('/room', {
        query: {
          roomId,
          role: selectedRole
        }
      });
    });
  };
  // 确认选择角色
  const onSubmitRole = (): void => {
    if (selectedRole === 'teacher') {
      setStep('room-create');
    }
    if (selectedRole === 'student') {
      setStep('room-join');
    }
  };
  // 学生点击加入房间
  const onJoinRoom = (): void => {
    pushHistory('/room', {
      query: {
        roomId: secretKey,
        role: selectedRole
      }
    });
  };
  // 渲染表单
  const renderStep = (step: Step): ReactElement | undefined => {
    if (step === 'role-select') {
      return <RoleSelectPanel
        title="欢迎来到牛课堂!"
        tipTitle="选择您的角色"
        value={selectedRole}
        onChange={(value) => setSelectedRole(value)}
        onSubmit={onSubmitRole}
      />;
    }
    if (step === 'room-create') {
      return <RoomCreateForm
        title="创建教室"
        form={form}
        initialValues={{
          nickname: userState.userInfo?.nickname,
          classType: 'small-class',
        }}
        onFinish={onCreateRoom}
        onFieldsChange={onFieldsChange}
      />;
    }
    if (step === 'room-join') {
      return <RoomJoinForm
        title="进入教室"
        value={secretKey}
        onChange={event => setSecretKey(event.target.value)}
        onOk={onJoinRoom}
      />;
    }
  };

  return (
    <div className={styles.container}>
      <GuideCard
        className={styles.card}
      >
        <div className={styles.step}>{renderStep(step)}</div>
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
