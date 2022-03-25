import { useEffect, useState } from 'react';
import { repairListRoomApi, RepairListRoomResRoom } from '../api';

/**
 * 房间列表
 */
const useRepairRoomList = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
  });
  const [list, setList] = useState<RepairListRoomResRoom[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    repairListRoomApi(pagination).then((response) => {
      setList(response.list);
    }).finally(() => {
      setLoading(false);
    });
  }, [pagination]);

  return {
    list,
    setPagination,
    pagination,
    loading,
  };
};

export default useRepairRoomList;
