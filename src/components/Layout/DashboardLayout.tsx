import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  DashboardOutlined,
  UserOutlined,
  CreditCardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: 'students',
      icon: <UserOutlined />,
      label: 'Students',
      onClick: () => navigate('/students'),
    },
    {
      key: 'payments',
      icon: <CreditCardOutlined />,
      label: 'Payments',
      onClick: () => navigate('/payments'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="light">
        <div className="p-4 text-xl font-bold">School Fee Manager</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-4 flex items-center justify-between">
          <div className="text-lg">Welcome, {user?.name}</div>
        </Header>
        <Content className="m-4 p-4 bg-white">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};