import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import GuideCard from '@/components/guide-card';
import RoleSelectPanel from '@/components/guide-card/role-select-panel';
import RippleGroup from '@/components/guide-card/ripple-group';

import styles from './index.module.scss';

const Guide = () => {
  const history = useHistory();
  const [selectedRole, setSelectedRole] = useState<string>();
  const onSubmit = () => {
    if (selectedRole === 'teacher') return history.push('/teacher/list');
    if (selectedRole === 'student') return history.push('/student/list');
  };
  return (
    <div className={styles.container}>
      <GuideCard
        className={styles.card}
      >
        <div className={styles.step}>
          <RoleSelectPanel
            title="欢迎来到牛监考"
            tipTitle="选择您的角色"
            value={selectedRole}
            onChange={(value) => setSelectedRole(value)}
            onSubmit={onSubmit}
          />
        </div>
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
