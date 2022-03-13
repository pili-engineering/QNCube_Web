import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface StudentInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  fullName: string;
  idCard: string;
  examName: string;
  duration: number;
}

const StudentInfoCard: React.FC<StudentInfoCardProps> = (props) => {
  const {
    className, fullName, idCard, examName, duration, ...restProps
  } = props;
  return (
    <div
      className={classNames('student-info-card', className)}
      {...restProps}
    >
      <div className="header">
        <div className="title">检测成功</div>
        <div className="tip">考试开始将自动跳转至答题页面</div>
      </div>
      <div className="body">
        <div className="ctx">
          <div className="label">考生姓名：</div>
          <div className="value">{fullName}</div>
        </div>
        <div className="ctx">
          <div className="label">身份证号：</div>
          <div className="value">{idCard}</div>
        </div>
        <div className="ctx">
          <div className="label">考试名称：</div>
          <div className="value">{examName}</div>
        </div>
        <div className="ctx">
          <div className="label">考试时长：</div>
          <div className="value">
            {(duration / 1000 / 60).toFixed(2)}
            分钟
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
