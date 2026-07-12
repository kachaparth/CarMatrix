import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useTheme } from '../context/ThemeContext';

export const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#0891b2', // cyan-600
          colorInfo: '#0891b2', // cyan-600
          colorSuccess: '#14b8a6', // teal-500
          colorWarning: '#fb923c', // orange-400
          colorError: '#ef4444', // red-500
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          colorBgBase: theme === 'dark' ? '#0f172a' : '#ffffff',
          colorTextBase: theme === 'dark' ? '#f8fafc' : '#0f172a',
        },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 8,
          },
          Card: {
            borderRadiusLG: 16,
          },
          Input: {
            controlHeight: 40,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
