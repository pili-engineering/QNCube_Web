import { httpRequestUtil } from './request';
import { PandoraTokenParams, PandoraTokenResult } from './types';

class PandoraApi {
  /**
   * PandoraToken
   * @param params
   */
  getToken(params?: PandoraTokenParams) {
    return httpRequestUtil.getInstance().get<PandoraTokenResult, PandoraTokenResult>(
      '/v1/pandora/token',
      params,
    );
  }
}

export default new PandoraApi();