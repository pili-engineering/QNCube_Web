import { Button, ButtonProps } from 'antd';
import { FC } from 'react';
import { useSafeState } from '../../hooks';

interface LoadingButtonProps extends ButtonProps {
  onClick?: () => void;
}

/**
 * 自动loading组件
 * @param props
 * @constructor
 */
const LoadingButton: FC<LoadingButtonProps> = props => {
  const { children, onClick, ...restProps } = props;
  const [loading, setLoading] = useSafeState(false);
  const onHandlerClick = async () => {
    try {
      setLoading(true);
      onClick && await onClick();
    } catch (e) {

    } finally {
      setLoading(false);
    }
  };
  return <Button {...restProps} loading={loading} onClick={() => onHandlerClick()}>{children}</Button>;
};

export default LoadingButton;