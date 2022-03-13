import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ErrorCodeCallbackResult {
  code: number;
  url: string,
  message: string,
}

interface Config {
  // axios 配置
  axiosRequestConfig?: AxiosRequestConfig;
  // 错误code码回调
  errorCodeCallback?: (result: ErrorCodeCallbackResult) => void;
  // 是否需要拦截
  shouldIntercept?: boolean;
  // 当需要拦截的时候，设置成功响应的自定义code码
  successCodes?: number[];
  // code码对应的message
  codeMessage?: {
    [key: number | string]: string
  };
}

/**
 * 创建axios实例
 * @param config
 */
export function createAxiosInstance(
  config?: Config,
): AxiosInstance {
  const {
    axiosRequestConfig,
    shouldIntercept = true,
    successCodes,
    codeMessage = {},
    errorCodeCallback
  } = config || {};
  const axiosInstance = axios.create(axiosRequestConfig);
  // Add a request interceptor
  axiosInstance.interceptors.request.use((config) => config,
    (error) => Promise.reject(error));
  // Add a response interceptor
  axiosInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseCode = response.data.code;
    // 直接响应
    if (!shouldIntercept) return response.data;
    // 自定义code状态码拦截
    if (successCodes?.includes(responseCode)) return response.data.data;
    // 错误响应
    const errorResult = {
      code: responseCode,
      url: response.config.url || 'Unknown url',
      message: codeMessage[responseCode] || response.data.message || 'No error message is defined',
    };
    if (errorCodeCallback) errorCodeCallback(errorResult);
    return Promise.reject(new Error(JSON.stringify(errorResult)));
  }, (error) => Promise.reject(error));
  return axiosInstance;
}

/**
 * 请求工具
 */
class HttpRequestUtil {
  public instance: AxiosInstance = createAxiosInstance();

  /**
   * 设置axios实例
   * @param instance
   */
  setInstance(instance: AxiosInstance): AxiosInstance {
    this.instance = instance;
    return this.instance;
  }

  /**
   * 获取axios实例
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

/**
 * 请求工具对象
 * 用法:
 * httpRequestUtil.setInstance(createAxiosInstance());
 */
export const httpRequestUtil = new HttpRequestUtil();
