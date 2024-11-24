import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, InputNumber } from 'antd';
import { FeeStructure } from '../../types';
import { QRPayment } from './QRPayment';

interface PaymentFormProps {
  feeStructures: FeeStructure[];
  onSubmit: (values: any) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  feeStructures,
  onSubmit,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    amount: number;
    orderId: string;
  } | null>(null);

  const handleSubmit = (values: any) => {
    if (values.paymentMethod === 'vnpay') {
      setPaymentDetails({
        amount: values.amount,
        orderId: `ORD-${Date.now()}`,
      });
      setShowQR(true);
    } else {
      onSubmit(values);
    }
  };

  const handlePaymentSuccess = () => {
    setShowQR(false);
    if (paymentDetails) {
      onSubmit({
        ...paymentDetails,
        status: 'completed',
        paymentMethod: 'vnpay',
      });
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="studentId"
          label="Student ID"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="feeStructureId"
          label="Fee Type"
          rules={[{ required: true }]}
        >
          <Select>
            {feeStructures.map((fee) => (
              <Select.Option key={fee.id} value={fee.id}>
                {fee.name} - ₫{fee.amount.toLocaleString()}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/₫\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="vnpay">VNPay QR</Select.Option>
            <Select.Option value="bank_transfer">Bank Transfer</Select.Option>
            <Select.Option value="cash">Cash</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Process Payment
          </Button>
        </Form.Item>
      </Form>

      {showQR && paymentDetails && (
        <QRPayment
          amount={paymentDetails.amount}
          orderId={paymentDetails.orderId}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowQR(false)}
        />
      )}
    </>
  );
};