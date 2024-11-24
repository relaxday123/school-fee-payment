import React from 'react';
import { Row, Col, Card, Table } from 'antd';
import { PaymentStats } from '../components/Dashboard/PaymentStats';

export const Dashboard: React.FC = () => {
  // Sample data - replace with actual API calls
  const stats = {
    totalCollected: 1500000000,
    pendingPayments: 500000000,
    paymentTrend: [
      { date: '2023-01', amount: 120000000 },
      { date: '2023-02', amount: 150000000 },
      // Add more data points
    ],
  };

  const recentPayments = [
    {
      id: '1',
      student: 'Nguyen Van A',
      amount: 5000000,
      date: '2023-11-01',
      status: 'completed',
    },
    // Add more payments
  ];

  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₫${amount.toLocaleString()}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <PaymentStats {...stats} />
      
      <Card title="Recent Payments" className="mt-4">
        <Table
          columns={columns}
          dataSource={recentPayments}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};