/**
 * 随机生成指定长度的数字
 * @param len
 */
export function buildRandomStr(len: number): string {
  return Array.from(Array(len)).map(() => Math.floor(Math.random() * 10)).join('');
}