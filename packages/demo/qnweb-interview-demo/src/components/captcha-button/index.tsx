import React, {
  HTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import './index.scss';

export type InternalChangeEventHandler = () => Promise<unknown>;

interface CountDownProps extends HTMLAttributes<HTMLDivElement> {
  defaultCount?: number;
  onChange?: InternalChangeEventHandler;
}

/**
 * 倒计时组件
 * @param props
 * @constructor
 */
const CaptchaButton: React.FC<CountDownProps> = props => {

  const { defaultCount = 59, onChange, className, ...restProps } = props;

  const countDownRef = useRef(null);

  const intervalRef = useRef<null | NodeJS.Timer>(null);

  const [count, changeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const onClick: React.MouseEventHandler<HTMLElement> = async () => {
    setLoading(true);
    try {
      onChange && await onChange();
      changeCount(defaultCount);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  // 组件卸载时清除计时器
  useEffect(() => {
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (count === defaultCount) {
      intervalRef.current = setInterval(() => {
        changeCount(preCount => preCount - 1);
      }, 1000);
    } else if (count === 0) {
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [count, defaultCount]);

  return <div {...restProps} ref={countDownRef} className={classNames('count-down', className)}>
    {
      count ?
        <Button type='link' className="count-down--btn">{count}s</Button> :
        <Button
          type='link'
          onClick={onClick}
          className="count-down--btn"
          loading={loading}
        >获取验证码</Button>
    }
  </div>;
};

export default CaptchaButton;