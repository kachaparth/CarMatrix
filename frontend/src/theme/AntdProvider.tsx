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
          colorPrimary: '#4f46e5', // indigo-600
          colorInfo: '#4f46e5', // indigo-600
          colorSuccess: '#10b981', // emerald-500
          colorWarning: '#f59e0b', // amber-500
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
