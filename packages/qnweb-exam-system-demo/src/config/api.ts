/**
 * Response 中 code 状态码
 */
export const defaultHttpResponseCodeMessage = {
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

/**
 * 根据环境区别请求的域名地址
 */
export const defaultHttpRequestConfig = {
  dev: {
    baseURL: 'http://10.200.20.28:5080',
    timeout: 1000,
  },
  staging: {
    baseURL: 'http://10.200.20.28:5080',
    timeout: 1000,
  },
  prod: {
    baseURL: 'https://niucube-api.qiniu.com',
    timeout: 1000,
  },
};

// 场景类型
export const sceneType = "onlineExam"
