/**
 * 不同环境下不同配置
 */
export const envConfig = {
  development: {
    RongIMConfig: {
      appKey: '3argexb63fl0e',
    },
    requestConfig: {
      baseURL: 'http://10.200.20.28:5080',
      timeout: 10000,
    },
    linkConfig: {
      cloudStorageUrl: 'http://image-dev.code41.me',
      privacyRight: 'https://www.qiniu.com/privacy-right', // 隐私权政策
      userAgreement: 'https://www.qiniu.com/user-agreement', // 服务用户协议
    },
  },
  test: {
    RongIMConfig: {
      appKey: '3argexb63fl0e',
    },
    requestConfig: {
      baseURL: 'http://10.200.20.28:5080',
      timeout: 10000,
    },
    linkConfig: {
      cloudStorageUrl: 'http://image-dev.code41.me',
      privacyRight: 'https://www.qiniu.com/privacy-right', // 隐私权政策
      userAgreement: 'https://www.qiniu.com/user-agreement', // 服务用户协议
    },
  },
  production: {
    RongIMConfig: {
      appKey: 'ik1qhw09isbvp',
    },
    requestConfig: {
      baseURL: 'https://niucube-api.qiniu.com',
      timeout: 10000,
    },
    linkConfig: {
      cloudStorageUrl: 'http://image-dev.code41.me',
      privacyRight: 'https://www.qiniu.com/privacy-right', // 隐私权政策
      userAgreement: 'https://www.qiniu.com/user-agreement', // 服务用户协议
    },
  },
};

/**
 * 当前环境
 */
export const curEnv = process.env.NODE_ENV || 'development';

/**
 * 当前配置
 */
export const curConfig = envConfig[curEnv as keyof typeof envConfig];

/**
 * 融云IM配置
 * @link https://developer.rongcloud.cn/app/appService/XaKs3DkxBidRWBKYfdx0TA
 */
export const { RongIMConfig } = curConfig;

/**
 * 请求配置
 */
export const { requestConfig } = curConfig;

/**
 * 链接配置
 */
export const { linkConfig } = curConfig;
