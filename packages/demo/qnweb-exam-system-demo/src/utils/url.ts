/**
 * 从url中获取参数
 * @param query
 */
export function getUrlQueryParams(query: string): string | null {
  return new URLSearchParams(window.location.search).get(query);
}