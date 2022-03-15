/**
 * 手机号处理
 * 禁止输入非数字的值，并对其进行截取
 * @param value
 * @returns
 */
export const phoneNumberUtil = (value: string): string => {
  return value.replace(/\D/g, '').substring(0, 11);
};

/**
 * 数字限制
 * @param value
 * @param len
 */
export const limitNumberUtil = (value: string, len: number): string => {
  return value.replace(/\D/g, '').substr(0, len);
};