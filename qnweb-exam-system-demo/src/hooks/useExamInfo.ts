import { useEffect, useState } from 'react';
import { ExamInfoExamIdResult } from '@/api/types';
import ExamApi from '@/api/ExamApi';

const useExamInfo = (examId: string) => {
  const [examInfo, setExamInfo] = useState<ExamInfoExamIdResult>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (examId) {
      setLoading(true);
      ExamApi.getInfo({
        examId,
      }).then((res) => {
        setExamInfo(res);
      }).finally(() => setLoading(false));
    }
  }, [examId]);

  return {
    examInfo,
    loading,
  };
};

export default useExamInfo;
