import React, { useState } from 'react';
import { QRCode, Modal, Steps, Result, Button } from 'antd';
import { LoadingOutlined, CheckCircleOutlined, ScanOutlined } from '@ant-design/icons';

interface QRPaymentProps {
  amount: number;
  orderId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const QRPayment: React.FC<QRPaymentProps> = ({
  amount,
  orderId,
  onSuccess,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Mock VNPay QR code data - in production, this would come from the VNPay API
  const qrData = `https://vnpay.vn/payment/${orderId}?amount=${amount}`;

  const steps = [
    {
      title: 'Scan QR',
      icon: <ScanOutlined />,
      content: (
        <div className="text-center p-4">
          <h3 className="mb-4 text-lg">Scan with VNPay Mobile App</h3>
          <div className="flex justify-center mb-4">
            <QRCode value={qrData} size={200} />
          </div>
          <p className="text-gray-600">Amount: ₫{amount.toLocaleString()}</p>
          <p className="text-gray-600">Order ID: {orderId}</p>
        </div>
      ),
    },
    {
      title: 'Processing',
      icon: <LoadingOutlined />,
      content: (
        <div className="text-center p-8">
          <LoadingOutlined style={{ fontSize: 48 }} className="mb-4" />
          <h3>Processing Your Payment</h3>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      ),
    },
    {
      title: 'Complete',
      icon: <CheckCircleOutlined />,
      content: (
        <Result
          status="success"
          title="Payment Successful!"
          subTitle={`Order ID: ${orderId}`}
          extra={[
            <Button type="primary" key="done" onClick={onSuccess}>
              Done
            </Button>,
          ]}
        />
      ),
    },
  ];

  // Mock payment processing - in production, this would be handled by VNPay webhook
  const simulatePayment = () => {
    setCurrentStep(1);
    setTimeout(() => {
      setCurrentStep(2);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onCancel();
  };

  return (
    <Modal
      title="VNPay QR Payment"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Steps current={currentStep} items={steps} className="mb-8" />
      <div className="p-4">
        {steps[currentStep].content}
        {currentStep === 0 && (
          <div className="text-center mt-4">
            <Button type="primary" onClick={simulatePayment}>
              Simulate Payment
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};