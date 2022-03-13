import { httpRequestUtil } from './request';
import { ExamAiTokenParams, ExamAiTokenResult } from './types';

class AIApi {
  /**
   * 获取 AI Token
   * @param params
   */
  getToken(params?: ExamAiTokenParams) {
    return httpRequestUtil.getInstance().get<ExamAiTokenResult, ExamAiTokenResult>(
      '/v1/exam/aiToken',
      params,
    );
  }
}

export default new AIApi();