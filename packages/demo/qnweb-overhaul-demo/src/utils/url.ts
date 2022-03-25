/**
 * 获取 url 上的参数
 * @param query
 */
// eslint-disable-next-line import/prefer-default-export
export function getUrlParam<T extends string>(query: string): T {
  const result = new URLSearchParams(window.location.search).get(query);
  return result as T;
}
