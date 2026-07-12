import React from 'react';
import { ConfigProvider } from 'antd';

export const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0891b2', // cyan-600
          colorInfo: '#0891b2', // cyan-600
          colorSuccess: '#14b8a6', // teal-500
          colorWarning: '#fb923c', // orange-400
          colorError: '#ef4444', // red-500
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
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
