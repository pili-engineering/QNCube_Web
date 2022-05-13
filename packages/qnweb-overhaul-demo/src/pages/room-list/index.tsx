import React, { useContext, useState } from 'react';
import {
  Button, message, Modal, Row,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { HeaderPanel, UserBox, UserBoxProps } from '../../components';
import { StoreContext } from '../../store';
import {
  repairCreateRoomApi, Role, signOut, updateAccountInfo,
} from '../../api';
import RoomCreateModal, { RoomCreateModalProps } from './components/RoomCreateModal';
import { useRepairRoomList } from '../../hooks';
import RoomListTable from './components/RoomListTable';
import styles from './index.module.scss';

enum StreamType {
  Rtmp = 'rtmp',
  Rtc = 'rtc'
}

interface JoinRoomQuery {
  roomId?: string;
  role?: Role;
  streamType?: StreamType;
}

const RoomList = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(StoreContext);
  const [visible, setVisible] = useState(false);
  const [joinRoomModalVisible, setJoinRoomModalVisible] = useState(false);
  const [joinRoomRes, setJoinRoomRes] = useState<JoinRoomQuery>();
  const {
    list: dataSource, loading, setPagination, pagination,
  } = useRepairRoomList();

  /**
   * 进入房间
   */
  const gotoRoom = (joinRoomQuery: Partial<JoinRoomQuery>) => {
    const { role, roomId, streamType: type } = joinRoomQuery;
    history.push(`/room/${roomId}?role=${role}&streamType=${type}`);
  };

  /**
   * 更新用户名
   * @param nickname
   */
  const onUpdateUsername: UserBoxProps['onUpdateUsername'] = (nickname) => {
    updateAccountInfo({
      nickname,
    }).then((user) => {
      dispatch({
        type: 'setUserInfo',
        payload: user,
      });
    });
  };
  /**
   * 登出
   */
  const onSignOut = () => {
    signOut().then(() => {
      history.push('/login');
    });
  };
  /**
   * 创建房间
   * @param value
   */
  const onFinish: RoomCreateModalProps['onFinish'] = (value) => {
    repairCreateRoomApi(value).then((response) => {
      setJoinRoomRes({
        roomId: response.roomInfo?.roomId,
        role: value.role,
      });
      if (value.role === Role.Staff) { // 报修人员
        setPagination({
          ...pagination,
        });
        setVisible(false);
        message.error('web端暂不支持报修人员进入');
      } else if (value.role === Role.Professor) { // 专家
        gotoRoom({
          roomId: response.roomInfo?.roomId,
          role: value.role,
          streamType: StreamType.Rtc,
        });
      } else {
        setPagination({
          ...pagination,
        });
        setVisible(false);
        setJoinRoomModalVisible(true);
      }
    });
  };

  return (
    <div className={styles.container}>
      <HeaderPanel
        style={{ padding: '0 132px' }}
        username={state.userInfo?.nickname}
        avatar={state.userInfo?.avatar}
        popoverContent={(
          <UserBox
            username={state.userInfo?.nickname}
            avatar={state.userInfo?.avatar}
            onUpdateUsername={onUpdateUsername}
            onSignOut={onSignOut}
          />
        )}
      />
      <Row style={{ padding: '20px 132px 10px' }}>
        <Button type="primary" onClick={() => setVisible(true)}>新建房间</Button>
      </Row>
      <RoomListTable
        dataSource={dataSource}
        style={{ marginTop: 10, padding: '0 132px' }}
        loading={loading}
        customColumns={[
          {
            title: '操作',
            key: 'options',
            align: 'center',
            render(text, record) {
              return record.options?.map((opt, index) => (
                <Button
                  key={opt.role + index}
                  style={{ margin: '5px' }}
                  type="link"
                  onClick={() => {
                    if (opt.role === Role.Staff) { // 报修人员
                      setVisible(false);
                      message.error('web端暂不支持报修人员进入');
                    } else if (opt.role === Role.Professor) { // 专家
                      gotoRoom({
                        roomId: record.roomId,
                        role: opt.role,
                        streamType: StreamType.Rtc,
                      });
                    } else { // 学生
                      setJoinRoomRes({
                        roomId: record.roomId,
                        role: opt.role,
                      });
                      setVisible(false);
                      setJoinRoomModalVisible(true);
                    }
                  }}
                >
                  {opt.title}
                </Button>
              ));
            },
          },
        ]}
      />
      <RoomCreateModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onFinish={onFinish}
      />
      <Modal
        title="加入房间提示"
        visible={joinRoomModalVisible}
        onCancel={() => setJoinRoomModalVisible(false)}
        footer={(
          <>
            <Button onClick={
              () => gotoRoom({
                roomId: joinRoomRes?.roomId,
                role: joinRoomRes?.role,
                streamType: StreamType.Rtmp,
              })
            }
            >
              拉流播放
            </Button>
            <Button
              type="primary"
              onClick={
                () => gotoRoom({
                  roomId: joinRoomRes?.roomId,
                  role: joinRoomRes?.role,
                  streamType: StreamType.Rtc,
                })
              }
            >
              加入订阅
            </Button>
          </>
        )}
      >
        是否加入 rtc 房间
      </Modal>
    </div>
  );
};

export default RoomList;
