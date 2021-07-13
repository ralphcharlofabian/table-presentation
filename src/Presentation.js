
import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';

const columns = [
  {
    title: 'Exp Date',
    dataIndex: 'expDate',
    key: 'expDate',
  },
  {
    title: 'ATM',
    dataIndex: 'atm',
    key: 'atm',
  },
  {
    title: '25d R/R',
    dataIndex: 'drr25',
    key: 'drr25',
  },
  {
    title: '10d R/R',
    dataIndex: 'drr10',
    key: 'drr10',
  },
  {
    title: '25d B/F',
    dataIndex: 'dbf25',
    key: 'dbf25',
  },
  {
    title: '10d B/F',
    dataIndex: 'dbf10',
    key: 'dbf10',
  },
];

const Presentation = ({data}) => {
  
  return (
    <>
      <LineChart width={window.innerWidth - 300} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="atm" />
      </LineChart>
      <Table columns={columns} dataSource={data} />
     </>
  );
};

export default Presentation;