import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  CarFront, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Menu as MenuIcon,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const { Header, Sider, Content } = Layout;

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isAdmin = user?.role === 'ADMIN';

  const menuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard size={18} />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/inventory',
      icon: <CarFront size={18} />,
      label: <Link to="/inventory">Inventory</Link>,
    },
    ...(isAdmin ? [{
      key: '/admin/vehicles',
      icon: <Settings size={18} />,
      label: <Link to="/admin/vehicles">Admin Management</Link>,
    }] : [])
  ];

  const userMenu = {
    items: [
      {
        key: '1',
        label: (
          <div className="flex flex-col">
            <span className="font-semibold">{user?.firstName || 'User'}</span>
            <span className="text-xs text-secondary">{user?.email}</span>
          </div>
        ),
        disabled: true,
      },
      {
        type: 'divider' as const,
      },
      {
        key: '2',
        icon: <LogOut size={16} />,
        label: 'Logout',
        danger: true,
        onClick: logout,
      },
    ],
  };

  return (
    <Layout className="min-h-screen bg-canvas transition-colors duration-300">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme={theme === 'dark' ? 'dark' : 'light'}
        className="shadow-none border-r border-divider hidden md:block bg-surface"
        width={260}
      >
        <div className="h-16 flex items-center justify-center border-b border-divider">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <CarFront className="text-white w-5 h-5" />
            </div>
            {!collapsed && <span className="font-bold text-lg text-primary">CarMatrix</span>}
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split('/').slice(0,3).join('/')]}
          items={menuItems}
          theme={theme === 'dark' ? 'dark' : 'light'}
          className="border-none mt-4 px-2 bg-transparent text-secondary"
        />
      </Sider>

      <Layout className="bg-transparent">
        <Header className="bg-canvas border-b border-divider px-4 flex items-center justify-between sticky top-0 z-10 shadow-none h-16 transition-colors duration-300">
          <div className="flex items-center">
            <Button
              type="text"
              icon={<MenuIcon className="text-secondary" />}
              onClick={() => setCollapsed(!collapsed)}
              className="md:block hidden"
            />
            {/* Mobile Title */}
            <div className="md:hidden flex items-center gap-2 ml-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <CarFront className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-primary">CarMatrix</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              type="text" 
              icon={theme === 'light' ? <Moon size={18} className="text-secondary" /> : <Sun size={18} className="text-yellow-400" />} 
              onClick={toggleTheme}
              className="flex items-center justify-center"
            />
            <Dropdown menu={userMenu} trigger={['click']} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-divider p-1.5 rounded-full transition-colors border border-divider">
                <Avatar className="bg-canvas text-secondary border border-divider" icon={<UserIcon size={16} />} />
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};
