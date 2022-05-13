import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, message } from 'antd';

import InviteCard from '@/components/invite-card';
import { getInterview, Interview } from '@/api';

import styles from './index.module.scss';

const MeetingEntrance: React.FC = () => {
  const history = useHistory();
  const params = useParams<Record<'interviewId', string>>();
  const query = useRef(new URLSearchParams(history.location.search));

  const [interview, setInterview] = useState<Partial<Interview>>();
  const [checked, setChecked] = useState(false);

  /**
   * 初始化数据
   */
  useEffect(() => {
    const { interviewId } = params;
    const interviewToken = query.current.get('interviewToken');
    if (interviewToken) {
      localStorage.setItem('interviewToken', interviewToken);
    }
    getInterview({
      interviewId
    }).then(result => {
      setInterview(result);
    });
  }, [params]);

  /**
   * 点击同意并加入
   */
  const onOk = () => {
    if (!checked) {
      return message.error('请阅读并同意七牛云服务用户协议和隐私权政策');
    }
    // const url = os.isPc ? `/room/${params.interviewId}` : `/mobile/room/${params.interviewId}`;
    history.push(`/room/${params.interviewId}`);
  };

  return <div className={styles.meetingEntrance}>
    <InviteCard
      name={interview?.candidateName}
      jobs={interview?.career}
      date={interview?.startTime}
      onOk={onOk}
      checked={checked}
      onChange={() => setChecked(!checked)}
    >
      <div className={styles.action}>
        <span className={styles.firstInTip}>首次进入？</span>
        <Button danger onClick={() => history.push('/device-test')}>设备检测</Button>
      </div>
    </InviteCard>
  </div>;
};

export default MeetingEntrance;
