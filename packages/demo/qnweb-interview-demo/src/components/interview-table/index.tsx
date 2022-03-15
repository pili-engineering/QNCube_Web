import React from 'react';
import { PaginationProps, Table, TableColumnType } from 'antd';
import dayjs from 'dayjs';
import {Interview} from "../../api";
import './index.scss';

const columns = [
  {
    title: '面试标题',
    dataIndex: 'title',
    key: 'title',
    // width: 120,
    align: 'center'
  },
  {
    title: '应聘者姓名',
    dataIndex: 'candidateName',
    key: 'candidateName',
    // width: 120
  },
  {
    title: '应聘者手机号',
    dataIndex: 'candidatePhone',
    key: 'candidatePhone',
    // width: 140
  },
  {
    title: '是否录制',
    key: 'isRecorded',
    render: (text: boolean) => text ? '是' : '否',
    // width: 120
  },
  {
    // width: 120,
    title: '面试状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: string, record: Interview) => {
      const { statusCode } = record; // 0-待面试，10-面试中，-10已结束
      const mapColor: { [k: string]: string } = {
        '10': '#1883FF',
        '0': '#FCC859',
        '-10': '#999999'
      }
      const color = mapColor[statusCode];
      return <span style={{color, display: 'flex', alignItems: 'center'}}>
        <span
          style={{
            backgroundColor: color, display: 'inline-block',
            padding: '4px',
            borderRadius: '50%', marginRight: '8px',
            flexShrink: 0
          }}></span>
        <span>{text}</span>
      </span>
    }
  },
  {
    title: '公司/职位信息',
    // width: 140,
    render: (record: Interview) => {
      return <span>
        {record.goverment}/{record.career}
      </span>
    }
  },
  {
    title: '时间',
    render: (record: Interview) => {
      const startTime = record.startTime > 0 ? `${dayjs(record.startTime * 1000).format('YYYY年MM月DD日 HH:mm')}` : '';
      const endTime = record.endTime > 0 ? `${dayjs(record.endTime * 1000).format('YYYY年MM月DD日 HH:mm')}` : '';
      return <span>
        {startTime}~{endTime}
      </span>
    }
  },
];


interface Props {
  data?: Interview[];
  customColumns?: TableColumnType<Interview>[];
  pagination?: PaginationProps;
  loading?: boolean;
}


const InterviewTable: React.FC<Props> = props => {
  const {
    data = [], customColumns = [], pagination, loading
  } = props;
  const transformColumns: TableColumnType<Interview>[] = [...columns, ...customColumns].map(column => ({...column, align: 'center'}));
  return <Table
    bordered={false}
    className="interview-table"
    columns={transformColumns}
    dataSource={data}
    pagination={pagination}
    rowKey="id"
    loading={loading}
  />;
};

export default InterviewTable;