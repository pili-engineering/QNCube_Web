import { useEffect, useState } from 'react';
import { ExamListStudentResult } from '@/api/types';
import ExamApi from '@/api/ExamApi';

interface Pagination {
  page?: number;
  pageSize?: number;
}

const useStudentExaminationRoomList = (defaultPagination?: Pagination) => {
  const [table, setTable] = useState<ExamListStudentResult['list']>([]);
  const [pagination, setPagination] = useState(defaultPagination);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    ExamApi.getListStudent({
      pageNum: `${pagination?.page || 1}`,
      pageSize: `${pagination?.pageSize || 10}`,
    }).then((response) => {
      setTable(response.list);
    }).finally(() => {
      setLoading(false);
    });
  }, [pagination]);

  return {
    table,
    setPagination,
    loading,
  };
};

export default useStudentExaminationRoomList;
