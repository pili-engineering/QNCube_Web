import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Button, message } from 'antd';
import InviteCard from '../../components/invite-card';
import { getInterview, Interview } from '../../api';
import {os} from "@/utils";
import css from './index.module.scss';

const MeetingEntrance: React.FC = () => {
  const history = useHistory();
  const params = useParams<{interviewId: string}>();
  const location = useLocation();
  const [interview, setInterview] = useState<Partial<Interview>>();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const interviewToken = new URLSearchParams(location.search).get('interviewToken');
    if (interviewToken) {
      localStorage.setItem('interviewToken', interviewToken);
    }
    (async function renderData() {
      const interview = await getInterview({
        interviewId: params.interviewId
      });
      setInterview(interview);
    })();
  }, []);
  const onAgree = () => {
    if (!checked) {
      return message.error('请阅读并同意七牛云服务用户协议和隐私权政策');
    }
    const url = os.isPc ? `/room/${params.interviewId}` : `/mobile/room/${params.interviewId}`
    history.push(url);
  };
  return <div className={css.meetingEntrance}>
    <InviteCard
      name={interview?.candidateName}
      jobs={interview?.career}
      date={interview?.startTime}
      onAgree={onAgree}
      checked={checked}
      onCheck={() => setChecked(!checked)}
    >
      <div className={css.action}>
        <span className={css.firstIn}>首次进入？</span>
        <Button danger onClick={() => history.push('/device-test')}>设备检测</Button>
      </div>
    </InviteCard>
  </div>;
};

export default MeetingEntrance;