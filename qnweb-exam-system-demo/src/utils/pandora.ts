import { AxiosInstance } from 'axios';
import PandoraApi from '@/api/PandoraApi';
import { createAxiosInstance } from '@/api/request';

const REPORT_BASE_URL = 'https://pandora-express-sdk.qiniu.com';

/**
 * 数据上报结构体
 */
export interface ReportExtraData<T = unknown> {
  action: string,
  value?: T,
}

/**
 * 潘多拉数据上报请求参数
 * @link https://developer.qiniu.com/express/6658/post-data
 */
export interface PandoraReportData {
  repo: string;
  sourcetype: string;
  raw?: string;
  host?: string;
  origin?: string;
  collectTime?: string;
  timestamp?: string;
}

/**
 * 类创建初始化参数
 */
export interface CreateConfig extends PandoraReportData {
  sceneType: string;
  device: string;
}

export class Pandora {
  private axios: AxiosInstance = createAxiosInstance({
    axiosRequestConfig: {
      headers: {
        'Content-Type': 'application/json',
      }
    },
    shouldIntercept: false
  });

  private cache = new Map();

  private token = '';

  private config: CreateConfig | null = null;

  static create(config: CreateConfig) {
    const instance = new this();
    instance.config = config;
    return instance;
  }

  setCache(key: string, value: unknown) {
    this.cache.set(key, value);
  }

  getCacheValue(key: string) {
    return this.cache.get(key);
  }

  /**
   * 获取token
   */
  getToken(): Promise<string> {
    if (this.token) return Promise.resolve(this.token);
    return PandoraApi.getToken().then((result) => {
      this.token = result.token;
      return this.token;
    });
  }

  /**
   * 数据上报
   * @link https://developer.qiniu.com/express/6658/post-data
   * @param data
   */
  report(data: ReportExtraData): Promise<unknown> {
    return this.getToken()
      .then(() => this.axios.post<PandoraReportData[]>(
        `${REPORT_BASE_URL}/api/v1/data`,
        [{
          repo: this.config?.repo || '',
          sourcetype: this.config?.sourcetype || '',
          raw: JSON.stringify({
            device: this.config?.device || '',
            sceneType: this.config?.sceneType || '',
            ...data,
          }),
        }],
        {
          headers: {
            Authorization: this.token,
          },
        },
      ));
  }
}

export const pandora = Pandora.create({
  repo: 'solutions_event',
  sourcetype: 'solutions_event_web',
  sceneType: 'onlineExam',
  device: window.navigator.userAgent,
});
