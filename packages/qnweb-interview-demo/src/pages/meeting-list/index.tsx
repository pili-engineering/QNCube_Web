import React, { Fragment, useState } from 'react';
import { Button, Divider, message, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAntdTable } from 'ahooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import InterviewTable from '@/components/interview-table';
import InterviewForm, { FormType, normalize } from '@/components/interview-form';
import {
  BaseInterview,
  cancelInterview,
  createInterview, endInterview,
  getInterviewList,
  Interview, signOut, updateAccountInfo,
  updateInterview
} from '@/api';
import CommonHeader from '@/components/common-header';
import { useUserStore } from '@/store';

import styles from './index.module.scss';

/**
 * 分享面试
 * @param text
 * @param result
 */
const onCopy = (text: string, result: boolean) => {
  if (result) {
    return message.success('面试链接复制成功');
  }
  return message.error('面试链接复制失败');
};

/**
 * 弹窗标题
 */
const modalTitleMap = {
  update: '修改面试',
  create: '创建面试',
  disabled: '查看面试'
};

const MeetingList: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = useUserStore();

  const [modalVisible, setModalVisible] = useState(false); // 创建/修改面试弹窗显隐
  const [formType, setFormType] = useState<FormType>('create'); // 创建/修改面试弹窗表单的操作
  const [interviewFormInitialValues, setInterviewFormInitialValues] = useState<Partial<Interview>>(); // 创建/修改面试表单初始值

  const { loading, runAsync, data, pagination } = useAntdTable(params => {
    return getInterviewList({
      pageNum: params.current,
      pageSize: params.pageSize,
    });
  }, {
    defaultPageSize: 10,
  });

  /**
   * 创建/修改面试
   * @param value
   */
  async function onInterview(value: BaseInterview) {
    if (formType === 'disabled') return;
    const map = {
      create: {
        fn: () => createInterview(value),
        text: '创建面试成功'
      },
      update: {
        fn: () => updateInterview({
          ...value,
          interviewId: interviewFormInitialValues?.id || ''
        }),
        text: '修改面试成功'
      }
    };
    const actionInfo = map[formType];
    await actionInfo.fn();
    await runAsync({
      current: pagination.current,
      pageSize: pagination.pageSize
    });
    setModalVisible(false);
    message.success(actionInfo.text);
  }

  /**
   * 取消面试
   * @param row
   */
  async function onCancelInterview(row: Interview) {
    await cancelInterview({ interviewId: row.id });
    message.success('取消面试成功');
    return runAsync({
      current: pagination.current,
      pageSize: pagination.pageSize
    });
  }

  /**
   * 结束面试
   * @param row
   */
  async function onEndInterview(row: Interview) {
    await endInterview({ interviewId: row.id });
    message.success('结束面试成功');
    return runAsync({
      current: pagination.current,
      pageSize: pagination.pageSize
    });
  }

  /**
   * 展示弹窗
   * @param type
   * @param initialValue
   */
  function showModal(type: FormType, initialValue?: Partial<Interview>) {
    setFormType(type);
    setInterviewFormInitialValues(initialValue);
    setModalVisible(true);
  }

  /**
   * 用户信息修改
   * @param value
   */
  async function onUpdateUsername(value: string) {
    const updatedUserInfo = await updateAccountInfo({
      accountId: state.accountId,
      nickname: value
    });
    dispatch({
      type: 'PATCH',
      payload: updatedUserInfo
    });
    message.success('用户信息更新成功~');
  }

  /**
   * 加入房间
   * @param row
   */
  const onJoinRoom = (row: Interview) => {
    // history.push(os.isPc ? `/room/${row.id}` : `/mobile/room/${row.id}`);
    history.push(`/room/${row.id}`);
  };

  /**
   * 操作里的按钮事件
   * @param type
   * @param row
   */
  const onTableButton = (type: number, row: Interview) => {
    if (type === 1) {
      return showModal('update', row);
    }
    if (type === 2) {
      return showModal('disabled', row);
    }
    if (type === 50) {
      return onCancelInterview(row);
    }
    if (type === 51) {
      return onEndInterview(row);
    }
    if (type === 100) {
      return onJoinRoom(row);
    }
  };

  return <CommonHeader
    button={
      <Button
        type="primary"
        onClick={() => showModal('create', {
          startTime: normalize(Date.now()).unix(),
          endTime: normalize(Date.now() + 60 * 60 * 1000).unix(),
        })}
      >新建面试</Button>
    }
    name={state.nickname}
    avatar={state.avatar}
    onSignOut={() => {
      signOut().then(() => {
        localStorage.clear();
        history.push('/');
      });
    }}
    onUpdateUsername={onUpdateUsername}
  >
    <div className={styles.container}>
      <InterviewTable
        data={data?.list}
        loading={loading}
        pagination={pagination}
        columns={
          [
            {
              title: '操作',
              // width: 300,
              render(row: Interview) {
                const buttons = row.options;
                const len = buttons.length;
                return <div className={styles.tableButtons}>
                  {
                    len ? buttons.map((button, index) => {
                      const { type, title } = button;
                      const isShareButton = type === 200;
                      const shareContent = row.shareInfo.content;
                      return <Fragment key={type}>
                        {
                          isShareButton ? <CopyToClipboard text={shareContent} onCopy={onCopy}>
                            <Button
                              type="link"
                              className="button"
                              onClick={() => onTableButton(type, row)}
                            >{title}</Button>
                          </CopyToClipboard> : <Button
                            type="link"
                            className="button"
                            onClick={() => onTableButton(type, row)}
                          >{title}</Button>
                        }
                        {
                          (len > 1 && index % 2 === 0) &&
                          <Divider
                            type="vertical"
                            style={{ margin: 0, borderLeftColor: '#E9E9E9' }}
                          />
                        }
                      </Fragment>;
                    }) : <>
                      <Divider
                        className={styles.placeholderDivider}
                      />
                      <Divider
                        className={styles.placeholderDivider}
                      />
                    </>
                  }
                </div>;
              }
            }
          ]
        }
      />
      <Modal
        destroyOnClose={true}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        title={modalTitleMap[formType]}
        footer={null}
      >
        <InterviewForm
          type={formType}
          initialValues={interviewFormInitialValues}
          onCancel={() => setModalVisible(false)}
          onFinish={onInterview}
        />
      </Modal>
    </div>
  </CommonHeader>;
};

export default MeetingList;
