import React, { useRef, useState } from 'react';
import {
  Button, DatePicker, Form, Input, message, Modal, Select, Table,
} from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import useTeacherExaminationRoomList from '@/hooks/useTeacherExaminationRoomList';
import useQuestionList from '@/hooks/useQuestionList';
import ExamApi from '@/api/ExamApi';
import { ExamCreateResult, ExamListTeacherResult, ExamUpdateResult } from '@/api/types';

import styles from './index.module.scss';

const TeacherRoomList = () => {
  const history = useHistory();
  const [form] = Form.useForm<{
    examName: string,
    dateTimeRange: [moment.Moment, moment.Moment],
    questions: string[],
  }>();
  const {
    table, setPagination, total, loading: tableLoading,
    pagination,
  } = useTeacherExaminationRoomList();
  const [visible, setVisible] = useState(false);
  const { questions } = useQuestionList();
  const [modalTitle, setModalTitle] = useState('新增考试');
  const examIdRef = useRef<string>('');

  /**
   * 点击确认创建考试
   */
  const onConfirm = () => {
    form.validateFields().then((values) => ({
      name: values.examName,
      startTime: values.dateTimeRange?.[0].valueOf(),
      endTime: values.dateTimeRange?.[1].valueOf(),
      paper: {
        name: values.examName,
        questionList: values.questions,
      },
    })).then<ExamCreateResult | ExamUpdateResult>((result) => {
      return ExamApi.create(result);
    }).then(() => {
      message.success(`${modalTitle}成功`);
      setVisible(false);
      if (modalTitle === '新增考试') {
        setPagination({
          ...pagination,
          current: 1,
        });
      } else {
        setPagination({
          ...pagination,
          current: pagination?.current,
        });
      }
    });
  };

  /**
   * 信息修改
   * @param record
   */
  const onModifyExam = (record: ExamListTeacherResult['list'][number]) => {
    setModalTitle('修改考试');
    setVisible(true);
    examIdRef.current = record.examId;
    form.setFieldsValue({
      examName: record.examName,
      dateTimeRange: [moment(record.startTime), moment(record.endTime)],
      questions: record.paper.questionList,
    });
  };

  /**
   * 删除考试
   * @param record
   */
  const onDeleteExam = (record: ExamListTeacherResult['list'][number]) => {
    Modal.confirm({
      title: '确认删除该考试吗？',
      closable: true,
      onOk: () => {
        ExamApi.delete({
          examId: record.examId,
        }).then(() => {
          message.success('删除成功');
          setPagination({
            ...pagination,
            current: 1,
          });
        });
      },
    });
  };

  return (
    <div className={styles.list}>
      <div className={styles.tableContainer}>
        <div className={styles.title}>
          <span className={styles.titleText}>考场列表</span>
          <Button
            type="primary"
            onClick={() => {
              form.resetFields();
              form.setFieldsValue({
                dateTimeRange: [moment(), moment().add(30, 'minutes')],
              });
              setModalTitle('新增考试');
              setVisible(true);
            }}
          >
            新增考试
          </Button>
        </div>
        <Table
          rowKey="examId"
          dataSource={table}
          columns={[
            {
              title: '考试名称',
              dataIndex: 'examName',
              key: 'examName',
            },
            {
              title: '考试时间',
              dataIndex: 'dateRange',
              key: 'dateRange',
              render(value, record) {
                const formatTemplate = 'YYYY-MM-DD HH:mm:ss';
                const startDateTime = moment(record.startTime).format(formatTemplate);
                const endDateTime = moment(record.endTime).format(formatTemplate);
                return `${startDateTime}至${endDateTime}`;
              },
            },
            {
              title: '考试时长',
              dataIndex: 'duration',
              key: 'duration',
              render(value: number) {
                const hours = value / 1000 / 60 / 60;
                return `${hours.toFixed(2)}小时`;
              },
            },
            {
              title: '操作',
              dataIndex: 'action',
              key: 'action',
              align: 'center',
              render(value, record) {
                return (
                  <>
                    <Button
                      type="primary"
                      onClick={() => history.push(`/teacher/room?examId=${record.examId}`)}
                      className={styles.actionButton}
                    >
                      监考
                    </Button>
                    <Button
                      type="primary"
                      className={styles.actionButton}
                      onClick={() => onModifyExam(record)}
                    >
                      信息修改
                    </Button>
                    <Button
                      type="primary"
                      className={styles.actionButton}
                      danger
                      onClick={() => onDeleteExam(record)}
                    >
                      删除考试
                    </Button>
                  </>

                );
              },
            },
          ]}
          onChange={(currentPagination) => {
            setPagination({
              ...pagination,
              current: currentPagination.current,
              pageSize: currentPagination.pageSize,
            });
          }}
          pagination={{
            total,
          }}
          loading={tableLoading}
        />
      </div>
      <Modal
        title={modalTitle}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
        >
          <Form.Item
            label="考试名"
            name="examName"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入考试名"/>
          </Form.Item>
          <Form.Item
            label="考试时间"
            name="dateTimeRange"
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          </Form.Item>
          <Form.Item
            label="考试试题"
            name="questions"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="请选择考试试题"
              mode="multiple"
              allowClear
            >
              {
                questions?.map((question) => (
                  <Select.Option
                    key={question.questionId}
                    value={question.questionId || ''}
                  >
                    {question.desc}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button style={{ marginRight: 20 }} onClick={() => setVisible(false)}>取消</Button>
            <Button type="primary" htmlType="submit" onClick={onConfirm}>确定</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherRoomList;
