import { useEffect, useState } from 'react';
import { baseListRoomApi, BaseListRoomApiResponseData } from '@/api/baseRoomApi';

interface IPagination {
  pageNum?: number;
  pageSize?: number;
}

const useRoomList = (defaultPagination?: IPagination) => {
  const [roomList, setRoomList] = useState<BaseListRoomApiResponseData['list']>([]);
  const [pagination, setPagination] = useState(defaultPagination);
  const [total, setTotal] = useState<number>();
  const [nextId, setNextId] = useState<string>();
  const [cnt, setCnt] = useState<number>();
  const [currentPageNum, setCurrentPageNum] = useState<number>();
  const [nextPageNum, setNextPageNum] = useState<number>();
  const [pageSize, setPageSize] = useState<number>();
  const [endPage, setEndPage] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    baseListRoomApi({
      pageNum: pagination?.pageNum || 1,
      pageSize: pagination?.pageSize || 10,
    }).then((res) => {
      setRoomList(res.list || []);
      setTotal(res.total);
      setNextId(res.nextId);
      setCnt(res.cnt);
      setCurrentPageNum(res.currentPageNum);
      setNextPageNum(res.nextPageNum);
      setPageSize(res.pageSize);
      setEndPage(res.endPage);
    }).finally(() => {
      setLoading(false);
    });
  }, [JSON.stringify(pagination)]);
  return {
    roomList,
    setPagination,
    total,
    nextId,
    cnt,
    currentPageNum,
    nextPageNum,
    pageSize,
    endPage,
    pagination,
    loading,
  };
};

export default useRoomList;
