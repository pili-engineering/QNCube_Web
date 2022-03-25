/**
 * 不同环境下不同配置
 */
export const apiBaseConfig = {
  dev: {
    baseURL: 'http://10.200.20.28:5080',
    timeout: 10000,
  },
  test: {
    baseURL: 'http://10.200.20.28:5080',
    timeout: 10000,
  },
  prod: {
    baseURL: 'https://niucube-api.qiniu.com',
    timeout: 10000,
  },
};

/**
 * 当前环境
 */
export const env = import.meta.env.VITE_NODE_ENV || 'dev';

/**
 * 当前配置
 */
export const apiRequestConfig = apiBaseConfig[env];

/**
 * Response 中 code 状态码
 * @link https://cf.qiniu.io/pages/viewpage.action?pageId=63570443
 */
export const apiResponseCode = {
  0: '请求成功',
  400000: '参数错误',
  401001: '用户未登录或TOKEN过期',
  401002: '短信登录时，验证码错误',
  401003: 'TOKEN解析出错',
  401004: '用户已经登录',
  404001: '没有这个用户',
  404002: '没有这个面试',
  429001: '短信码发送请求过多',
  500000: '服务端内部错误',
  502001: '服务端外部错误',
  401000: '权限不足',
  404000: '当前请求接口不可用',
};
