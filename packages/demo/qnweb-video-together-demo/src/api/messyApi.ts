import request from './request';

export interface GetRecentImageApiResponse {
  fileName: string;
  fileUrl: string;
  id: string;
  status: number;
}

/**
 * 获取rtc拍照上传最新的照片
 */
export function getRecentImageApi() {
  return request.get<GetRecentImageApiResponse, GetRecentImageApiResponse>('/v1/recentImage');
}
