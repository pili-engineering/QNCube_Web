import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface SheetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  totalScore: number; // 总分
  questionCount: number; // 题目数量
  answer: boolean[]; // 是否已作答
}

const SheetCard: React.FC<SheetCardProps> = (props) => {
  const {
    className, questionCount, answer, totalScore, ...restProps
  } = props;
  return (
    <div className={classNames('sheet-card', className)} {...restProps}>
      <div className="main-title">答题卡</div>
      <div className="sub-title ">
        选择题（共
        {questionCount}
        题，合计
        {totalScore}
        分）
      </div>
      <div className="content">
        {
          Array(questionCount).fill(0).map((_, index) => (
            <div
              className={classNames('answer-square', {
                'answered-square': answer[index],
              })}
              key={index}
            >
              {index + 1}
            </div>
          ))
        }
      </div>
      <div className="mark">
        <div className="mark-square answered">
          <span className="icon" />
          <span className="text">已答</span>
        </div>
        <div className="mark-square unanswered">
          <span className="icon" />
          <span className="text">未答</span>
        </div>
      </div>
    </div>
  );
};

export default SheetCard;
