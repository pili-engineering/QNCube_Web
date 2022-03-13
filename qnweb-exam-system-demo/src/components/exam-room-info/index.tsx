import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Select } from 'antd';
import './index.scss';

export interface ExamRoomInfoProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  startTime?: number;
  endTime?: number
  duration?: number;
  studentCount?: number;
  decimal?: number;
  onExceptionTypeChange?: (value: string) => void;
  exceptionType?: string;
}

const ExamRoomInfo: React.FC<ExamRoomInfoProps> = (props) => {
  const {
    className, title, studentCount, endTime, startTime, duration, decimal = 2,
    exceptionType, onExceptionTypeChange, ...restProps
  } = props;
  const cheatingTextOpts = [
    '出现非考生人员',
    '考生非本人',
    '打开其他浏览器',
  ];
  return (
    <div className={classNames('exam-room-info', className)} {...restProps}>
      <div className="info">
        <div className="info-item">
          <span className="label">考试名称:</span>
          <span className="ctx">{title}</span>
        </div>
        <div className="info-item">
          <span className="label">考试时间:</span>
          <span className="ctx">
            {moment(startTime).format('YYYY-MM-DD HH:mm:ss')}
            -
            {moment(endTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        {
          duration && (
          <div className="info-item">
            <span className="label">考试时长:</span>
            <span className="ctx">
              {(duration / 1000 / 60).toFixed(decimal)}
              分钟
            </span>
          </div>
          )
        }
        <div className="info-item">
          <span className="label">考生人数:</span>
          <span className="ctx">{studentCount}</span>
        </div>
      </div>
      <div className="filter">
        <div className="filter-item">
          <span className="label">异常情况:</span>
          <Select value={exceptionType} onChange={onExceptionTypeChange} placeholder="请选择" style={{ width: 200 }}>
            {
              cheatingTextOpts.map(
                (text) => <Select.Option key={text} value={text}>{text}</Select.Option>,
              )
            }
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ExamRoomInfo;
