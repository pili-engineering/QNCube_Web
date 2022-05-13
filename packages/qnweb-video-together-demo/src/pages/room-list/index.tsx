import React from 'react';
import { Button, Table } from 'antd';
import { useHistory } from 'react-router-dom';
import useRoomList from '@/hooks/useRoomList';
import { BaseRoomInfo } from '@/api/baseRoomApi';

const RoomList = () => {
  const history = useHistory();
  const {
    roomList, setPagination, total, pagination,
    loading,
  } = useRoomList();
  /**
   * 加入房间
   * @param room
   */
  const onJoinRoom = (room: BaseRoomInfo) => {
    const invitationCodeParams = room.params?.find(
      (item) => item.key === 'invitationCode',
    );
    const invitationCode = invitationCodeParams?.value;
    history.push(`/room?invitationCode=${invitationCode}`);
  };
  const columns = [
    { title: '房间ID', dataIndex: 'roomId', key: 'roomId' },
    { title: '房间名', dataIndex: 'title', key: 'title' },
    { title: '创建者', dataIndex: 'creator', key: 'creator' },
    {
      title: '邀请码',
      key: 'invitationCode',
      render: (room: BaseRoomInfo) => {
        const invitationCodeParams = room.params?.find(
          (item) => item.key === 'invitationCode',
        );
        return invitationCodeParams?.value as string;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (room: BaseRoomInfo) => (
        <Button
          onClick={() => onJoinRoom(room)}
          type="primary"
          size="small"
        >
          加入房间
        </Button>
      ),
    },
  ];
  return (
    <Table
      loading={loading}
      rowKey="roomId"
      dataSource={roomList}
      columns={columns}
      pagination={{
        total,
        pageSize: pagination?.pageSize,
        current: pagination?.pageNum,
      }}
      onChange={(page) => {
        setPagination({
          pageSize: page.pageSize,
          pageNum: page.current,
        });
      }}
    />
  );
};

export default RoomList;
