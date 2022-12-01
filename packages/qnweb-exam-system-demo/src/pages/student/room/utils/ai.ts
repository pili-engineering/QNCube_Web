import { QNLocalVideoTrack, QNRemoteVideoTrack } from 'qnweb-rtc';
import { QNAuthoritativeFaceComparer, QNFaceDetector } from 'qnweb-rtc-ai';
import ExamApi from '@/api/ExamApi';

/**
 * 权威人脸对比
 */
export const checkAuthFaceCompare = (
  track: QNLocalVideoTrack | QNRemoteVideoTrack,
  userId: string,
  examId: string,
) => QNAuthoritativeFaceComparer.run(
  track,
  {
    idcard: localStorage.getItem('idCard') || '',
    realname: localStorage.getItem('fullName') || '',
  },
).then((result) => ExamApi.reportCheating({
  examId,
  userId,
  event: {
    action: 'authFaceCompare',
    value: `${result.response.similarity}`,
  },
}));

/**
 * 人脸对比
 */
export const checkFaceDetect = (
  track: QNLocalVideoTrack | QNRemoteVideoTrack,
  userId: string,
  examId: string,
) => QNFaceDetector.run(track).then((result) => ExamApi.reportCheating({
  examId,
  userId,
  event: {
    action: 'faceDetect',
    value: `${result?.response?.result?.face_num || 0}`,
  },
}));
