import { useEffect, useState } from 'react';
import { ExamListTeacherResult } from '@/api/types';
import ExamApi from '@/api/ExamApi';

interface Pagination {
  current?: number;
  pageSize?: number;
}

const useTeacherExaminationRoomList = (defaultPagination?: Pagination) => {
  const [table, setTable] = useState<ExamListTeacherResult['list']>([]);
  const [pagination, setPagination] = useState(defaultPagination);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    ExamApi.getListTeacher({
      pageNum: `${pagination?.current || 1}`,
      pageSize: `${pagination?.pageSize || 10}`,
    }).then((response) => {
      setTable(response.list);
      setTotal(response.total || 0);
    }).finally(() => {
      setLoading(false);
    });
  }, [pagination]);

  return {
    table,
    setPagination,
    total,
    loading,
    pagination,
  };
};

export default useTeacherExaminationRoomList;
