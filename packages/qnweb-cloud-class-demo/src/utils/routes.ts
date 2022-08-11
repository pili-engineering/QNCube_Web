import { generatePath } from 'react-router-dom';

import { stringifyQuery } from '@/utils';
import { PushHistoryConfig } from '@/hooks';

export function generateRoutePath(path: string, config: PushHistoryConfig = {}): string {
  const { params, query } = config;
  const withParams = generatePath(path, params);
  const withQuery = stringifyQuery(query);
  return withParams + withQuery;
}
