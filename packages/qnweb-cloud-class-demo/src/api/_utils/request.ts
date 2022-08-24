import axios from 'axios';
import { Modal } from 'antd';

import { requestConfig } from '@/config';

const request = axios.create(requestConfig);

request.interceptors.request.use((config) => {
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
request.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const responseCode = response.data.code;
  if (responseCode === 0) {
    return response.data;
  }
  if ([401001, 401003].includes(responseCode)) { // 用户未登录或TOKEN过期
    Modal.error({
      title: '提示',
      content: response.data.message,
      onOk() {
        localStorage.clear();
        window.location.href = '/login';
      },
      okText: '确认',
    });
    return Promise.reject(response.data);
  }
  Modal.error({
    title: '接口请求错误',
    content: response.data.message,
  });
  return Promise.reject(response.data);
}, (error) => {
  Modal.error({
    title: '接口请求错误',
    content: error.message,
  });
  return Promise.reject(error);
});

export {
  request
};
