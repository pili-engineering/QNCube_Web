import React from 'react';
import {
  PaginationProps, Table, TableColumnsType, TableProps,
} from 'antd';
import './index.scss';
import classNames from 'classnames';
import { ColumnsType } from 'antd/lib/table/interface';
import { RepairListRoomResRoom } from '../../../../api';

const columns: ColumnsType<RepairListRoomResRoom> = [
  {
    title: '房间ID', dataIndex: 'roomId', key: 'roomId', align: 'center',
  },
  {
    title: '房间名', dataIndex: 'title', key: 'title', align: 'center',
  },
  {
    title: '封面图',
    dataIndex: 'image',
    key: 'image',
    align: 'center',
    render(value) {
      return <img src={value} alt="cover picture" style={{ width: '100px' }} />;
    },
  },
];

interface Props extends TableProps<RepairListRoomResRoom> {
  data?: RepairListRoomResRoom[];
  customColumns?: ColumnsType<RepairListRoomResRoom>;
  pagination?: PaginationProps;
  loading?: boolean;
}

const RoomListTable: React.FC<Props> = (props) => {
  const {
    pagination, loading, customColumns = [], dataSource,
    className, ...restProps
  } = props;
  const allColumns: TableColumnsType<RepairListRoomResRoom> = columns.concat(customColumns);
  return (
    <Table
      bordered={false}
      className={classNames('room-list-table', className)}
      columns={allColumns}
      dataSource={dataSource}
      pagination={pagination}
      rowKey="roomId"
      loading={loading}
      locale={{
        emptyText: '暂无数据',
      }}
      {...restProps}
    />
  );
};

export default RoomListTable;
