import { message, Modal } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { httpRequestUtil, createAxiosInstance } from '@/api/request';

/**
 * 注册请求拦截器
 * @param config
 */
function registerRequestInterceptor(config: AxiosRequestConfig) {
  httpRequestUtil.setInstance(
    createAxiosInstance({
      axiosRequestConfig: {
        ...config,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      successCodes: [0],
      errorCodeCallback(result) {
        if ([401001, 401003].includes(result.code)) {
          Modal.error({
            title: '提示',
            content: '登录态失效，点击确认重新登录',
            onOk() {
              localStorage.clear();
              window.location.href = '/';
            },
            okText: '确认',
          });
        } else {
          message.error(result.message);
        }
      },
    }),
  );
}

export default registerRequestInterceptor;
