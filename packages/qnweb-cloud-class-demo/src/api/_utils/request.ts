import axios from 'axios';
import { message, Modal } from 'antd';

import { apiResponseCode, apiRequestConfig } from './config';

const request = axios.create(apiRequestConfig);

request.interceptors.request.use((config) => {
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
request.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const responseCode: keyof typeof apiResponseCode = response.data.code;
  if (responseCode === 0) {
    return response.data.data;
  }
  if ([401001, 401003].includes(responseCode)) { // 用户未登录或TOKEN过期
    Modal.error({
      title: '提示',
      content: response.data.message,
      onOk() {
        localStorage.clear();
        window.location.href = '/';
      },
      okText: '确认',
    });
    return Promise.reject(new Error('重新登录'));
  }
  message.error(response.data.message);
  // message.error(apiResponseCode[responseCode])
  return Promise.reject(new Error(`${response.config.url} 接口响应错误: ${response.data.message}`));
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  message.error(error.message);
  return Promise.reject(error);
});

export {
  request
};
