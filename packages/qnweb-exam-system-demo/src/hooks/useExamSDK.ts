import { useState } from 'react';
import { QNExamClient } from 'qnweb-exam-sdk';
import { useUnmount } from 'ahooks';

const useExamSDK = () => {
  const [examClient] = useState<QNExamClient>(() => {
    return QNExamClient.create();
  });

  useUnmount(() => {
    if (examClient) {
      examClient.stop();
    }
  });

  return {
    examClient
  };
};

export default useExamSDK;
