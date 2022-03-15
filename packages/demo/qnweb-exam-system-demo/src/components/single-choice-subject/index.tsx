import React from 'react';
import classNames from 'classnames';
import { Radio, Space } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import './index.scss';

export interface SingleChoiceSubjectProps {
  title: string;
  options: string[];
  value?: string,
  onChange: (e: RadioChangeEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 单选题
 */
const SingleChoiceSubject: React.FC<SingleChoiceSubjectProps> = (props) => {
  const {
    title, options, className, value, onChange, ...restProps
  } = props;
  return (
    <div className={classNames('single-choice-subject', className)} {...restProps}>
      <div className="title">{title}</div>
      <div className="options">
        <Radio.Group value={value} onChange={onChange}>
          <Space direction="vertical">
            {
              options.map((optionItem, index) => (
                <Radio
                  key={index}
                  value={optionItem}
                >
                  {optionItem}
                </Radio>
              ))
            }
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default SingleChoiceSubject;
