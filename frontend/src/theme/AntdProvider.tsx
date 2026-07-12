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
          colorPrimary: '#5E6AD2', // brand accent
          colorInfo: '#5E6AD2',
          colorSuccess: '#10b981', // keeping emerald for success
          colorWarning: '#f59e0b', // keeping amber for warning
          colorError: '#ef4444',
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          colorBgBase: theme === 'dark' ? '#161618' : '#F7F8FA', // using surface color for components
          colorTextBase: theme === 'dark' ? '#EEEEF1' : '#111111',
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
          Layout: {
            headerBg: theme === 'dark' ? '#0F0F11' : '#FFFFFF',
            siderBg: theme === 'dark' ? '#161618' : '#F7F8FA',
            bodyBg: theme === 'dark' ? '#0F0F11' : '#FFFFFF'
          }
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
