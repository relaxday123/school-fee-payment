import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PaymentStatsProps {
  totalCollected: number;
  pendingPayments: number;
  paymentTrend: Array<{ date: string; amount: number }>;
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({
  totalCollected,
  pendingPayments,
  paymentTrend,
}) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Collected"
              value={totalCollected}
              precision={2}
              prefix="₫"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Pending Payments"
              value={pendingPayments}
              precision={2}
              prefix="₫"
            />
          </Card>
        </Col>
      </Row>
      <Card title="Payment Trend" className="mt-4">
        <LineChart width={800} height={300} data={paymentTrend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </Card>
    </div>
  );
};