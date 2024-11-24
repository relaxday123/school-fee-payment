import React from 'react';
import { Card, Tabs } from 'antd';
import { PaymentForm } from '../components/Payments/PaymentForm';

const { TabPane } = Tabs;

export const Payments: React.FC = () => {
  // Mock fee structures - replace with API call
  const feeStructures = [
    {
      id: '1',
      name: 'Tuition Fee',
      amount: 5000000,
      frequency: 'monthly',
      category: 'tuition',
    },
    {
      id: '2',
      name: 'Exam Fee',
      amount: 1000000,
      frequency: 'quarterly',
      category: 'exam',
    },
  ] as const;

  const handlePayment = (values: any) => {
    console.log('Payment processed:', values);
    // Handle payment submission
  };

  return (
    <Card>
      <Tabs defaultActiveKey="new">
        <TabPane tab="New Payment" key="new">
          <PaymentForm
            feeStructures={feeStructures}
            onSubmit={handlePayment}
          />
        </TabPane>
        <TabPane tab="Payment History" key="history">
          {/* Add payment history component here */}
        </TabPane>
      </Tabs>
    </Card>
  );
};