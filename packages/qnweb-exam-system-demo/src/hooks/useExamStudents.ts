import { useCallback, useState } from 'react';
import { ExamExamineesExamIdResult } from '@/api/types';
import ExamApi from '@/api/ExamApi';

export interface Pagination {
  current?: number;
  pageSize?: number;
}

export type ToggleListParams = {
  examId: string;
} & Pagination

const useExamStudents = () => {
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 20,
  });
  const [total, setTotal] = useState(0);
  const [students, setStudents] = useState<ExamExamineesExamIdResult['list']>();

  /**
   * 列表切换
   */
  const toggleList = useCallback((params: ToggleListParams) => {
    const current = params.current || pagination.current || 1;
    const pageSize = params.pageSize || pagination.pageSize || 20;
    setPagination({
      current,
      pageSize,
    });
    return ExamApi.getExaminees({
      pageNum: `${current}`,
      pageSize: `${pageSize}`,
      examId: params.examId,
    }).then((res) => {
      setTotal(res.total);
      setStudents(res.list);
    });
  }, [pagination]);

  return {
    students,
    total,
    pagination,
    toggleList,
    setStudents,
  };
};

export default useExamStudents;
