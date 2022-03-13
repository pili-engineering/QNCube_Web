import React from 'react';
import { Button, Table } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import useStudentExaminationRoomList from '@/hooks/useStudentExaminationRoomList';
import styles from './index.module.scss';

const StudentRoomList = () => {
  const history = useHistory();
  const { table, setPagination, loading } = useStudentExaminationRoomList();
  const startExamination = (examId: string, examName: string) => {
    history.push(`/student/detector?examId=${examId}&examName=${examName}`);
  };
  return (
    <div className={styles.list}>
      <div className={styles.tableContainer}>
        <div className={styles.title}>考试列表</div>
        <Table
          rowKey="examId"
          dataSource={table}
          loading={loading}
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
              render(value, record) {
                return (
                  <Button
                    type="primary"
                    onClick={() => startExamination(
                      record.examId || '', record.examName || '',
                    )}
                  >
                    开始考试
                  </Button>
                );
              },
            },
          ]}
          onChange={(pagination) => {
            setPagination({
              page: pagination.current,
              pageSize: pagination.pageSize,
            });
          }}
        />
      </div>
    </div>
  );
};

export default StudentRoomList;
