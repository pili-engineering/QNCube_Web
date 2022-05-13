import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { generateRoutePath } from '@/utils/routes';
import { routes } from '@/router';

export interface PushHistoryConfig {
  query?: object,
  params?: object
}

type RoutePath = typeof routes[number]['path'];

const usePushHistory = () => {
  const history = useHistory();

  const pushHistory = useCallback(
    (path: RoutePath, config?: PushHistoryConfig) => {
      history.push(generateRoutePath(path, config))
    },
    [history],
  );

  return pushHistory;
};

export default usePushHistory;
