import React, { useEffect } from 'react';
import moment from 'moment';
import { Divider, Progress } from 'antd';
import classNames from 'classnames';
import { useInterval } from 'ahooks';

import './index.scss';

export interface ScheduleCardProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
  current: number;
  total: number;
  timeRemaining: number;
}

const INTERVAL = 1000;

const ScheduleCard: React.FC<ScheduleCardProps> = (props) => {
  const { current, total, className, style, timeRemaining } = props;
  const [countDown, setCountDown] = React.useState<number>();

  useEffect(() => {
    setCountDown(timeRemaining);
  }, [timeRemaining]);


  useInterval(() => {
    if (countDown) {
      setCountDown(countDown - INTERVAL);
    } else {
      setCountDown(undefined);
    }
  }, countDown ? INTERVAL : undefined);

  return <div className={classNames('schedule-card', className)} style={style}>
    <div className="time">
      <div className="time-tip text-center">剩余时间</div>
      <div className="time-count text-center">
        {
          moment({
            h: moment.duration(countDown, 'milliseconds').hours(),
            m: moment.duration(countDown, 'milliseconds').minutes(),
            s: moment.duration(countDown, 'milliseconds').seconds(),
          }).format('HH:mm:ss')
        }
      </div>
    </div>
    <Divider className="divider"/>
    <div className="progress">
      <div className="progress-tip text-center">当前进度</div>
      <div className="progress-current text-center">
        {current}
        /
        {total}
      </div>
      <Progress
        percent={+((current / total) * 100).toFixed(1)}
        className="progress-bar text-center"
      />
    </div>
  </div>;
};

export default ScheduleCard;
