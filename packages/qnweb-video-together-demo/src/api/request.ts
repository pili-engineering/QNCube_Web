import axios from 'axios';
import { message, Modal } from 'antd';
import { apiResponseCode, apiRequestConfig } from './config';

const instance = axios.create(apiRequestConfig);

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  if (config.method?.toLowerCase() === 'post') {
    return {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
      },
    };
  }
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const responseCode: keyof typeof apiResponseCode = response.data.code;
  if (responseCode === 0) {
    return response.data.data;
  }
  if ([401001, 401003].includes(responseCode)) { // 用户未登录或TOKEN过期
    Modal.error({
      title: '提示',
      content: '登录态失效，点击确认重新登录',
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
  return Promise.reject(new Error(JSON.stringify({
    code: responseCode,
    url: response.config.url,
    message: response.data.message,
  })));
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  message.error(error.message);
  return Promise.reject(error);
});

export default instance;
