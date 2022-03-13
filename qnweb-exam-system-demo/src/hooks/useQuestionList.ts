import { useEffect, useState } from 'react';
import { ExamQuestionListTypeResult } from '@/api/types';
import ExamApi from '@/api/ExamApi';

interface Pagination {
  pageNum?: number;
  pageSize?: number;
}

const useQuestionList = (defaultPagination?: Pagination) => {
  const [pagination, setPagination] = useState(defaultPagination);
  const [questions, setQuestions] = useState<ExamQuestionListTypeResult['list']>([]);
  useEffect(() => {
    ExamApi.getQuestionList({
      pageNum: `${pagination?.pageNum || 1}`,
      pageSize: `${pagination?.pageSize || 10}`,
    })?.then((res) => {
      setQuestions(res.list);
    });
  }, [pagination]);

  return {
    setPagination,
    questions,
  };
};

export default useQuestionList;
