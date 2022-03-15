import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Divider, message, Modal } from 'antd';
import InterviewTable from '../../components/interview-table';
import InterviewForm, { FormAction, normalize } from '../../components/interview-form';
import {
  BaseInterview,
  cancelInterview,
  createInterview, endInterview,
  getInterviewList,
  Interview, signOut, updateAccountInfo,
  updateInterview
} from '../../api';
import { useHistory } from 'react-router-dom';
import ClipboardButton from '../../components/clipboard-button';
import CommonHeader from '../../components/common-header';
import classNames from 'classnames';

import './index.scss';
import {os} from "@/utils";
import { UserStoreContext } from '@/store';

const MeetingList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); // 创建/修改面试弹窗显隐
  const [modalAction, setModalAction] = useState<FormAction>('create'); // 创建/修改面试弹窗表单的操作
  const [interviewFormInitialValues, setInterviewFormInitialValues] = useState<Partial<Interview>>(); // 创建/修改面试表单初始值
  const [interviewListData, setInterviewListData] = useState<Interview[]>(); // 面试列表数据
  const [tableLoading, setTableLoading] = useState<boolean>(false); // 面试列表数据
  const [shouldUpdateList, setShouldUpdateList] = useState<boolean>(false);
  const { state, dispatch } = useContext(UserStoreContext);

  const [total, setTotal] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const history = useHistory();

  // 渲染面试列表
  useEffect(() => {
    setTableLoading(true);
    (async function getInterviewListData() {
      try {
        const res = await getInterviewList({
          pageSize,
          pageNum
        });
        setInterviewListData(res.list);
        setTotal(res.total);
      } catch (e) {

      } finally {
        setTableLoading(false);
      }
    })();
  }, [pageNum, pageSize, shouldUpdateList]);

  /**
   * 创建/修改面试
   * @param value
   */
  async function onInterview(value: BaseInterview) {
    const actionMap = {
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
    if (modalAction === 'disabled') return;
    const actionInfo = actionMap[modalAction];
    await actionInfo.fn();
    setShouldUpdateList(!shouldUpdateList);
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
    setShouldUpdateList(!shouldUpdateList);
  }

  /**
   * 结束面试
   * @param row
   */
  async function onEndInterview(row: Interview) {
    await endInterview({ interviewId: row.id });
    message.success('结束面试成功');
    setShouldUpdateList(!shouldUpdateList);
  }

  /**
   * 分享面试
   * @param text
   * @param result
   */
  function onCopy(text: string, result: boolean) {
    if (result) {
      message.success('面试链接复制成功');
    } else {
      message.error('面试链接复制失败');
    }
  }

  // 关闭弹窗
  function closeModal() {
    setModalVisible(false);
  }

  /**
   * 展示弹窗
   * @param type
   * @param initialValue
   */
  function showModal(type: FormAction, initialValue?: Partial<Interview>) {
    setModalAction(type);
    setInterviewFormInitialValues(initialValue);
    setModalVisible(true);
  }

  // 登出
  async function onSignOut() {
    await signOut();
    localStorage.clear();
    history.push('/');
  }

  /**
   * 用户信息修改
   * @param value
   */
  async function onUpdateUsername(value: string) {
    const updatedUserInfo = await updateAccountInfo({
      accountId: state.userInfo?.accountId,
      nickname: value
    });
    dispatch({
      type: 'setUserInfo',
      payload: {
        ...state.userInfo,
        ...updatedUserInfo
      }
    });
    message.success('用户信息更新成功~');
  }

  return <CommonHeader
    button={<Button type="primary" onClick={() => showModal('create', {
      startTime: normalize(Date.now()).unix(),
      endTime: normalize(Date.now() +  60 * 60 * 1000).unix(),
    })}>新建面试</Button>}
    name={state.userInfo?.nickname}
    avatar={state.userInfo?.avatar}
    onSignOut={onSignOut}
    onUpdateUsername={onUpdateUsername}
  >
    <div className="meeting-list">
      <InterviewTable
        data={interviewListData}
        loading={tableLoading}
        pagination={{
          onChange: page => setPageNum(page),
          pageSize,
          total,
          current: pageNum,
          showQuickJumper: true,
          showSizeChanger: true,
          onShowSizeChange: (current, pageSize) => setPageSize(pageSize)
        }}
        customColumns={[{
          title: '操作',
          // width: 300,
          render(row: Interview) {
            const buttons = row.options;
            return <div className={classNames('action', {
              'action-4': buttons.length === 4
            })}>
              {
                buttons.length ? buttons.map((opt, index) => {
                  const { type, title } = opt;
                  return <Fragment key={opt.type}>
                    {type === 1 &&
										<Button type="link" className="button" onClick={() => showModal('update', row)}>{title}</Button>}
                    {type === 2 &&
										<Button type="link" className="button" onClick={() => showModal('disabled', row)}>{title}</Button>}
                    {type === 50 &&
										<Button type="link" className="button" onClick={() => onCancelInterview(row)}>{title}</Button>}
                    {type === 51 &&
										<Button type="link" className="button" onClick={() => onEndInterview(row)}>{title}</Button>}
                    {type === 100 && <Button type="link" className="button"
																						 onClick={() => history.push(os.isPc ? `/room/${row.id}` : `/mobile/room/${row.id}`)}>{title}</Button>}
                    {type === 200 && <ClipboardButton
											text={row.shareInfo.content}
											button={{ type: 'link', className: 'button' }}
											onCopy={onCopy}
										>
                      {title}
										</ClipboardButton>}
                    {(index < buttons.length - 1 && !(buttons.length === 4 && index === 1)) && <Divider type="vertical" style={{margin: 0, borderLeftColor: '#E9E9E9'}}/>}
                  </Fragment>;
                }) : <>
                  <Divider style={{width: '12px', margin: '0 2px', borderTop: '2px solid #E9E9E9', minWidth: '12px'}}/>
                  <Divider style={{width: '12px', margin: '0 2px', borderTop: '2px solid #E9E9E9', minWidth: '12px'}}/>
                </>
              }
            </div>;
          }
        }]}
      />
      <Modal
        destroyOnClose={true}
        visible={modalVisible}
        onCancel={closeModal}
        title={{ 'update': '修改面试', 'create': '创建面试', disabled: '查看面试' }[modalAction]}
        footer={null}
      >
        <InterviewForm
          action={modalAction}
          initialValues={interviewFormInitialValues}
          onCancel={closeModal}
          onFinish={onInterview}
        />
      </Modal>
    </div>
  </CommonHeader>;
};

export default MeetingList;