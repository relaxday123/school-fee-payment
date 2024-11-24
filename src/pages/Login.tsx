import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useAuthStore } from '../store/authStore';

export const Login: React.FC = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const onFinish = (values: any) => {
    // Temporary mock login
    setAuth({
      id: '1',
      email: values.email,
      name: 'Admin User',
      role: 'admin'
    }, 'mock-token');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-96">
        <h1 className="text-2xl font-bold text-center mb-6">School Fee Manager</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};