import React from 'react';
import { useHistory } from 'react-router-dom';
import { pandora } from '@/utils';
import HeaderBar, { HeaderBarProps } from '../../components/header-bar';

export interface RouteHeaderProps extends HeaderBarProps {
  titleRoutePath: string;
}

const BaseHeader: React.FC<RouteHeaderProps> = (props) => {
  const history = useHistory();
  const { titleRoutePath } = props;
  return (
    <HeaderBar
      onExit={() => {
        pandora.report({
          action: 'logout',
          value: {
            userId: pandora.getCacheValue('userId'),
            role: pandora.getCacheValue('role'),
            pathname: pandora.getCacheValue('pathname'),
          },
        });
        localStorage.clear();
        history.push('/');
      }}
      onTitleClick={() => {
        history.push(titleRoutePath);
      }}
    />
  );
};

export default BaseHeader;
